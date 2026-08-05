"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const base_repository_1 = __importDefault(require("./base.repository"));
class MonstroRepositorio extends base_repository_1.default {
    constructor() {
        super('view_monstro', 'idCarta');
    }
    async create(data) {
        await db_1.default.query(`INSERT INTO Monstros (idCarta, ataque, defesa, nivel, raca)
             VALUES (?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE ataque = VALUES(ataque), defesa = VALUES(defesa), nivel = VALUES(nivel), raca = VALUES(raca)`, [data.idCarta, data.ataque, data.defesa, data.nivel, data.raca]);
        return this.findById(data.idCarta);
    }
    async update(id, data) {
        const [result] = await db_1.default.query(`UPDATE Monstros SET ataque = ?, defesa = ?, nivel = ?, raca = ? WHERE idCarta = ?`, [data.ataque, data.defesa, data.nivel, data.raca, id]);
        if (result.affectedRows === 0)
            return null;
        return this.findById(id);
    }
    async remove(id) {
        const [result] = await db_1.default.query(`DELETE FROM Monstros WHERE idCarta = ?`, [id]);
        return result.affectedRows > 0;
    }
}
exports.default = new MonstroRepositorio();
