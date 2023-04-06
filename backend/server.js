import express from "express";
import connectDB from "./config/db.js";
import colors from "colors";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import chatRouter from "./routes/chatRouter.js";
import messageRouter from "./routes/messageRouter.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
dotenv.config();

connectDB();

const app = express();
app.use(express.json()); // to accept json data

// app.get("/", (req, res) => {
//   res.send("API Running!");
// });

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const { PORT = 5000 } = process.env;
app.listen(PORT, console.log(`App is listening on port ${PORT}`.yellow.bold));
