import "dotenv/config";
import Debug from "debug";
import express from "express";
import cors from "cors";
import dayjs from "dayjs";
import { PORT } from "./utils/env.js";
import { createServer } from "node:http";
import { Server } from "socket.io";

const debug = Debug("myapp");
const app = express();
app.use(cors({ origin: false }));
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  setInterval(function () {
    // const dtStr = dayjs().format("DD/MM/YYYY HH:mm:ss");
    const dtStr = dayjs().format("HH:mm:ss");
    io.sockets.emit("clock", { clock: dtStr });
  }, 1000);
});

// * Endpoints
app.get("/", async (req, res, next) => {
  res.send("hello");
});

// * Running app
server.listen(PORT, async () => {
  debug(`Listening on port ${PORT}: http://localhost:${PORT}`);
});
