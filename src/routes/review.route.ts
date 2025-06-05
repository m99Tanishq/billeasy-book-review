import { Router } from "express";
import { createReviewForBookController, updateReviewForBookController, deleteReviewForBookController } from "../controllers/review.controller";
import { zodValidator } from "../middlewares/zodValidator";
import { reviewSchema } from "../validators/review.schema";

export const reviewRoutes = Router();

reviewRoutes.post("/users/:userId/books/:bookId", zodValidator(reviewSchema), createReviewForBookController);

reviewRoutes.put("/users/:userId/books/:bookId/:reviewId", zodValidator(reviewSchema), updateReviewForBookController);

reviewRoutes.delete("/users/:userId/books/:bookId/:reviewId", deleteReviewForBookController);