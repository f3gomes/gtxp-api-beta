import { Speaker } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findSpeakerById = async (id: string) => {
  const speaker = await prisma.speaker.findUnique({ where: { id } });
  return speaker;
};

const createSpeaker = async (data: Speaker): Promise<any> => {
  return prisma.speaker.create({ data });
};

const getSpeakersList = async (): Promise<Object> => {
  const speakers = await prisma.speaker.findMany();

  return speakers;
};

export default {
  createSpeaker,
  getSpeakersList,
  findSpeakerById,
};
