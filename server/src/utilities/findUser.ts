import { pool } from "../database/pool";

// checks if the userName is already registed
export const checkUser = async (userName: string) => {
    const search = await pool.query("SELECT userName, password, token FROM my_schema.users WHERE userName=$1", [userName]);
    if (search.rowCount === 0) return;
    return [search.rows[0].userName, search.rows[0].password, search.rows[0].token]
}