import process from "process";
export const SERVER_PORT = process.env.SERVER_PORT || 10000;
export const DATABASE_URL = process.env.DATABASE_URL!;
export const JWT_SECRET = process.env.JWT_SECRET!;

