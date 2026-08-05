import pool from "../config/db";
import BaseRepositorio from "./base.repository";

class ArmadilhaRepositorio extends BaseRepositorio {
    constructor() {
        super('view_armadilha', 'idCarta');
    }

    async create(data: Record<string, any>): Promise<any> {
        await pool.query(
            `INSERT INTO Armadilhas (idCarta, tipoArmadilha)
             VALUES (?, ?)
             ON DUPLICATE KEY UPDATE tipoArmadilha = VALUES(tipoArmadilha)`,
            [data.idCarta, data.tipoArmadilha]
        );
        return this.findById(data.idCarta);
    }

    async update(id: number, data: Record<string, any>): Promise<any | null> {
        const [result]: any = await pool.query(
            `UPDATE Armadilhas SET tipoArmadilha = ? WHERE idCarta = ?`,
            [data.tipoArmadilha, id]
        );
        if (result.affectedRows === 0) {
            return null;
        }
        return this.findById(id);
    }

    async remove(id: number): Promise<boolean> {
        const [result]: any = await pool.query(
            `DELETE FROM Armadilhas WHERE idCarta = ?`, [id]
        );
        return result.affectedRows > 0;
    }
}

export default new ArmadilhaRepositorio();