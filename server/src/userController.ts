import { client } from "./redis";
import { keycloak } from "./keycloakConf";
import { Response, Request } from "express";

export const register = async (req: Request, res: Response) => {
    res.send("Ciao");
}

export const login = async (req: Request, res: Response) => {
    res.send("Ciao");
}

export const logout = async (req: Request, res: Response) => {
    res.send("Ciao");
}