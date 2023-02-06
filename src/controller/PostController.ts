import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostInputDTO } from "../model/PostDTO";
import { post } from "../model/Post";

export class PostController {
  async create(req: Request, res: Response):Promise<void> {
    try {
      const photo = req.body.photo
      const description = req.body.description 
      const type = req.body.type
      const authorId = req.body.authorId

      const input: PostInputDTO = {
        photo,
        description,
        type,
        authorId
      }

      const postBusiness = new PostBusiness();
      await postBusiness.create(input);

      res.status(201).send({ message: "Post cadastrado com sucesso" });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  }

  async getById (req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id

      const postBusiness = new PostBusiness()
      const post = await postBusiness.getById(id)
      
      res.status(200).send(post);
    } catch (error:any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  }
}
