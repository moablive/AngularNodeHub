import { Request, Response } from 'express';

import { loginUser } from '../services/user/authService';
import { registerUser, fetchAllUsers, deleteUser as deleteUserService, updateUser as updateUserService } from '../services/user/userService';

import { DadosEntradaCriarUsuario, DadosEntradaLogin } from '../interfaces/usuario.interface';
import { EmailInUseError, InvalidCredentialsError, UserNotFoundError } from '../utils/errors';

export const register = async (req: Request, res: Response): Promise<Response> => {
  console.log('Controller: Chamada para registrar usuário recebida.');
  const dadosEntrada: DadosEntradaCriarUsuario = req.body;

  if (!dadosEntrada.email || !dadosEntrada.senha) {
    console.log('Controller: Email ou senha não fornecidos para registro.');
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    console.log('Controller: Dados do usuário para registrar:', { email: dadosEntrada.email }); // Não logar a senha
    const novoUsuario = await registerUser(dadosEntrada);
    
    console.log('Controller: Usuário registrado com sucesso.');
    return res.status(201).json(novoUsuario);

  } catch (error: any) {
    if (error instanceof EmailInUseError) {
      console.log(`Controller: Tentativa de registro com email já em uso: ${dadosEntrada.email}.`);
      return res.status(409).json({ message: error.message });
    }
    console.error('Controller: Erro no controller de registro:', error);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  console.log('Controller: Chamada de login recebida.');
  const dadosLogin: DadosEntradaLogin = req.body;

  if (!dadosLogin.email || !dadosLogin.senha) {
    console.log('Controller: Email ou senha não fornecidos para login.');
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    console.log(`Controller: Tentativa de login para o email: ${dadosLogin.email}.`); // Não logar a senha
    const token = await loginUser(dadosLogin.email, dadosLogin.senha);
    console.log('Controller: Login bem-sucedido.');
    return res.status(200).json({ token });

  } catch (error: any) {
    if (error instanceof InvalidCredentialsError) {
      console.log(`Controller: Credenciais inválidas para o email: ${dadosLogin.email}.`);
      return res.status(401).json({ message: error.message });
    }
    console.error('Controller: Erro no controller de login:', error);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  console.log('Controller: Chamada para buscar todos os usuários.');
  try {
    const users = await fetchAllUsers();
    console.log(`Controller: ${users.length} usuários encontrados.`);
    return res.status(200).json(users);
  } catch (error) {
    console.error('Controller: Erro ao buscar usuários:', error);
    return res.status(500).json({ message: 'Ocorreu um erro ao buscar os usuários.' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  console.log(`Controller: Chamada para deletar usuário com id: ${id}.`);

  try {
    const success = await deleteUserService(id);
    if (success) {
      console.log(`Controller: Usuário com id: ${id} deletado com sucesso.`);
      return res.status(200).json({ message: 'Usuário excluído com sucesso.' });
    } else {
      console.log(`Controller: Usuário com id: ${id} não encontrado para deleção.`);
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
  } catch (error) {
    console.error('Controller: Erro ao excluir usuário:', error);
    return res.status(500).json({ message: 'Ocorreu um erro ao excluir o usuário.' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const dadosAtualizar = req.body;
  console.log(`Controller: Chamada para atualizar usuário com id: ${id}.`);

  // Validação básica
  if (Object.keys(dadosAtualizar).length === 0) {
    console.log('Controller: Nenhum dado fornecido para atualização.');
    return res.status(400).json({ message: 'Nenhum dado fornecido para atualização.' });
  }

  try {
    console.log('Controller: Dados para atualizar:', dadosAtualizar);
    const usuarioAtualizado = await updateUserService(id, dadosAtualizar);
    console.log(`Controller: Usuário com id: ${id} atualizado com sucesso.`);
    return res.status(200).json(usuarioAtualizado);
  } catch (error: any) {
    if (error instanceof UserNotFoundError) {
      console.log(`Controller: Usuário com id: ${id} não encontrado para atualização.`);
      return res.status(404).json({ message: error.message });
    }
    if (error instanceof EmailInUseError) {
      console.log(`Controller: Tentativa de atualizar para email já em uso: ${dadosAtualizar.email}.`);
      return res.status(409).json({ message: error.message });
    }
    console.error('Controller: Erro ao atualizar usuário:', error);
    return res.status(500).json({ message: 'Ocorreu um erro ao atualizar o usuário.' });
  }
};