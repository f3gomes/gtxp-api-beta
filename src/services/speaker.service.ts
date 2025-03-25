import { Speaker } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findSpeakerById = async (id: string) => {
  const speaker = await prisma.speaker.findUnique({ where: { id } });
  return speaker;
};

const createSpeaker = async (data: Speaker): Promise<any> => {
  const speaker = await prisma.speaker.create({ data });
  return speaker;
};

const getSpeakersList = async (): Promise<Object> => {
  const speakers = await prisma.speaker.findMany();

  return speakers;
};

const updateSpeaker = async (id: string, data: any): Promise<any> => {
  const speaker = await findSpeakerById(id);

  if (!speaker) {
    throw new Error("Usuário não encontrado");
  }

  if (speaker) {
    const updated = await prisma.speaker.update({
      where: { id },
      data,
    });

    return updated;
  }
};

export default {
  createSpeaker,
  getSpeakersList,
  findSpeakerById,
  updateSpeaker,
};
