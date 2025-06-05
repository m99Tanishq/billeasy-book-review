import { db } from "../config/database";
import { client } from "../models/index.model";

export const createClientService = async ({name} : {name: string}) => {
  const newClient = await db.insert(client).values({
    name,
  });
  return newClient;
};