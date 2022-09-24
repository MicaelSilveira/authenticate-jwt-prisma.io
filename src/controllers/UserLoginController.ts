import { Request, Response } from "express";
import { UserLoginService } from "../services/UserLoginService";
export class UserLoginController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const login_service = new UserLoginService();

    const { user, token } = await login_service.execute({ email, password });
    return res.json({
      user,
      token,
    });
  }
}
