import { prismaClient } from "../../client/prismaClient";
import { IPostRepository, postInput, postOutput } from "../IPostRepository";

export default class PostRepository implements IPostRepository {
  async create({ user_id, post_img, post_nickname, title, slug }: postInput) {
    const newPost: postOutput = await prismaClient.post.create({
      data: { user_id, post_img, post_nickname, title, slug },
      select: {
        created_at: true,
      },
    });
    return newPost;
  }
}
