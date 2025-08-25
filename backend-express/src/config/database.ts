// src/config/database.ts

import mariadb from 'mariadb';
import 'dotenv/config';

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

async function testConnection() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log("Conexão com o MariaDB estabelecida com sucesso!");
    } catch (err) {
        console.error("Falha ao conectar com o MariaDB:", err);
        throw err;
    } finally {
        if (conn) conn.release();
    }
}

testConnection();

export default pool;