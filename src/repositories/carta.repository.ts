import BaseRepositorio from "./base.repository";
import pool from "../config/db";
import { Colecao } from "../model/Colecao";

class CartaRepositorio extends BaseRepositorio {
    constructor() {
        super('Cartas', 'idCarta');
    }

async inserirColecoes(idCarta: number, colecoes: Colecao[]): Promise<void> {
    for (const colecao of colecoes) {
        if (colecao.isValid()) {
            await pool.query(
                `INSERT INTO Colecoes (idColecao, nome, raridade)
                 VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE nome = VALUES(nome), raridade = VALUES(raridade)`,
                [colecao.id, colecao.nome, colecao.raridade]
            );

            await pool.query(
                `INSERT IGNORE INTO CartasColecoes (idColecao, idCarta) VALUES (?, ?)`,
                [colecao.id, idCarta]
            );
        }
    }
}

    async buscarColecoesPorCarta(idCarta: number): Promise<Colecao[]> {
        const [rows]: any = await pool.query(
            `SELECT co.idColecao, co.nome, co.raridade
             FROM Colecoes co
             INNER JOIN CartasColecoes cc ON cc.idColecao = co.idColecao
             WHERE cc.idCarta = ?`,
            [idCarta]
        );
        return rows.map((r: any) => new Colecao(r.idColecao, r.nome, r.raridade));
    }

    // carta.repository.ts
async removerColecoes(idCarta: number): Promise<void> {
    await pool.query(
        `DELETE FROM CartasColecoes WHERE idCarta = ?`,
        [idCarta]
    );
}
}

export default new CartaRepositorio();