// src/utils/withConnection.ts

import { PoolConnection } from 'mariadb';
import pool from '../config/database';

/**
 * Função auxiliar para gerenciar conexões do pool, garantindo que a conexão
 * seja sempre liberada, mesmo em caso de erro.
 * @param action A função que executa a query, recebendo a conexão como argumento.
 */
export const withConnection = async <T>(action: (conn: PoolConnection) => Promise<T>): Promise<T> => {
  let conn;
  try {
    conn = await pool.getConnection();
    return await action(conn);
  } finally {
    if (conn) conn.release();
  }
};