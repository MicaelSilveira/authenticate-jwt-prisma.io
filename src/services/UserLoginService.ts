import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AplicationServerError } from "../async_error_msg";
import { prismaClient } from "../client/prismaClient";
export class UserLoginService {
  async execute({ email, password }) {
    if (!email || !password) {
      throw new AplicationServerError(401, "Incomplete data");
    }
    const user_valid = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });
    if (!user_valid) {
      throw new AplicationServerError(404, "Email/password invalid");
    }

    const password_valid = await compare(password, user_valid.password);

    if (!password_valid) {
      throw new AplicationServerError(404, "Email/password invalid");
    }
    const token = jwt.sign(
      {
        email: user_valid.email,
      },
      "15086ac417c36c74ced9353a44e74898",
      {
        subject: user_valid.id,
        expiresIn: "90s",
      }
    );
    return {
      user: {
        firstname: user_valid.firstname,
        lastname: user_valid.lastname,
        nickname: user_valid.nickname,
        avatar_img: user_valid.avatar_img,
        email: user_valid.email,
      },
      token,
    };
  }
}
