import { FriendshipDatabase } from "../data/FriendshipDatabase"
import { PostDatabase } from "../data/PostDatabase"
import { UserDatabase } from "../data/UserDatabase"
import { CustomError } from "../error/customError"
import { alreadyFriends, invalidData, invalidId, notFriends, sameId } from "../error/friendshipError"
import { FriendshipInputDTO, InsertFriendshipInputDTO } from "../model/FrienshipDTO"
import { post } from "../model/Post"
import { generateId } from "../services/idGenerator"


export class FriendshipBusiness {
  async create(input: FriendshipInputDTO) : Promise<void> {
    const { userId, friendId } = input

    if (!userId || !friendId) {
      throw new invalidData()
    }

    if (userId === friendId) {
      throw new sameId()
    }

    const friendshipDatabase = new FriendshipDatabase()

    const userDatabase = new UserDatabase()

    let userIdExists = await userDatabase.search("id", "like", userId)

    let friendIdExists = await userDatabase.search("id", "like", friendId)

    if (userIdExists.length < 1) {
        throw new invalidId
    }

    if (friendIdExists.length < 1) {
      throw new invalidId()
    }

    const allFriendships = await friendshipDatabase.getAll()

    const findFriendship = allFriendships.find( (item: { friend_id: string; user_id: string }) => {
      return (item.friend_id === friendId || item.friend_id === userId) && (item.user_id === friendId || item.user_id === userId)
    })

    if (findFriendship) {
      throw new alreadyFriends()
    }

    const id = generateId()

    const friendship: InsertFriendshipInputDTO = {
      id,
      user_id: userId, 
      friend_id: friendId
    }
    
    await friendshipDatabase.create(friendship)
  }

  async delete (input: FriendshipInputDTO): Promise<void> {
    const { userId, friendId } = input

    if (!userId || !friendId) {
      throw new invalidData()
    }

    if (userId === friendId) {
      throw new sameId()
    }

    const friendshipDatabase = new FriendshipDatabase()

    const userDatabase = new UserDatabase()

    let userIdExists = await userDatabase.search("id", "like", userId)

    let friendIdExists = await userDatabase.search("id", "like", friendId)

    if (userIdExists.length < 1) {
        throw new invalidId
    }

    if (friendIdExists.length < 1) {
      throw new invalidId()
    }

    const allFriendships = await friendshipDatabase.getAll()

    const findFriendship = allFriendships.find( (item: { friend_id: string; user_id: string }) => {
      return (item.friend_id === friendId || item.friend_id === userId) && (item.user_id === friendId || item.user_id === userId)
    })

    if (!findFriendship) {
      throw new notFriends()
    }
    await friendshipDatabase.delete(userId, friendId)
  }

  async getFeed (id: string ): Promise <void> {
  
  }
}
