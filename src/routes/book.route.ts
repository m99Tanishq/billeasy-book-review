import { Router } from "express";
import { getAllBooksByAuthorAndTitleController, getBookByIdWithPaginatedReviewsController, createBookController, updateBookController, deleteBookController } from "../controllers/book.controller";
import { zodValidator } from "../middlewares/zodValidator";
import { bookSchema } from "../validators/book.schema";

export const bookRoutes = Router();

bookRoutes.get("/books", getAllBooksByAuthorAndTitleController);
bookRoutes.get("/books/:id", getBookByIdWithPaginatedReviewsController);

bookRoutes.post("/books", zodValidator(bookSchema), createBookController);

bookRoutes.put("/books/:id", zodValidator(bookSchema), updateBookController);

bookRoutes.delete("/books/:id", deleteBookController);