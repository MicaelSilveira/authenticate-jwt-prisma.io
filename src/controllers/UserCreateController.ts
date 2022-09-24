import { Request, Response } from "express";
import { UserCreateService } from "../services/UserCreateService";
export class UserCreateController {
  async handle(req: Request, res: Response) {
    const { firstname, lastname, nickname, password, email } = req.body;

    const user_service = new UserCreateService();

    const newUser = await user_service.execute({
      firstname,
      lastname,
      nickname,
      password,
      email,
    });
    return res.status(201).json(newUser);
  }
}
