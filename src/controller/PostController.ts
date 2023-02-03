import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostInputDTO } from "../model/PostDTO";

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

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await new PostBusiness().getAll();
        res.send(posts).status(200);
    } catch (error:any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  }
}
