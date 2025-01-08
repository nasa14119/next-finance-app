import { Database } from "bun:sqlite";
console.log("conected to db");
export const db = new Database("backend/db/sqlite.db");
