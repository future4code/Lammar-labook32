import { CustomError } from "../error/customError";
import { InsertPostInputDTO } from "../model/PostDTO";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  private static TABLE_NAME = "labook_posts";

  async create(post: InsertPostInputDTO): Promise<void> {
    await PostDatabase.connection
      .insert(post)
      .into(PostDatabase.TABLE_NAME);
  }

  getAll = async(): Promise<any> => {
    try {
        const result = await PostDatabase.connection().select("*").from(PostDatabase.TABLE_NAME)
        return result
    } catch (error:any) {
        throw new CustomError(error.statusCode, error.message)
    }
  }
}
