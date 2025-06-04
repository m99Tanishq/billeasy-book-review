import { Router } from "express";
import {
  getAllPaginatedBooksByAuthorAndTitleController,
  getBookByIdWithPaginatedReviewsController,
  createBookController,
  updateBookController,
  deleteBookController,
} from "../controllers/book.controller";
import { zodValidator } from "../middlewares/zodValidator";
import { bookSchema } from "../validators/book.schema";

export const bookRoutes = Router();

bookRoutes.get("/", getAllPaginatedBooksByAuthorAndTitleController);
bookRoutes.get("/:bookId", getBookByIdWithPaginatedReviewsController);

bookRoutes.post("/", zodValidator(bookSchema), createBookController);

bookRoutes.put("/:bookId", zodValidator(bookSchema), updateBookController);

bookRoutes.delete("/:bookId", deleteBookController);