// Para o formulário de LOGIN
export interface LoginCredentials {
  email: string;
  senha: string;
}

// Para a resposta do LOGIN
export interface AuthResponse {
  token: string;
}

// TOKEN
export interface AuthPayload {
  userId: number;
  email: string;
}

// Para o formulário de REGISTRO
export interface RegistrationData {
  email: string;
  senha: string;
  nome?: string;
}

// ADICIONADO: Para o formulário de ATUALIZAÇÃO de usuário
// Os campos são opcionais, pois o usuário pode querer atualizar apenas um deles.
export interface UpdateUserData {
  email?: string;
  senha?: string;
}

// Para representar o que o backend RETORNA ao listar usuários
export interface User {
  id: number;
  email: string;
  nome?: string;
  dataCriacao: Date;
}
