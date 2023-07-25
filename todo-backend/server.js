import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';

import connectToDB from "./src/config/db.config.js";
import todoRouter from "./src/routes/todo.routes.js";

// .env variables
dotenv.config();
const PORT = process.env.PORT;

// Connect to DB
connectToDB();

// express App
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(`/todos`, todoRouter);

// Run server
const server = app.listen(PORT, () => {
  console.log(`🌐 Server is running at http://localhost:${PORT}/todos 🌐`);
});

// Graceful Shutdown
const exitHandler = (options, exitCode) => {
  if (options.shutdownSERVER) {
    console.log("\n🙌Shutting down... SERVER🙌");
    server.close(() => {
      console.log("Process terminated! 💀", exitCode);
      process.exit(0);
    });
  }
};

process.on("SIGINT", exitHandler);
