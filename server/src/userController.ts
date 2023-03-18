import { client } from "./database/redis";
import { pool } from "./database/pool";
import bcrypt from "bcrypt";
import { verifyToken } from "./middleware/validateToken";
import { Response, Request } from "express";
import { checkUser } from "./utilities/findUser";

// redis connection
client.connect()
.then(() => console.log("Connected to Redis"))
.catch((err) => console.error(err));

// postgres connection
pool.connect()
.then(() => console.log("Connected to Postgres"))
.catch((err) => console.error(err));

// postgres schema and user table
pool.query(`
  CREATE SCHEMA IF NOT EXISTS my_schema;

  CREATE TABLE IF NOT EXISTS my_schema.users (
    userName VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255)
);`)
.then(() => console.log("Schema and table created correctly"))
.catch((err) => console.log("Couldn't initiate schema and table")); 


export const register = async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    if(await checkUser(userName) === false) return res.status(400).send("User already registed");
    const hashedPassword = await bcrypt.hash(password, 10);
    const saveUser = await pool.query('INSERT INTO my_schema.users (userName, password) VALUES ($1, $2)', [userName, hashedPassword]);  
    console.log(`New user registed: ${userName}`); 
    return res.status(200).send("User registed correctly");
}

export const login = async (req: Request, res: Response) => {
    res.send("Ciao");
}

export const logout = async (req: Request, res: Response) => {
    res.send("Ciao");
}

export const selectAll = async (req: Request, res: Response) => {
    const search = await pool.query(`SELECT * FROM my_schema.users`);
    if (search.rowCount === 0) return res.status(404).send("No users were found");
    return res.status(200).json(JSON.stringify(search.rows));
}