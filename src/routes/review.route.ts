import { Router } from "express";
import { createReviewForBookController, updateReviewForBookController, deleteReviewForBookController } from "../controllers/review.controller";
import { zodValidator } from "../middlewares/zodValidator";
import { reviewSchema } from "../validators/review.schema";

export const reviewRoutes = Router();

reviewRoutes.post("/reviews", zodValidator(reviewSchema), createReviewForBookController);

reviewRoutes.put("/reviews/:reviewId", zodValidator(reviewSchema), updateReviewForBookController);

reviewRoutes.delete("/reviews/:bookId/:reviewId", deleteReviewForBookController);