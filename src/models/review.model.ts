import {
  pgTable,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  index,
  pgEnum,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { books } from "./book.model";
import { user } from "./user.model"; // Changed from 'user' to 'users'
import { relations } from "drizzle-orm";

export const readingStatusEnum = pgEnum("reading_status", [
  "read",
  "currently-reading",
  "want-to-read",
] as const);

export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: integer("user_id")
      .references(() => user.userId)
      .notNull(),
    bookId: integer("book_id")
      .references(() => books.bookId)
      .notNull(),
    rating: integer("rating").notNull(),
    title: varchar("title", { length: 100 }).notNull(),
    content: text("content").notNull(),
    isEdited: boolean("is_edited").notNull().default(false),
    editedAt: timestamp("edited_at"),
    readingStatus: readingStatusEnum("reading_status")
      .notNull()
      .default("read"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    userBookUnique: uniqueIndex("user_book_unique_idx").on(
      table.userId,
      table.bookId
    ),
    bookIdx: index("book_idx").on(table.bookId),
    userIdx: index("user_idx").on(table.userId),
    ratingIdx: index("rating_idx").on(table.rating),
  })
);

export const reviewRelations = relations(reviews, ({ one }) => ({
  user: one(user, {
    fields: [reviews.userId],
    references: [user.userId],
  }),
  book: one(books, {
    fields: [reviews.bookId],
    references: [books.bookId],
  }),
}));

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
export type UpdateReview = Partial<Review>;
