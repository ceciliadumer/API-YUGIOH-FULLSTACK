import pool from "../config/db";
import BaseRepositorio from "./base.repository";

class MonstroRepositorio extends BaseRepositorio {
    constructor() {
        super('view_monstro', 'idCarta');
    }

    async create(data: Record<string, any>): Promise<any> {
        await pool.query(
            `INSERT INTO Monstros (idCarta, ataque, defesa, nivel, raca)
             VALUES (?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE ataque = VALUES(ataque), defesa = VALUES(defesa), nivel = VALUES(nivel), raca = VALUES(raca)`,
            [data.idCarta, data.ataque, data.defesa, data.nivel, data.raca]
        );
        return this.findById(data.idCarta);
    }

    async update(id: number, data: Record<string, any>): Promise<any | null> {
        const [result]: any = await pool.query(
            `UPDATE Monstros SET ataque = ?, defesa = ?, nivel = ?, raca = ? WHERE idCarta = ?`,
            [data.ataque, data.defesa, data.nivel, data.raca, id]
        );
        if (result.affectedRows === 0) return null;
        return this.findById(id);
    }

    async remove(id: number): Promise<boolean> {
        const [result]: any = await pool.query(
            `DELETE FROM Monstros WHERE idCarta = ?`, [id]
        );
        return result.affectedRows > 0;
    }
}

export default new MonstroRepositorio();