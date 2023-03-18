import { pool } from "../database/pool";

// checks if the userName is already registed
export const checkUser = async (userName: string) => {
    const search = await pool.query("SELECT userName FROM my_schema.users WHERE userName=$1", [userName]);
    if (search.rowCount === 0) return true;
    return false;
}