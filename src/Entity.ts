import db from "./app";
import { Logger } from "./Logger";
import { Logs } from "./Logs";

export class Entity {
  protected static table: string;
  protected id?: number;

  setId(id: number) {
    this.id = id;
    return this;
  }

  getId() {
    return this.id;
  }

  public static getTable(): string {
    return this.table;
  }

  static async getById(id: number): Promise<any> {
    return await db(this.table).first().where("id", id);
  }

  static async getByColumn(
    column: string,
    value: string,
    one: boolean = true
  ): Promise<any> {
    let qb = db(this.table).where(column, value);
    return one ? await qb.first() : await qb;
  }

  static async getByColumns(params: object, one: boolean = true): Promise<any> {
    let qb = db(this.table).where(params);
    return one ? await qb.first() : await qb;
  }

  static getQueryBuilder() {
    return db(this.table);
  }

  async _save(data: object, table: string): Promise<number> {
    if (this.id) {
      const id: number[] = await db(table)
        .where({ id: this.id })
        .update(data)
        .returning("id");
      return id[0];
    } else {
      const id: number[] = await db(table).insert(data).returning("id");
      this.id = id[0];
      return this.id;
    }
  }

  static async linkLog(id: number, ids: Array<number>) {
    let linkTable = this.table + "_" + Logs.getTable(),
      entityIdField = this.table.substring(0, this.table.length - 1) + "_id",
      params: any = {};

    params[entityIdField] = id;

    ids.forEach(async (logId) => {
      params["log_id"] = logId;
      await db(linkTable).insert(params);
    });
  }

  static async note(
    id: number,
    ...messages: Array<string>
  ): Promise<Array<number>> {
    let ids = await Logger.note(...messages);
    this.linkLog(id, ids);
    return ids;
  }

  static async error(
    id: number,
    ...messages: Array<string>
  ): Promise<Array<number>> {
    let ids = await Logger.error(...messages);
    this.linkLog(id, ids);
    return ids;
  }

  static async warning(
    id: number,
    ...messages: Array<string>
  ): Promise<Array<number>> {
    let ids = await Logger.warning(...messages);
    this.linkLog(id, ids);
    return ids;
  }

  static async debug(
    id: number,
    ...messages: Array<string>
  ): Promise<Array<number>> {
    let ids = await Logger.debug(...messages);
    this.linkLog(id, ids);
    return ids;
  }
}
