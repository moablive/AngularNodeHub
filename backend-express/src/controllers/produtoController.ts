// src/controllers/productController.ts

import { Request, Response } from 'express';
import * as productService from '../services/products/productService';
import { bufferToBase64 } from '../utils/imageConverter';

// bufferToBase64
export const createProduct = async (req: Request, res: Response) => {
  console.log('Controller: Chamada para criar produto recebida.');
  try {
    const { nome, preco } = req.body;
    let img_base64: string | undefined = undefined;

    if (req.file) {
      console.log('Controller: Arquivo de imagem recebido.');
      img_base64 = bufferToBase64(req.file.buffer, req.file.mimetype);
    }

    const productData = { nome, preco, img_base64 };
    console.log('Controller: Dados do produto para criar:', productData);
    const product = await productService.createProduct(productData);
    
    console.log('Controller: Produto criado com sucesso.');
    res.status(201).json(product);
  } catch (error) {
    console.error('Controller: Erro ao criar produto:', error);
    res.status(500).json({ message: 'Erro ao criar produto.' });
  }
};

// bufferToBase64
export const updateProduct = async (req: Request, res: Response) => {
  console.log(`Controller: Chamada para atualizar produto com id: ${req.params.id}.`);
  try {
    const id = parseInt(req.params.id);
    
    // Primeiro, buscamos o produto existente para garantir que ele existe
    const existingProduct = await productService.findProductById(id);
    if (!existingProduct) {
      console.log(`Controller: Produto com id: ${id} não encontrado.`);
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    // Criamos um objeto de atualização com os dados existentes
    const productDataToUpdate = {
      nome: req.body.nome || existingProduct.nome,
      preco: req.body.preco || existingProduct.preco,
      img_base64: existingProduct.img_base64 
    };

    if (req.file) {
      console.log('Controller: Arquivo de imagem recebido para atualização.');
      productDataToUpdate.img_base64 = bufferToBase64(req.file.buffer, req.file.mimetype);
    }

    console.log('Controller: Dados do produto para atualizar:', productDataToUpdate);
    const updatedProduct = await productService.updateProduct(id, productDataToUpdate);

    console.log('Controller: Produto atualizado com sucesso.');
    res.status(200).json(updatedProduct);

  } catch (error) {
    console.error('Controller: Erro ao atualizar produto:', error);
    res.status(500).json({ message: 'Erro ao atualizar produto.' });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  console.log('Controller: Chamada para buscar todos os produtos.');
  try {
    const products = await productService.findAllProducts();
    console.log(`Controller: ${products.length} produtos encontrados.`);
    res.status(200).json(products);
  } catch (error) {
    console.error('Controller: Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro ao buscar produtos.' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  console.log(`Controller: Chamada para buscar produto com id: ${req.params.id}.`);
  try {
    const id = parseInt(req.params.id);
    const product = await productService.findProductById(id);
    if (product) {
      console.log(`Controller: Produto com id: ${id} encontrado.`);
      res.status(200).json(product);
    } else {
      console.log(`Controller: Produto com id: ${id} não encontrado.`);
      res.status(404).json({ message: 'Produto não encontrado.' });
    }
  } catch (error) {
    console.error('Controller: Erro ao buscar produto por id:', error);
    res.status(500).json({ message: 'Erro ao buscar produto.' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  console.log(`Controller: Chamada para deletar produto com id: ${req.params.id}.`);
  try {
    const id = parseInt(req.params.id);
    const success = await productService.removeProduct(id);
    if (success) {
      console.log(`Controller: Produto com id: ${id} deletado com sucesso.`);
      res.status(204).send();
    } else {
      console.log(`Controller: Produto com id: ${id} não encontrado para deleção.`);
      res.status(404).json({ message: 'Produto não encontrado.' });
    }
  } catch (error) {
    console.error('Controller: Erro ao deletar produto:', error);
    res.status(500).json({ message: 'Erro ao deletar produto.' });
  }
};