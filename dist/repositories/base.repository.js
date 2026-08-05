"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
class BaseRepositorio {
    constructor(table, primaryKey = 'id') {
        this.table = table;
        this.primaryKey = primaryKey;
    }
    async findAll() {
        const [rows] = await db_1.default.query(`SELECT * FROM ${this.table} ORDER BY ${this.primaryKey}`);
        return rows;
    }
    async findById(id) {
        const [rows] = await db_1.default.query(`SELECT * FROM ${this.table} WHERE ${this.primaryKey} = ?`, [id]);
        return rows[0] || null;
    }
    async create(data) {
        console.log("Repository");
        const columns = Object.keys(data);
        const values = Object.values(data);
        console.log('Coluna: ', data);
        const placeholders = columns.map(() => '?').join(', ');
        const query = `INSERT INTO ${this.table} (${columns.join(', ')}) VALUES (${placeholders})
             ON DUPLICATE KEY UPDATE ${columns.map(c => `${c} = ${c}`).join(', ')}`;
        console.log('Query feito do insert: ', query);
        await db_1.default.query(query, values);
        return this.findById(data[this.primaryKey]);
    }
    async update(id, data) {
        const columns = Object.keys(data);
        const values = Object.values(data);
        const setClause = columns.map(col => `${col} = ?`).join(', ');
        const [result] = await db_1.default.query(`UPDATE ${this.table} SET ${setClause} WHERE ${this.primaryKey} = ?`, [...values, id]);
        if (result.affectedRows === 0)
            return null;
        return this.findById(id);
    }
    async remove(id) {
        const [result] = await db_1.default.query(`DELETE FROM ${this.table} WHERE ${this.primaryKey} = ?`, [id]);
        return result.affectedRows > 0;
    }
}
exports.default = BaseRepositorio;
