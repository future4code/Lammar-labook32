import { Request, Response } from "express";
import { FriendshipBusiness } from "../business/FriendshipBusiness";
import { UserBusiness } from "../business/UserBusiness";
import { FriendshipInputDTO, InsertFriendshipInputDTO } from "../model/FrienshipDTO";
import { post } from "../model/Post";

export class FriendshipController {
  async create(req: Request, res: Response):Promise<void> {
    try {
      const userId = req.body.userId
      const friendId = req.body.friendId

      const input: FriendshipInputDTO = {
        userId,
        friendId
      }

      const friendshipBusiness = new FriendshipBusiness();
      await friendshipBusiness.create(input);

      res.status(201).send({ message: "Amizade realizada com sucesso" });
    } catch (error: any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  }

  async delete (req: Request, res: Response): Promise<void> {
    try {
      const userId = req.body.userId
      const friendId = req.body.friendId

      const input: FriendshipInputDTO = {
        userId,
        friendId
      }

      const friendshipBusiness = new FriendshipBusiness();
      await friendshipBusiness.delete(input)

      res.status(201).send({ message: "Amizade desfeita com sucesso" });
    } catch (error:any) {
      res.status(error.statusCode || 400).send(error.message || error.sqlMessage);
    }
  }

  async getFeed (req: Request, res: Response): Promise<void> {
      const id = req.body.id
      
  }
}
