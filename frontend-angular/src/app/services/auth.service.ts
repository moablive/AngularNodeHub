import { Injectable } from '@angular/core';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Importa a função de decodificação
import { environment } from '../../environments/environment';

// Importa nossas interfaces
import { LoginCredentials, AuthResponse, AuthPayload } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = `${environment.apiUrl}/user`;

  constructor() { }

  /**
   * Envia as credenciais para a API e tenta fazer o login.
   * Se bem-sucedido, salva o token no localStorage.
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log('[AuthService] Tentando fazer login para o usuário:', credentials.email);

    try {
      const response = await axios.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
      
      // LOG: Mostra a resposta completa recebida do backend.
      //console.log('[AuthService] Resposta da API recebida:', response.data);
      
      if (response.data && response.data.token) {
        
        // LOG: Confirma que um token foi encontrado e será salvo.
        console.log('[AuthService] Token encontrado. Salvando no localStorage.');

        this.saveToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      // Limpa qualquer token antigo em caso de falha no login
      this.logout();
      console.error('Erro no serviço de login:', error);
      throw error; // Re-lança o erro para o componente tratar
    }
  }

  /**
   * Salva o token no localStorage.
   */
  private saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  /**
   * Remove o token do localStorage para deslogar o usuário.
   */
  logout(): void {
    localStorage.removeItem('authToken');

    // LOG: Confirma que o logout foi efetuado.
    console.log('[AuthService] Usuário deslogado. Token removido.');
  }

  /**
   * Recupera o token salvo.
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Decodifica o token JWT para obter os dados do usuário (payload).
   * @returns O payload do token ou null se não houver token.
   */
  getUserData(): AuthPayload | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      // Usa a biblioteca jwt-decode para ler o conteúdo do token
      const decodedPayload: AuthPayload = jwtDecode(token);
      return decodedPayload;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }

  /**
   * Verifica se o usuário está logado.
   * Checa se existe um token e se ele não está expirado.
   */
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const payload: { exp?: number } = jwtDecode(token);
      // Verifica se o token tem uma data de expiração
      if (payload.exp === undefined) {
        return false; // Token sem data de expiração é inválido
      }
      // Converte a data de expiração (em segundos) para milissegundos
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(payload.exp);

      // Retorna true se a data de expiração for no futuro
      return expirationDate.valueOf() > new Date().valueOf();
    } catch (error) {
      // Se o token for mal formatado, a decodificação falhará
      return false;
    }
  }
}