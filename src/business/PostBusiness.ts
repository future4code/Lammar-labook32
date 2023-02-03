import { PostDatabase } from "../data/PostDatabase"
import { invalidData, invalidId, invalidType } from "../error/postError"
import { InsertPostInputDTO, PostInputDTO } from "../model/PostDTO"
import { generateId } from "../services/idGenerator"


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

    let idExists = await postDatabase.search("author_id", "like", authorId)

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

  getAll = async (): Promise <any> => {
    const posts = await new PostDatabase().getAll()
    return posts
  }
}
