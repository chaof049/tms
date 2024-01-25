import { config } from "dotenv";

config();
export const port = process.env.PORT;
export const dbUrl = process.env.DB_URL;
export const email = process.env.EMAIL;
export const password = process.env.PASSWORD;
export const secretKey = process.env.SECRET_KEY;
export const fireBaseUser = process.env.FIREBASE_USER;
export const fireBaseAuth = process.env.FIREBASE_AUTH;
