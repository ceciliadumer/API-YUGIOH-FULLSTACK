"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const base_repository_1 = __importDefault(require("./base.repository"));
class ArmadilhaRepositorio extends base_repository_1.default {
    constructor() {
        super('view_armadilha', 'idCarta');
    }
    async create(data) {
        await db_1.default.query(`INSERT INTO Armadilhas (idCarta, tipoArmadilha)
             VALUES (?, ?)
             ON DUPLICATE KEY UPDATE tipoArmadilha = VALUES(tipoArmadilha)`, [data.idCarta, data.tipoArmadilha]);
        return this.findById(data.idCarta);
    }
    async update(id, data) {
        const [result] = await db_1.default.query(`UPDATE Armadilhas SET tipoArmadilha = ? WHERE idCarta = ?`, [data.tipoArmadilha, id]);
        if (result.affectedRows === 0) {
            return null;
        }
        return this.findById(id);
    }
    async remove(id) {
        const [result] = await db_1.default.query(`DELETE FROM Armadilhas WHERE idCarta = ?`, [id]);
        return result.affectedRows > 0;
    }
}
exports.default = new ArmadilhaRepositorio();
