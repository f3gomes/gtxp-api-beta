import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createPost = async (data: Post): Promise<any> => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  if (!user?.visible) {
    throw new Error("Altere seu perfil para poder publicar");
  }

  if (!user?.verified) {
    throw new Error("E-mail não verificado");
  }

  const post = await prisma.post.create({
    data: {
      name: data.name,
      email: data.email,
      profileImg: user.profileImgUrl,
      message: data.message,
      imgUrl: data.imgUrl,
      user: {
        connect: { id: user?.id },
      },
    },
  });

  return post;
};

const getAllPosts = async (): Promise<Post[]> => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return posts;
};

const getPostByEmail = async (email: string): Promise<Post[]> => {
  const posts = await prisma.post.findMany({
    where: {
      email,
    },
  });

  return posts;
};

export default {
  createPost,
  getAllPosts,
  getPostByEmail,
};
