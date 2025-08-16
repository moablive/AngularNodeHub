import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private authService: AuthService) { }

  /**
   * Busca o token e monta o cabeçalho de autorização.
   * Lança um erro se o token não for encontrado.
   */
  private getAuthHeaders() {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Nenhum token de autenticação encontrado.');
    }
    return {
      Authorization: `Bearer ${token}`
    };
  }

  /**
   * Busca todos os produtos.
   */
  async getAllProducts(): Promise<IProduct[]> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.get(this.apiUrl, { headers });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  }

  /**
   * Busca um único produto pelo seu ID.
   */
  async getProductById(id: number): Promise<IProduct> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.get(`${this.apiUrl}/${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar produto com ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Cria um novo produto, enviando dados de texto e imagem.
   * @param productData Um objeto FormData contendo nome, preco e a imagem.
   */
  async createProduct(productData: FormData): Promise<IProduct> {
    try {
      const headers = this.getAuthHeaders();
      // Ao enviar FormData, axios configura o 'Content-Type' para 'multipart/form-data' automaticamente.
      const response = await axios.post(this.apiUrl, productData, { headers });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  }

  /**
   * Atualiza um produto existente.
   * @param id O ID do produto a ser atualizado.
   * @param productData Um objeto FormData com os novos dados.
   */
  async updateProduct(id: number, productData: FormData): Promise<IProduct> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.put(`${this.apiUrl}/${id}`, productData, { headers });
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar produto com ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Deleta um produto pelo seu ID.
   */
  async deleteProduct(id: number): Promise<void> {
    try {
      const headers = this.getAuthHeaders();
      await axios.delete(`${this.apiUrl}/${id}`, { headers });
    } catch (error) {
      console.error(`Erro ao deletar produto com ID ${id}:`, error);
      throw error;
    }
  }
}