import { Router } from "express";
import userRouter from "./userRouter.js";
import taskRouter from "./taskRouter.js";
import botRouter from "./botRouter.js";
import uploadRouter from "./uploadRouter.js";

const apiRouter = Router();

const ourRoutes = [
  {
    path: "/bots",
    router: botRouter,
  },
  {
    path: "/users",
    router: userRouter,
  },
  {
    path: "/tasks",
    router: taskRouter,
  },
  {
    path: "/test-uploads",
    router: uploadRouter,
  },
];

ourRoutes.forEach((route) => {
  apiRouter.use(route.path, route.router);
});

export default apiRouter;
