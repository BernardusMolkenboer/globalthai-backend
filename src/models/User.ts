import bcrypt from "bcryptjs";
import db from "../services/db";
import { Entity } from "./Entity";

export class User extends Entity {
  protected static table = "users";

  static async createUser(username: string, password: string): Promise<number> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [id] = await db(this.table)
      .insert({
        username,
        password: hashedPassword,
      })
      .returning("id");
    return id;
  }

  static async authenticateUser(
    username: string,
    password: string
  ): Promise<any> {
    const user = await db(this.table).where({ username }).first();
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
