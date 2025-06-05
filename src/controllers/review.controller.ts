import {
  createReviewForBookService,
  updateReviewForBookService,
  deleteReviewForBookService,
} from "../services/review.service";
import { asyncHandler } from "../helpers/asyncHandler";

export const createReviewForBookController = asyncHandler(async (req, res) => {
  const { rating, title, content, readingStatus } = req.body;
  const { bookId, userId } = req.params;
  const review = await createReviewForBookService({
    bookId,
    userId,
    rating,
    title,
    content,
    readingStatus,
  });
  return res.status(200).json(review);
});

export const updateReviewForBookController = asyncHandler(async (
  req,
  res
) => {
  const { rating, title, content, readingStatus } = req.body;
  const { userId, reviewId } = req.query;
  const updatedReview = await updateReviewForBookService({
    reviewId,
    rating,
    title,
    userId,
    content,
    readingStatus,
  });
  res.status(200).json(updatedReview);
});

export const deleteReviewForBookController = asyncHandler(async (
  req,
  res
) => {
  const { bookId, reviewId } = req.params;
  await deleteReviewForBookService({
    bookId: Number(bookId),
    reviewId: Number(reviewId),
  });
  return res.json({ id: reviewId });
});
