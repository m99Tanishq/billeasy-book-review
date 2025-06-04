import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./user.model";
import { relations } from "drizzle-orm";

export const client = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Client = typeof client.$inferSelect;
export type NewClient = typeof client.$inferInsert;
export type UpdateClient = Partial<Client> & { id: number };

export const clientRelations = relations(client, ({ many }) => ({
  users: many(user),
}));
