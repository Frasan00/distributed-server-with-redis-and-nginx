import { client } from "./database/redis";
import { pool } from "./database/pool";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
    token VARCHAR(255) NOT NULL DEFAULT ""
);`)
.then(() => console.log("Schema and table created correctly"))
.catch((err) => console.log("Couldn't initiate schema and table")); 


export const register = async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    const user = await checkUser(userName);
    if(user) return res.status(400).send("User already registed");
    const hashedPassword = await bcrypt.hash(password, 10);
    const saveUser = await pool.query('INSERT INTO my_schema.users (userName, password) VALUES ($1, $2)', [userName, hashedPassword]);  
    console.log(`New user registed: ${userName}`); 
    return res.status(200).send("User registed correctly");
}

export const login = async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    const user = await checkUser(userName);
    if(!user) return res.status(404).send("User not found");
    if(user[2] !== "") return res.status(400).send("User already logged in");

    const comparePasswords = await bcrypt.compare(password, user[1]);
    if(comparePasswords === false) return res.status(400).send("Passwords missmatch");
    if(!process.env.JWT_KEY) return res.status(400).send("No JWT_KEY provided");
    const token = jwt.sign({userName: user[0], password: user[1]}, process.env.JWT_KEY);
    // postgres
    const sessionStart = await pool.query('UPDATE my_schema.users SET token=$1 WHERE userName=$2', [token, userName]);
    // redis
    const redisSet = await client.set(userName, token);
    console.log("token set in redis for "+userName+" "+await client.get(userName));
    console.log(`New user logged: ${userName}`); 
    return res.status(200).send("User logged correctly");
}

export const logout = async (req: Request, res: Response) => {
    const userName = req.body.userName;
    const user = await checkUser(userName);
    if(!user) return res.status(404).send("User not found");
    await pool.query('UPDATE my_schema.users SET token=$1 WHERE userName=$2', ["", userName]);
    console.log(`User Logged out: ${userName}`); 
    return res.status(200).send("User logged out correctly");
}

export const selectAll = async (req: Request, res: Response) => {
    const search = await pool.query(`SELECT * FROM my_schema.users`);
    if (search.rowCount === 0) return res.status(404).send("No users were found");
    return res.status(200).json(JSON.stringify(search.rows));
}