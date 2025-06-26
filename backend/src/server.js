import express from "express";
import "dotenv/config";
import authRouter from "../routes/auth.route.js";
import userRouter from "../routes/user.route.js";
import chatRouter from "../routes/chat.route.js";
import { connectDB } from "../lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT;

const _dirname = path.resolve();
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

if( process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(_dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "../frontend/dist/index.html"));
  })
}

app.listen(PORT, () => {
  console.log(`Server : http://localhost:${PORT}`);
  connectDB();
});
