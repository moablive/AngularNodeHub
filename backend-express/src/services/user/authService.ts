// 

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../../config/database';
import { Usuario, AuthPayload } from '../../interfaces/usuario.interface';
import { InvalidCredentialsError } from '../../utils/errors';

/**
 * Autentica um usuário, verificando credenciais e gerando um token JWT.
 * @returns O token JWT se as credenciais forem válidas.
 * @throws Lança um InvalidCredentialsError se as credenciais forem inválidas.
 */
export const loginUser = async (email: string, senha: string): Promise<string> => {
  let conn;
  try {
    conn = await pool.getConnection();

    // Usamos um alias 'AS' para que a coluna 'senha' do banco
    // seja mapeada para a propriedade 'senhaHash' da nossa interface 'Usuario'.
    const query = 'SELECT id, email, senha AS senhaHash FROM usuarios WHERE email = ?';
    
    // Usamos o tipo 'Usuario'
    const rows: Usuario[] = await conn.query(query, [email]);

    if (rows.length === 0) {
      throw new InvalidCredentialsError();
    }

    const usuario = rows[0];

    // Verificamos e usamos a propriedade 'senhaHash', conforme a interface.
    if (!usuario.senhaHash) {
      throw new Error('Usuário sem senha configurada no banco de dados.'); 
    }

    // Comparamos a senha plana com o hash do banco.
    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
    if (!senhaValida) {
      throw new InvalidCredentialsError();
    }

    // Usamos nosso tipo 'AuthPayload' para garantir a estrutura do token.
    const tokenPayload: AuthPayload = { userId: usuario.id, email: usuario.email };
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('A chave secreta JWT (JWT_SECRET) não foi definida no ambiente.');
      throw new Error('Erro de configuração interna do servidor.');
    }

    return jwt.sign(tokenPayload, secret, { expiresIn: '1h' });
    
  } finally {
    if (conn) conn.release();
  }
};