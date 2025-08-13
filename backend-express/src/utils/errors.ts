// src/utils/errors.ts

// Erro para quando as credenciais de login estão incorretas.
export class InvalidCredentialsError extends Error {
  constructor(message = 'Credenciais inválidas.') {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}

// Erro para quando um email já está em uso durante o registro.
export class EmailInUseError extends Error {
  constructor(message = 'Este email já está em uso.') {
    super(message);
    this.name = 'EmailInUseError';
  }
}

// Erro para quando uma operação busca um usuário por ID e não o encontra.
export class UserNotFoundError extends Error {
  constructor(message = 'Usuário não encontrado.') {
    super(message);
    this.name = 'UserNotFoundError';
  }
}