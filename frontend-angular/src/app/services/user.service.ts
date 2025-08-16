import { Injectable } from '@angular/core';
import axios from 'axios';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { RegistrationData, User, UpdateUserData, LoginCredentials, AuthResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private authService: AuthService) {}

  private getAuthHeaders() {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Nenhum token de autenticação encontrado.');
    }
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, credentials);
      return response.data;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  async register(userData: RegistrationData): Promise<User> {
    try {
      const response = await axios.post(`${this.apiUrl}/register`, userData);
      return response.data;
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  }

  /**
   * Busca todos os usuários cadastrados. Requer autenticação.
   */
  async getAllUsers(): Promise<User[]> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.get(`${this.apiUrl}/getAllUsers`, { headers });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar todos os usuários:', error);
      throw error;
    }
  }

  /**
   * Atualiza os dados de um usuário.
   */
  async updateUser(userId: string, userData: UpdateUserData): Promise<User> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.put(`${this.apiUrl}/${userId}`, userData, { headers });
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar usuário com ID ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Remove um usuário pela ID. Requer autenticação.
   */
  async deleteUser(userId: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.delete(`${this.apiUrl}/${userId}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      throw error;
    }
  }
}
