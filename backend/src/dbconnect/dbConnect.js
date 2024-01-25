import mongoose from "mongoose";
import { dbUrl } from "../config/config.js";

let connectToMongoDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectToMongoDB;
