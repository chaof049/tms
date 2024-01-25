import { User } from "../schema/model.js";

let authorized = (roles) => {
  return async (req, res, next) => {
    try {
      let id = req.id;
      let result = await User.findById(id);
      let tokenRole = result.role;
      if (roles.includes(tokenRole)) {
        next();
      } else {
        res.status(403).json({
          success: false,
          message: "user not authorized",
        });
      }
    } catch (error) {
      res.status(403).json({
        success: false,
        message: "user not authorized",
      });
    }
  };
};

export default authorized;
