"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = testConnection;
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'banco_exodia',
    waitForConnections: true,
    connectionLimit: 10
});
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Conectado ao banco de dados com sucesso.');
        connection.release();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao conectar ao banco:', error.message);
        }
    }
}
exports.default = pool;
