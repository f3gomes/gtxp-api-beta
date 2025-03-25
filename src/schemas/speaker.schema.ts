import { z } from "zod";

export const speakerSchema = z.object({
  profileImgUrl: z.string().optional(),
  name: z.string().min(2, {}),
  role: z.string(),
  company: z.string(),
  description: z.string().optional(),
  linkedin: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
});
