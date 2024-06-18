import { Entity } from "./Entity";
import db from "../services/db";

export class Property extends Entity {
  protected static table = "properties";

  static async getAll(): Promise<any[]> {
    return await db(this.table).select("*");
  }

  static async getById(id: number): Promise<any> {
    return await db(this.table).where({ id }).first();
  }

  static async create(data: object): Promise<number> {
    const [id] = await db(this.table).insert(data).returning("id");
    return id;
  }

  static async update(id: number, data: object): Promise<number> {
    const [updatedId] = await db(this.table)
      .where({ id })
      .update(data)
      .returning("id");
    return updatedId;
  }

  static async delete(id: number): Promise<void> {
    await db(this.table).where({ id }).delete();
  }
}
