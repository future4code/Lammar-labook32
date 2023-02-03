import { UserDatabase } from "../data/UserDatabase"
import { invalidData, invalidEmail, invalidPassword } from "../error/userError"
import { UserInputDTO } from "../model/userDTO"
import { generateId } from "../services/idGenerator"
import {user} from "../model/User"

export class UserBusiness {
  async create({ email, name, password }: UserInputDTO):Promise<void> {
    if (!email || !name || !password) {
      throw new invalidData()
    }

    if(!email.includes("@")){
      throw new invalidEmail()
    }

    if(password.length < 6){
      throw new invalidPassword()
    }

    const id = generateId()

    const user: user = {
      id,
      name,
      email,
      password
    }

    const userDatabase = new UserDatabase()
    await userDatabase.create(user)
  }

  getAll = async (): Promise <user[]> => {
    const users = await new UserDatabase().getAll()
    return users
  }
}
