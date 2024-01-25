import { Router } from "express";
import { botController } from "../controllers/index.js";

export const botRouter = Router();

botRouter.route("/").get(botController.readBot);

export default botRouter;

