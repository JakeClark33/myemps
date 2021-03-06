import { mainPrompt } from "./prompts/mainPrompt.js";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import cTable from "console.table";

dotenv.config();

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

mainPrompt(connection);
