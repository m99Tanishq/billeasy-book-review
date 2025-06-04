import {
  pgTable,
  timestamp,
  varchar,
  integer,
  serial,
  uuid,
} from "drizzle-orm/pg-core";
import { client } from "./client.model";
import { relations } from "drizzle-orm";

export const user = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: serial("user_id").notNull(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  password: varchar("password").notNull(),
  clientId: integer("client_id")
    .references(() => client.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userRelations = relations(user, ({ one }) => ({
  client: one(client, {
    fields: [user.clientId],
    references: [client.id],
  }),
}));

export type User = typeof user.$inferSelect;
export type UserInsert = typeof user.$inferInsert;
export type UserUpdate = typeof user.$inferSelect;
export type PartialUserUpdate = Partial<UserUpdate>;
