import { CustomError } from "../error/customError";
import { InsertFriendshipInputDTO } from "../model/FrienshipDTO";
import { BaseDatabase } from "./BaseDatabase";

export class FriendshipDatabase extends BaseDatabase {
  private static TABLE_NAME = "labook_friendship";

  async create(friendship: InsertFriendshipInputDTO): Promise<void> {
    await FriendshipDatabase.connection
      .insert(friendship)
      .into(FriendshipDatabase.TABLE_NAME);
  }

  async delete (user_id: string, friend_id:string): Promise<void> {
    await FriendshipDatabase.connection
    .delete()
    .where ({user_id, friend_id})
    .from(FriendshipDatabase.TABLE_NAME)
  }

  async search (item: any, like: any, value: any) {
    const result = await FriendshipDatabase.connection
    .select()
    .where(item, like, value)
    .from(FriendshipDatabase.TABLE_NAME)

    return result
  }

  async searchById (id:string) {
    const result = await FriendshipDatabase.connection
    .select()
    .where({id})
    .from(FriendshipDatabase.TABLE_NAME)

    return result[0]
  }

  getAll = async(): Promise<any> => {
    try {
        const result = await FriendshipDatabase
        .connection()
        .select("*")
        .from(FriendshipDatabase.TABLE_NAME)

        return result
    } catch (error:any) {
        throw new CustomError(error.statusCode, error.message)
    }
  }
}
