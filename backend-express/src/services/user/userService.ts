// src/services/userService.ts

import pool from '../../config/database';
import { EmailInUseError, UserNotFoundError } from '../../utils/errors';
import bcrypt from 'bcryptjs';
import { UsuarioPublico, DadosEntradaCriarUsuario, DadosEntradaAtualizarUsuario } from '../../interfaces/usuario.interface';


/**
 * Registra um novo usuário e o retorna como um objeto público.
 * @throws Lança um EmailInUseError se o email já estiver em uso.
 * @returns Uma promessa que resolve para o objeto do usuário recém-criado.
 */
export const registerUser = async (dados: DadosEntradaCriarUsuario): Promise<UsuarioPublico> => {

  if (!dados.senha) {
    throw new Error('A senha é obrigatória para o registro.');
  }

  const salt = await bcrypt.genSalt(10);
  const senhaHash = await bcrypt.hash(dados.senha, salt);

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const insertQuery = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
    const result: any = await conn.query(insertQuery, [dados.email, senhaHash]);
    const newUserId = result.insertId;

    if (!newUserId) {
      throw new Error('Falha ao criar o usuário.');
    }

    const selectQuery = 'SELECT id, email, criado_em AS dataCriacao FROM usuarios WHERE id = ?';
    
    // AJUSTE AQUI: Removidos os colchetes da desestruturação.
    // 'rows' agora recebe diretamente o array de resultados da query.
    const rows: any[] = await conn.query(selectQuery, [newUserId]);

    await conn.commit();

    // Acessamos o primeiro (e único) resultado do array de linhas
    return rows[0] as UsuarioPublico;

  } catch (error: any) {
    if (conn) await conn.rollback();

    if (error.code === 'ER_DUP_ENTRY') {
      throw new EmailInUseError('O email fornecido já está em uso.');
    }
    throw error;
  } finally {
    if (conn) conn.release();
  }
};

/**
 * Busca todos os usuários do banco de dados, retornando apenas dados públicos.
 * @returns Uma promessa que resolve para um array de usuários públicos.
 */
export const fetchAllUsers = async (): Promise<UsuarioPublico[]> => {
  let conn;
  try {
    conn = await pool.getConnection();
    
    // AJUSTE: Removida a coluna 'nome' da query para alinhar com o banco de dados.
    const query = 'SELECT id, email, criado_em AS dataCriacao FROM usuarios'; 
    
    const rows: UsuarioPublico[] = await conn.query(query);
    return rows;
    
  } catch (error) {
    console.error('Erro no serviço ao buscar todos os usuários:', error);
    throw error;
  } finally {
    if (conn) conn.release();
  }
};

/**
 * Exclui um usuário do banco de dados.
 * @param userId O ID do usuário a ser excluído.
 * @returns Uma promessa que resolve para true se o usuário foi excluído, ou false caso contrário.
 */
export const deleteUser = async (userId: string): Promise<boolean> => {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = 'DELETE FROM usuarios WHERE id = ?';
    const result: any = await conn.query(query, [userId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Erro no serviço ao excluir usuário:', error);
    throw error;
  } finally {
    if (conn) conn.release();
  }
};

/**
 * ADICIONADO: Atualiza os dados de um usuário (email e/ou senha).
 * @param userId O ID do usuário a ser atualizado.
 * @param dados Os novos dados para o usuário.
 * @returns Uma promessa que resolve para os dados públicos do usuário atualizado.
 */
export const updateUser = async (userId: string, dados: DadosEntradaAtualizarUsuario): Promise<UsuarioPublico> => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const camposParaAtualizar = [];
    const valores = [];

    // Verifica se um novo email foi fornecido
    if (dados.email) {
      camposParaAtualizar.push('email = ?');
      valores.push(dados.email);
    }

    // Verifica se uma nova senha foi fornecida e a criptografa
    if (dados.senha) {
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(dados.senha, salt);
      camposParaAtualizar.push('senha = ?');
      valores.push(senhaHash);
    }

    // Se nenhum campo foi enviado para atualização, lança um erro.
    if (camposParaAtualizar.length === 0) {
      throw new Error('Nenhum dado fornecido para atualização.');
    }

    valores.push(userId); // Adiciona o ID do usuário ao final para a cláusula WHERE

    const updateQuery = `UPDATE usuarios SET ${camposParaAtualizar.join(', ')} WHERE id = ?`;
    const result: any = await conn.query(updateQuery, valores);

    if (result.affectedRows === 0) {
      throw new UserNotFoundError('Usuário não encontrado.');
    }

    const selectQuery = 'SELECT id, email, criado_em AS dataCriacao FROM usuarios WHERE id = ?';
    const rows: any[] = await conn.query(selectQuery, [userId]);
    
    await conn.commit();
    return rows[0] as UsuarioPublico;

  } catch (error: any) {
    if (conn) await conn.rollback();
    if (error.code === 'ER_DUP_ENTRY') {
      throw new EmailInUseError('O email fornecido já está em uso por outro usuário.');
    }
    throw error;
  } finally {
    if (conn) conn.release();
  }
};