import { Router } from "express";
import { uploadController } from "../controllers/index.js";
// import { upload } from "../middleware/multer.js";

export const uploadRouter = Router();

// uploadRouter.route("/").post(upload, uploadController.createUpload);
uploadRouter.route("/").post(uploadController.uploadAndResize);

export default uploadRouter;
