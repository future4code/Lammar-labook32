import { PostDatabase } from "../data/PostDatabase"
import { UserDatabase } from "../data/UserDatabase"
import { invalidData, invalidId, invalidType } from "../error/postError"
import { post } from "../model/Post"
import { InsertPostInputDTO, PostInputDTO } from "../model/PostDTO"
import { generateId } from "../services/idGenerator"
import { UserBusiness } from "./UserBusiness"


export class PostBusiness {
  async create(input: PostInputDTO):Promise<void> {
    const { photo, description, type, authorId } = input

    if (!photo || !description || !type|| !authorId) {
      throw new invalidData()
    }

    if (type.toLocaleLowerCase() !== "event" && type.toLocaleLowerCase() !== "normal") {
      throw new invalidType()
    }

    const postDatabase = new PostDatabase()
    const userDatabase = new UserDatabase()

    let idExists = await userDatabase.search("id", "like", authorId)

    if (idExists.length < 1) {
        throw new invalidId()
    }

    const id = generateId()

    const post: InsertPostInputDTO = {
      id,
      photo,
      description, 
      type: type,
      author_id: authorId
    }
    
    await postDatabase.create(post)
  }

  async getById (id:string): Promise <post[]> {
    const postDatabase = new PostDatabase()

    let idExists = await postDatabase.search("id", "like", id)

    if (idExists.length < 1) {
        throw new invalidId()
    }

    const post = postDatabase.searchById(id)
    return post
  }
}
