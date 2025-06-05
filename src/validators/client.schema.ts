import { z } from "zod";

export const ClientSignUpSchema = z.object({
  name: z.string().min(1),
});