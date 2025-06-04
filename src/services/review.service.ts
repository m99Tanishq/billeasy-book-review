import { db } from "../config/database";
import { reviews } from "../models/index.model";
import { and, eq, or } from "drizzle-orm";

export const createReviewForBookService = async ({
  userId,
  bookId,
  rating,
  title,
  content,
  readingStatus,
}) => {
  const result = await db.insert(reviews).values({
    userId,
    bookId,
    rating,
    title,
    content,
    readingStatus,
  }).returning();
  return result[0];
}

export const updateReviewForBookService = async ({
  reviewId,
  rating,
  title,
  userId,
  content,
  readingStatus,
}) => {
  const result = await db
    .update(reviews)
    .set({
      rating,
      title,
      content,
      readingStatus,
      isEdited: true,
      editedAt: new Date(),
    })
    .where(and(eq(reviews.id, reviewId), eq(reviews.userId, userId)))
    .returning();
  return result[0];
};

export const deleteReviewForBookService = async ({
  bookId,
  reviewId,
}) => {
  const result = await db.delete(reviews).where(or(eq(reviews.id, reviewId), eq(reviews.bookId, bookId)));
  return result;
};
