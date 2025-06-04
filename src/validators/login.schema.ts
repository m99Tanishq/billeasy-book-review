import { z } from "zod";

export const LoginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Please enter a valid email",
      })
      .trim(),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

export type LoginSchema = z.infer<typeof LoginSchema.shape.body>;
