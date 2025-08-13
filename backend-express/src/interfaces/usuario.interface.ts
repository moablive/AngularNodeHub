// src/interfaces/usuario.interface.ts

/**
 * Define a forma pública e segura de um usuário.
 * Esta é a nossa interface base para dados de usuário.
 */
export interface UsuarioPublico {
  id: number;
  email: string;
  nome?: string; 
  dataCriacao: Date;
}

/**
 * Define a entidade completa do usuário, para uso interno no servidor.
 * Herda todos os campos de UsuarioPublico e adiciona os dados sensíveis.
 */
export interface Usuario extends UsuarioPublico {
  senhaHash: string;
}

/**
 * DTO (Data Transfer Object) para representar os dados necessários
 * para criar um novo usuário.
 */
export type CriarUsuarioDTO = Omit<Usuario, 'id' | 'dataCriacao'>;

// Se quiser ser ainda mais explícito no DTO, para usar no controller:
export type DadosEntradaCriarUsuario = Omit<CriarUsuarioDTO, 'senhaHash'> & {
  senha?: string; // A senha pode ser opcional aqui se você permitir logins sociais, etc.
};

/**
 * Define a estrutura de dados esperada no corpo da requisição de login.
 */
export interface DadosEntradaLogin {
  email: string;
  senha: string;
}

/**
 * Define a estrutura de dados esperada no corpo da requisição de Update.
 */
export interface DadosEntradaAtualizarUsuario {
  email?: string;
  senha?: string;
}

/**
 * Define a estrutura de dados que esperamos encontrar
 * dentro do payload de um token JWT válido.
 */
export interface AuthPayload {
  userId: number;
  email: string;
  // No futuro, adicionar campos como 'roles'.
}