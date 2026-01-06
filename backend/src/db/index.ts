import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";

if (!ENV.DB_URL) {
    throw new Error("Database URL is not defined in environment variables");
}

const pool = new Pool({ connectionString: ENV.DB_URL });

pool.on("connect", () => {
    console.log("Connected to the PostgreSQL database");
})

pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
})

export const db = drizzle({ client: pool, schema })