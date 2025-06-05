    import { z } from "zod";

    export const bookSchema = z.object({
        body: z.object({
            title: z.string({
                required_error: "Title is required",
                invalid_type_error: "Title must be a string",
            }),
            author: z.string({
                required_error: "Author is required",
                invalid_type_error: "Author must be a string",
            }),
            description: z.string({
                required_error: "Description is required",
                invalid_type_error: "Description must be a string",
            }),
            genre: z.string({
                required_error: "Genre is required",
                invalid_type_error: "Genre must be a string",
            }),
            publisher: z.string({
                required_error: "Publisher is required",
                invalid_type_error: "Publisher must be a string",
            }),
        })
    });