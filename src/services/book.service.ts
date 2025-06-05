import { db } from "../config/database";
import { and, asc, desc, eq } from "drizzle-orm";
import { books, reviews } from "../models/index.model";
import { BookGenre } from "../models/book.model";

export const getAllBooksByAuthorAndTitleService = async ({
  author,
  genre,
  limit,
  page,
}: {
  author?: string;
  genre?: BookGenre;
  limit: number;
  page: number;
}) => {
  const offset = (page - 1) * limit;
  const baseQuery = {
    limit,
    offset,
    orderBy: [asc(books.bookId)],
  };

  if (!author && !genre) {
    return db.query.books.findMany(baseQuery);
  }

  return db.query.books.findMany({
    ...baseQuery,
    where: and(
        author ? eq(books.author, author) : undefined,
        genre ? eq(books.genre, genre) : undefined
    ),
  });
};


export const getBookByIdWithPaginatedReviewsService = async ({
  bookId,
  limit = 10,
  page = 1,
}: {
  bookId: number;
  limit: number;
  page: number;
}) => {
  return await db.query.books.findFirst({
    where: eq(books.bookId, bookId),
    with: {
      reviews: {
        limit: Math.min(limit, 100),
        orderBy: [desc(reviews.createdAt)],
        offset: (page - 1) * limit,
      } as any,
    },
  });
};



export const createBookService = async ({
  author,
  title,
  description,
  genre,
  publisher,
}) => {
    const result = await db.insert(books).values({
        author,
        title,
        description,
        genre,
        publisher
    }).returning();
    return result[0];
}

export const updateBookService = async ({
  bookId,
  title,
  description,
  genre,
  publisher,
}) => { 
  const result = await db.update(books).set({
    title,
    description,
    genre,
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
