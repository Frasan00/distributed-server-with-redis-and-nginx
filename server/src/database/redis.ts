import { createClient } from "redis";

const host = process.env.REDIS_HOST || "";
const port = process.env.REDIS_PORT || "";
const password = process.env.REDIS_PASSWORD || "";

if (host === "" || port === "" || password === "") throw new Error("Some redis env variables are missing! ");

const config = createClient({
    socket: {
        host: host,
        port: parseInt(port)
    },
    password: password
});

config.on('error', (err: any) => {
    console.log('Error ' + err);
});

export const client = config;