"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_repository_1 = __importDefault(require("./base.repository"));
const db_1 = __importDefault(require("../config/db"));
const Colecao_1 = require("../model/Colecao");
class CartaRepositorio extends base_repository_1.default {
    constructor() {
        super('Cartas', 'idCarta');
    }
    async inserirColecoes(idCarta, colecoes) {
        for (const colecao of colecoes) {
            if (colecao.isValid()) {
                await db_1.default.query(`INSERT INTO Colecoes (idColecao, nome, raridade)
                 VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE nome = VALUES(nome), raridade = VALUES(raridade)`, [colecao.id, colecao.nome, colecao.raridade]);
                await db_1.default.query(`INSERT IGNORE INTO CartasColecoes (idColecao, idCarta) VALUES (?, ?)`, [colecao.id, idCarta]);
            }
        }
    }
    async buscarColecoesPorCarta(idCarta) {
        const [rows] = await db_1.default.query(`SELECT co.idColecao, co.nome, co.raridade
             FROM Colecoes co
             INNER JOIN CartasColecoes cc ON cc.idColecao = co.idColecao
             WHERE cc.idCarta = ?`, [idCarta]);
        return rows.map((r) => new Colecao_1.Colecao(r.idColecao, r.nome, r.raridade));
    }
    // carta.repository.ts
    async removerColecoes(idCarta) {
        await db_1.default.query(`DELETE FROM CartasColecoes WHERE idCarta = ?`, [idCarta]);
    }
}
exports.default = new CartaRepositorio();
