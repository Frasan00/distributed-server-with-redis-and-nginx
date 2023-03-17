import { client } from "./database/redis";
import { pool } from "./database/pool";
import { verifyToken } from "./middleware/validateToken";
import { Response, Request } from "express";

// redis connection
client.connect()
.then(() => console.log("Connected to Redis"))
.catch((err) => console.error(err));

// postgres connection
pool.connect()
.then(() => console.log("Connected to Postgres"))
.catch((err) => console.error(err));
// to do: create a schema and a table users

export const register = async (req: Request, res: Response) => {
    const { userName, password } = req.body;

}

export const login = async (req: Request, res: Response) => {
    res.send("Ciao");
}

export const logout = async (req: Request, res: Response) => {
    res.send("Ciao");
}