// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthPayload } from '../interfaces/usuario.interface'; 

export const checkAuth = (req: Request, res: Response, next: NextFunction): void | Response => {
  
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('ERRO FATAL: A chave secreta JWT (JWT_SECRET) não foi definida no ambiente.');
    return res.status(500).json({ message: 'Erro interno de configuração do servidor.' });
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Acesso negado. Token não fornecido ou mal formatado.' });
    }

    const token = authHeader.split(' ')[1];

    // Verificamos o token e garantimos que o payload tenha o formato de AuthPayload.
    const decodedPayload = jwt.verify(token, secret) as AuthPayload;

    // Valida o conteúdo do payload para mais segurança.
    if (!decodedPayload.userId) {
      return res.status(401).json({ message: 'Autenticação falhou. Token com formato inválido.' });
    }

    // Adiciona o payload fortemente tipado ao objeto 'req'.
    // O TypeScript agora entende 'req.userData'.
    req.userData = { userId: decodedPayload.userId, email: decodedPayload.email };

    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Sessão expirada. Por favor, faça login novamente.' });
    }
    
    return res.status(401).json({ message: 'Autenticação falhou. Token inválido.' });
  }
};