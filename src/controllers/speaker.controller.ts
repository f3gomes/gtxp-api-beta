import { Request, Response } from "express";
import speakerService from "../services/speaker.service";
import { Speaker } from "@prisma/client";

const getSpeakerById = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const speaker = await speakerService.findSpeakerById(id);

    if (!speaker) {
      return res.status(401).json({ message: "Speaker não encontrado" });
    }

    return res.status(200).json({ speaker });
  } catch (error: any) {
    const errorMessages = error.message.split("\n");
    const lastErrorMessage = errorMessages[errorMessages.length - 1];

    return res.status(500).json({ error: lastErrorMessage });
  }
};

const postSpeaker = async (
  req: Request,
  res: Response
): Promise<Speaker | any> => {
  const { name } = req.body;

  try {
    const speaker = await speakerService.createSpeaker(req.body);
    return res.status(201).json({ speaker });
  } catch (error: any) {
    const errorMessages = error.message.split("\n");
    const lastErrorMessage = errorMessages[errorMessages.length - 1];

    res.status(500).json({ error: lastErrorMessage });
    console.log(error);
  }
};

const getSpeakers = async (
  req: Request,
  res: Response
): Promise<Speaker[] | any> => {
  try {
    const speakerList: any = await speakerService.getSpeakersList();

    return res.status(200).json({ speakerList });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const patchSpeaker = async (
  req: Request,
  res: Response
): Promise<Speaker | any> => {
  const { id } = req.params;

  try {
    const speaker = await speakerService.updateSpeaker(id, req.body);
    return res.status(200).json({ speaker });
  } catch (error: any) {
    const errorMessages = error.message.split("\n");
    const lastErrorMessage = errorMessages[errorMessages.length - 1];

    res.status(500).json({ error: lastErrorMessage });
    console.log(error);
  }
};

export default {
  getSpeakerById,
  postSpeaker,
  getSpeakers,
  patchSpeaker,
};
