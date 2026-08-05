"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const base_repository_1 = __importDefault(require("./base.repository"));
class FeiticoRepositorio extends base_repository_1.default {
    constructor() {
        super('view_feitico', 'idCarta');
    }
    async create(data) {
        await db_1.default.query(`INSERT INTO Feiticos (idCarta, tipoFeitico)
             VALUES (?, ?)
             ON DUPLICATE KEY UPDATE tipoFeitico = VALUES(tipoFeitico)`, [data.idCarta, data.tipoFeitico]);
        return this.findById(data.idCarta);
    }
    async update(id, data) {
        const [result] = await db_1.default.query(`UPDATE Feiticos SET tipoFeitico = ? WHERE idCarta = ?`, [data.tipoFeitico, id]);
        if (result.affectedRows === 0)
            return null;
        return this.findById(id);
    }
    async remove(id) {
        const [result] = await db_1.default.query(`DELETE FROM Feiticos WHERE idCarta = ?`, [id]);
        return result.affectedRows > 0;
    }
}
exports.default = new FeiticoRepositorio();
