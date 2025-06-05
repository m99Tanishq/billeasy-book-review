import { z } from "zod";

export const reviewSchema = z.object({
    body: z.object({
        rating: z.number(),
        title: z.string(),
        content: z.string(),
        readingStatus: z.string(),
    })
});