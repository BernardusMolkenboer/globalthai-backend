import db from "../services/db";
import { Logs } from "./Logs";

export class Logger {
  protected static async insert(
    level: string,
    ...messages: Array<string>
  ): Promise<Array<number>> {
    const table = db(Logs.getTable());
    let insertedIds: Array<number> = [];
    for (let i = 0; i < messages.length; i++) {
      let id = await table.insert({ message: messages[i], level: level });
      insertedIds.push(id[0]);
    }
    return insertedIds;
  }

  static async note(...messages: Array<string>): Promise<Array<number>> {
    return Logger.insert("note", ...messages);
  }

  static async error(...messages: Array<string>): Promise<Array<number>> {
    return Logger.insert("error", ...messages);
  }

  static async warning(...messages: Array<string>): Promise<Array<number>> {
    return Logger.insert("warning", ...messages);
  }

  static async debug(...messages: Array<string>): Promise<Array<number>> {
    return Logger.insert("debug", ...messages);
  }
}
