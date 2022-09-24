import { prismaClient } from "../../client/prismaClient";
import type {
  IuserInput,
  IuserOutput,
  IUserRepository,
} from "../IUserRepository";

export class UserReposotory implements IUserRepository {
  async create({ firstname, lastname, nickname, email, password }: IuserInput) {
    const newUser: IuserOutput = await prismaClient.user.create({
      data: { firstname, lastname, nickname, email, password },
      select: {
        email: true,
        created_at: true,
      },
    });
    return newUser;
  }
  async update({ id, firstname, lastname, nickname, password }: IuserInput) {
    const updateUser: IuserOutput = await prismaClient.user.update({
      where: { id },
      data: {
        firstname,
        lastname,
        nickname,
        password,
      },
      select: {
        firstname: true,
        lastname: true,
        nickname: true,
      },
    });
    return updateUser;
  }
  async getUser(id: string) {
    const user: IuserOutput | null = await prismaClient.user.findFirst({
      where: {
        id,
      },
      select: {
        firstname: true,
        lastname: true,
        nickname: true,
        avatar_img: true,
        email: true,
      },
    });
    return user;
  }
}
