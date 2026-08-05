import pool from "../config/db";

class BaseRepositorio {
  protected table: string;
  protected primaryKey: string;

  constructor(table: string, primaryKey: string = 'id') {
    this.table = table;
    this.primaryKey = primaryKey;
  }

  async findAll(): Promise<any[]> {
    const [rows]: any = await pool.query(
      `SELECT * FROM ${this.table} ORDER BY ${this.primaryKey}`
    );
    return rows;
  }

  async findById(id: number | string): Promise<any | null> {
    const [rows]: any = await pool.query(
      `SELECT * FROM ${this.table} WHERE ${this.primaryKey} = ?`,
      [id]
    );
    return rows[0] || null;
  }

  async create(data: Record<string, any>): Promise<any> {
    console.log("Repository");

    const columns = Object.keys(data);
    const values = Object.values(data);

    console.log('Coluna: ', data);

    const placeholders = columns.map(() => '?').join(', ');

    const query = `INSERT INTO ${this.table} (${columns.join(', ')}) VALUES (${placeholders})
             ON DUPLICATE KEY UPDATE ${columns.map(c => `${c} = ${c}`).join(', ')}`;

    console.log('Query feito do insert: ', query);

    await pool.query(
      query,
      values
    );
    return this.findById(data[this.primaryKey]);
  }

  async update(id: number | string, data: Record<string, any>): Promise<any | null> {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const setClause = columns.map(col => `${col} = ?`).join(', ');

    const [result]: any = await pool.query(
      `UPDATE ${this.table} SET ${setClause} WHERE ${this.primaryKey} = ?`,
      [...values, id]
    );
    if (result.affectedRows === 0) return null;
    return this.findById(id);
  }

  async remove(id: number | string): Promise<boolean> {
    const [result]: any = await pool.query(
      `DELETE FROM ${this.table} WHERE ${this.primaryKey} = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }
}

export default BaseRepositorio;