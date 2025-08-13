// src/services/productService.ts

import { IProduct, ProductInput } from '../../interfaces/IProduct';
import { withConnection } from '../../utils/withConnection';

// Criar um novo produto
export const createProduct = (product: ProductInput): Promise<IProduct> => {
  return withConnection(async (conn) => {
    const { nome, preco, img_base64 } = product;
    const result = await conn.query(
      'INSERT INTO products (nome, preco, img_base64) VALUES (?, ?, ?)',
      [nome, preco, img_base64 || null]
    );
    return { id: Number(result.insertId), nome, preco, img_base64 };
  });
};

// Listar todos os produtos
export const findAllProducts = (): Promise<IProduct[]> => {
  return withConnection(async (conn) => {
    const rows: IProduct[] = await conn.query('SELECT * FROM products');
    return rows;
  });
};

// Encontrar um produto por ID
export const findProductById = (id: number): Promise<IProduct | null> => {
  return withConnection(async (conn) => {
    const rows: IProduct[] = await conn.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  });
};

// Atualizar um produto
export const updateProduct = (id: number, product: ProductInput): Promise<IProduct | null> => {
  return withConnection(async (conn) => {
    const { nome, preco, img_base64 } = product;
    const result = await conn.query(
      'UPDATE products SET nome = ?, preco = ?, img_base64 = ? WHERE id = ?',
      [nome, preco, img_base64 || null, id]
    );
    if (result.affectedRows === 0) {
      return null;
    }
    const updatedRows: IProduct[] = await conn.query('SELECT * FROM products WHERE id = ?', [id]);
    return updatedRows[0];
  });
};

// Deletar um produto
export const removeProduct = (id: number): Promise<boolean> => {
  return withConnection(async (conn) => {
    const result = await conn.query('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  });
};