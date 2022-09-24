export type postInput = {
  user_id: string;
  title: string;
  slug: string;
  post_nickname: string;
  post_img: string;
};
export type postOutput = {
  title?: string;
  post_nickname?: string;
  post_img?: string;
  created_at?: Date;
};
export interface IPostRepository {
  create({}: postInput): Promise<postOutput>;
}
