import express from "express";
import dotenv from "dotenv";
import userRouter from "./userRoute";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/user", userRouter);

app.get("/", (req, res) => {
    res.send("Nodejs api is working!");
});

app.listen(PORT, () => console.log("Listening on port "+PORT));