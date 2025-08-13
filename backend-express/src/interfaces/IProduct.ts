// src/interfaces/IProduct.ts

export interface IProduct {
  id: number;
  nome: string;
  preco: number;
  img_base64?: string;
  criado_em?: Date;
  atualizado_em?: Date;
}

export interface ProductInput { 
  nome: string; 
  preco: number; 
  img_base64?: string 
}