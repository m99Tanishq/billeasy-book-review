import { db } from "../config/database";
import { asc, eq } from "drizzle-orm";
import { user, PartialUserUpdate } from "../models/user.model";

export const findUserByEmailService = async (
  email: string,
  includePassword: boolean = true
) => {
  const selectedUser = await db.query.user.findFirst({
    where: eq(user.email, email),
    ...(includePassword && {
      columns: {
        password: true,
      },
    }),
  });
  return selectedUser;
};

export const getAllUsersService = async ({
  clientId,
  limit,
  page,
}: {
  clientId: number;
  limit: number;
  page: number;
}) => {
  const users = await db.query.user.findMany({
    where: eq(user.clientId, clientId),
    limit: limit,
    offset: (page - 1) * limit,
    orderBy: [asc(user.id)],
  });
  return users;
};

export const createUserService = async ({email, hashedPassword, name, clientId}: {email: string, hashedPassword: string, name: string, clientId: number}) => {
  const newUser = await db.insert(user).values({email, password: hashedPassword, name, clientId}).returning();
  return newUser[0];
};

export const updateUserService = async (
  userId: number,
  userData: PartialUserUpdate
) => {
  const updatedUser = await db
    .update(user)
    .set(userData)
    .where(eq(user.userId, userId))
    .returning();
  return updatedUser[0];
};

export const deleteUserService = async (userId: number) => {
  const deletedUser = await db
    .delete(user)
    .where(eq(user.userId, userId))
    .returning();
  return deletedUser[0];
};


