import { z } from "zod";

export const reviewSchema = z.object({
    body: z.object({
        bookId: z.number({
            required_error: "Book ID is required",
            invalid_type_error: "Book ID must be a number",
        }),
        userId: z.number({
            required_error: "User ID is required",
            invalid_type_error: "User ID must be a number",
        }),
        rating: z.number(),
        title: z.string(),
        content: z.string(),
        readingStatus: z.string(),
    })
});