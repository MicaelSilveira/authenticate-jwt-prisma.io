export type IuserInput = {
  id?: string;
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  password: string;
  avatar_img?: string;
};

export type IuserOutput = {
  firstname?: string;
  lastname?: string;
  nickname?: string;
  avatar_img?: string;
  created_at?: Date;
  email?: string;
};

export interface IUserRepository {
  create({}: IuserInput): Promise<IuserOutput>;
  update({}: IuserInput): Promise<IuserOutput>;
  getUser(id: string): Promise<IuserOutput | null>;
}
