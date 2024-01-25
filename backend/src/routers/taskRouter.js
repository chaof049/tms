import { Router } from "express";
import { taskController } from "../controllers/index.js";

export const taskRouter = Router();

taskRouter
  .route("/")
  .post(taskController.createTask)
  .get(taskController.readAllTask);
taskRouter
  .route("/:id")
  .patch(taskController.updateTask)
  .get(taskController.readTaskById)
  .delete(taskController.deleteTask);

export default taskRouter;
