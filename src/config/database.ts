import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../models/index.model";
import { DATABASE_URL } from "./constants";

export const dbConnectionPool = new pg.Pool({ connectionString: DATABASE_URL });
export const db = drizzle(dbConnectionPool, { schema });
