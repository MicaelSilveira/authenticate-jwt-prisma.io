import { hash } from "bcryptjs";
import { AplicationServerError } from "../async_error_msg";
import { prismaClient } from "../client/prismaClient";
import { UserReposotory } from "../repositories/implementations/UserRepository";
import { IuserInput } from "../repositories/IUserRepository";
export class UserCreateService {
  async execute({
    firstname,
    lastname,
    nickname,
    password,
    email,
  }: IuserInput) {
    if (!firstname || !lastname || !nickname || !password || !email) {
      throw new AplicationServerError(401, "Incomplete data");
    }
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            nickname,
          },
        ],
      },
      select: {
        email: true,
        nickname: true,
      },
    });
    if (userAlreadyExists) {
      throw new AplicationServerError(404, "User Already Exists");
    }
    const userRepository = new UserReposotory();

    const passwordHash = await hash(password, 8);

    const newUser = await userRepository.create({
      firstname,
      lastname,
      nickname,
      password: passwordHash,
      email,
    });
    return newUser;
  }
}
