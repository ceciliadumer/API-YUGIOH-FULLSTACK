import mysql, { Pool } from 'mysql2/promise';

const pool: Pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'banco_exodia',
    waitForConnections: true,
    connectionLimit: 10
});

export async function testConnection(): Promise<void> {
    try {
        const connection = await pool.getConnection();

        console.log('Conectado ao banco de dados com sucesso.');

        connection.release();
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao conectar ao banco:', error.message);
        }
    }
}
testConnection();
export default pool;