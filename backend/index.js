import express, { json } from "express";
import http from "http";
import cors from "cors";
import connectToMongoDB from "./src/dbconnect/dbConnect.js";
import { port } from "./src/config/config.js";
import apiRouter from "./src/routers/index.js";
import { setupSocketIO } from "./src/middleware/socket.js";

let expressApp = express();

expressApp.use(json());
expressApp.use(cors());
expressApp.use(express.static("./public"));

expressApp.use(apiRouter);
setupSocketIO(http.createServer(expressApp));

connectToMongoDB();

expressApp.listen(port, () => {
  console.log(`express app is listening at port ${port}`);
});
