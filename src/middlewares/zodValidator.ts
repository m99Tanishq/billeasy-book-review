import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import type { AnyZodObject } from "zod";

export const zodValidator =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(error.issues[0]);
      }
      next(error);
    }
  };
