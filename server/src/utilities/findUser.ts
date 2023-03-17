import { pool } from "../database/pool";

// checks if the userName is already registed
export const checkUser = (userName: string) => {
    const instruction = "SELECT userName FROM users WHERE userName="+userName;
    
}