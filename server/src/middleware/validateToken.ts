import jwt from "jsonwebtoken";

export const verifyToken = (token: string) => {
    if (!process.env.JWT_KEY) return "JWT_KEY not present";
    try {
        const payload = jwt.verify(token, process.env.JWT_KEY);
        return true;
    }catch (err){
        return false;
    }
}