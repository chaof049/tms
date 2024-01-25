import jwt from "jsonwebtoken";
import { secretKey } from "../config/config.js";

export let isAuthenticated = (req, res, next) => {
  let bearerToken = req.headers.authorization;
  let token = bearerToken.split(" ")[1];
  try {
    let infoObj = jwt.verify(token, secretKey);
    let id = infoObj.id;
    req.id = id;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
