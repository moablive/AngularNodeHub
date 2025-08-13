import { AuthPayload } from '../../interfaces/usuario.interface';

// adiciona nossa propriedade ao tipo Request original do Express.
declare global {
  namespace Express {
    export interface Request {
      // A propriedade 'userData' agora é conhecida globalmente no projeto
      // e seu tipo é o nosso AuthPayload.
      userData?: AuthPayload;
    }
  }
}
