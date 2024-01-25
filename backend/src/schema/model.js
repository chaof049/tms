import { model } from "mongoose";
import taskSchema from "./schemas/taskSchema.js";
import userSchema from "./schemas/userSchema.js";

export const User = model("User", userSchema);
export const Task = model("Task", taskSchema);
