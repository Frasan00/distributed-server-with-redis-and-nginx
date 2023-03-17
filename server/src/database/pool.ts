import { Pool } from "pg";

const user = process.env.USER || "";
const host = process.env.HOST || "";
const database = process.env.DATABASE || "";
const password = process.env.PASSWORD || "";

const config = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: 5432,
})

export const pool = config;