import pool from "../config/db";
import BaseRepositorio from "./base.repository";

class FeiticoRepositorio extends BaseRepositorio {
    constructor() {
        super('view_feitico', 'idCarta');
    }

    async create(data: Record<string, any>): Promise<any> {
        await pool.query(
            `INSERT INTO Feiticos (idCarta, tipoFeitico)
             VALUES (?, ?)
             ON DUPLICATE KEY UPDATE tipoFeitico = VALUES(tipoFeitico)`,
            [data.idCarta, data.tipoFeitico]
        );
        return this.findById(data.idCarta);
    }

    async update(id: number, data: Record<string, any>): Promise<any | null> {
        const [result]: any = await pool.query(
            `UPDATE Feiticos SET tipoFeitico = ? WHERE idCarta = ?`,
            [data.tipoFeitico, id]
        );
        if (result.affectedRows === 0) return null;
        return this.findById(id);
    }

    async remove(id: number): Promise<boolean> {
        const [result]: any = await pool.query(
            `DELETE FROM Feiticos WHERE idCarta = ?`, [id]
        );
        return result.affectedRows > 0;
    }
}

export default new FeiticoRepositorio();