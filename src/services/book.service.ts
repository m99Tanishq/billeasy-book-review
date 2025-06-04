import { db } from "../config/database";
import { and, asc, desc, eq } from "drizzle-orm";
import { books, reviews } from "../models/index.model";

export const getAllBooksByAuthorAndTitleService = async ({
  author,
  title,
  limit,
  page,
}: {
  author?: string;
  title?: string;
  limit: number;
  page: number;
}) => {
const result = await db.query.books.findMany({
  where: and(
    eq(books.author, author ?? ""),
    eq(books.title, title ?? ""),
  ),
  limit: limit,
  offset: (page - 1) * limit,
  orderBy: [asc(books.bookId)],
});
  return result;
};


export const getBookByIdWithPaginatedReviewsService = async ({
  bookId,
  limit,
  page,
}: {
  bookId: number;
  limit: number;
  page: number;
}) => {

const result = await db.select({
        book: books,
        review: reviews,
    })
    .from(books).innerJoin(reviews, eq(books.bookId, reviews.bookId))
    .where(eq(books.bookId, bookId))
    .orderBy(desc(reviews.createdAt))
    .limit(limit)
    .offset((page - 1) * limit);
    return result;
};


export const createBookService = async ({
  author,
  title,
  description,
  genre,
  publicationDate,
  publisher,
}) => {
    const result = await db.insert(books).values({
        author,
        title,
        description,
        genre,
        publicationDate,
        publisher
    }).returning();
    return result[0];
}

export const updateBookService = async ({
  bookId,
  title,
  description,
  genre,
  publicationDate,
  publisher,
}) => { 
  const result = await db.update(books).set({
    title,
    description,
    genre,
    publicationDate,
    publisher,
    updatedAt: new Date(),
  }).where(eq(books.bookId, bookId)).returning();
  return result[0];
}

export const deleteBookService = async ({
  bookId,
}) => {
  const result = await db.transaction(async (tx) => {  
    await tx.delete(reviews).where(eq(reviews.bookId, bookId));
    const result = await tx.delete(books).where(eq(books.bookId, bookId));
    return result;
  });
  return result;
}
