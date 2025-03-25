import express from "express";
import middleware from "../middlewares/auth";
import speakerController from "../controllers/speaker.controller";
import { speakerSchema } from "../schemas/speaker.schema";
import { validateData } from "../middlewares/validation";

export const speakerRouter = express.Router();

speakerRouter.get("/speaker/find/:id", speakerController.getSpeakerById);

speakerRouter.get(
  "/speaker/list",
  middleware.auth,
  speakerController.getSpeakers
);

speakerRouter.post(
  "/speaker/new",
  middleware.auth,
  validateData(speakerSchema),
  speakerController.postSpeaker
);

speakerRouter.patch(
  "/speaker/edit/:id",
  middleware.auth,
  speakerController.patchSpeaker
);
