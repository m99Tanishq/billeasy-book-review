import {
  pgTable,
  varchar,
  text,
  timestamp,
  pgEnum,
  index,
  uuid,
  serial,
} from "drizzle-orm/pg-core";
import { reviews } from "./review.model";
import { relations } from "drizzle-orm";

export const genreEnum = pgEnum("genre", [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Technology",
] as const);

export type BookGenre = (typeof genreEnum.enumValues)[number];

export const books = pgTable(
  "books",
  {
    id: uuid("id").unique().defaultRandom(),
    bookId: serial("book_id").primaryKey(),
    title: varchar("title", { length: 200 }).notNull(),
    author: varchar("author", { length: 100 }).notNull(),
    description: text("description").notNull(),
    genre: genreEnum("genre").notNull(),
    publisher: varchar("publisher", { length: 100 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    titleIdx: index("title_idx").on(table.title),
    authorIdx: index("author_idx").on(table.author),
    genreIdx: index("genre_idx").on(table.genre),
  })
);

export const bookRelations = relations(books, ({ many }) => ({
  reviews: many(reviews),
}));

export type Book = typeof books.$inferSelect;
export type NewBook = typeof books.$inferInsert;
