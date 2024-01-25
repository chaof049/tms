import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../schema/model.js";
import { sendMail } from "../utils/sendmail.js";
import { secretKey } from "../config/config.js";

export let createUser = async (req, res) => {
  let data = req.body;
  try {
    let password = data.password;
    let hashPassword = await bcrypt.hash(password, 10);
    data = {
      ...data,
      password: hashPassword,
    };

    let result = await User(data);

    let infoObj = {
      data: result,
    };
    let expiryInfo = {
      expiresIn: "365d",
    };

    let token = await jwt.sign(infoObj, secretKey, expiryInfo);

    await sendMail({
      from: `"noreply"<noreply>`,
      to: [data.email],
      subject: "Verify Your Email",

      html: `<h1>Click the link below to verify your email</h1>
        <a href = "http://localhost:3000/verify-email?token=${token}">
        http://localhost:3000/verify-email?token=${token}
        </a>
  
        `,
    });
    res.status(201).json({
      success: true,
      message: "email sent successfully. click the link to verify your email.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export let loginUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      let isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        let infoObject = {
          id: user._id,
        };
        let expiryInfo = {
          expiresIn: "365d",
        };
        let token = jwt.sign(infoObject, secretKey, expiryInfo);
        res.status(200).json({
          success: true,
          message: "user login successful",
          data: user,
          token: token,
        });
      } else {
        throw new Error("email or password does not match");
      }
    } else {
      throw new Error("email or password does not match");
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "email or password doesn't match",
    });
  }
};

export let verifyEmail = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let infoObj = jwt.verify(token, secretKey);
    let data = infoObj.data;
    // console.log(data)
    let result = await User.create(data);
    res.status(201).json({
      success: true,
      message: "email verified successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export let updatePassword = async (req, res, next) => {
  try {
    let id = req.id;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    let data = await User.findById(id);
    let hashPassword = data.password;
    let isValidPassword = await bcrypt.compare(oldPassword, hashPassword);

    if (isValidPassword) {
      if (oldPassword.toLowerCase() !== newPassword.toLowerCase()) {
        let newHashPassword = await bcrypt.hash(newPassword, 10);
        let result = await User.findByIdAndUpdate(
          id,
          { password: newHashPassword },
          {
            new: true,
          }
        );
        res.json({
          success: true,
          message: "update password successfully",
          data: result,
        });
      } else {
        let error = new Error("newPassword and old password cannot be same");
        throw error;
      }
    } else {
      let error = new Error("Old Password does not match");
      throw error;
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  // try {
  //   let id = req.id;
  //   let oldPassword = req.body.oldPassword;
  //   let newPassword = req.body.newPassword;

  //   let data = await User.findById(id);
  //   let hashPassword = data.password;

  //   let isValidPassword = await bcrypt.compare(oldPassword, hashPassword);
  //   if (isValidPassword) {
  //     let newHashPassword = await bcrypt.hash(newPassword, 10);

  //     let result = await User.findByIdAndUpdate(
  //       id,
  //       { password: newHashPassword },
  //       { new: true }
  //     );
  //     res.status(201).json({
  //       success: true,
  //       message: "new password updated successfully",
  //       result: result,
  //     });
  //   } else {
  //     throw new Error("credentials does not match");
  //   }
  // } catch (error) {
  //   res.status(400).json({
  //     success: false,
  //     message: error.message,
  //   });
  // }
};

export let forgotPassword = async (req, res, next) => {
  try {
    let email = req.body.email;
    let result = await User.findOne({ email: email });
    if (result) {
      let infoObject = {
        id: result._id,
      };
      let expiryInfo = {
        expiresIn: "5d",
      };
      let token = jwt.sign(infoObject, secretKey, expiryInfo);
      await sendMail({
        from: `"noreply"<noreply>`,
        to: email,
        subject: "Reset Password",
        html: `
      <h1>Click the given link to reset your password</h1>
      <a href="http://localhost:8000/reset-password?token=${token}">
      http://localhost:8000/reset-password?token=${token}
      </a>
      `,
      });
      res.status(200).json({
        success: true,
        message: "link has been sent to email to reset the password",
        result: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "email not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export let resetPassword = async (req, res, next) => {
  try {
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    let result = await User.findByIdAndUpdate(
      req.id,
      { password: hashPassword },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const readAllUser = async (req, res, next) => {
  try {
    let result = await User.find({});
    res.status(200).json({
      success: true,
      message: "all users read successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const readSpecificUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "users read successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSpecificUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = req.body;
    delete data.email;
    delete data.password;
    let result = await User.findByIdAndUpdate(id, data, { new: true });
    res.status(201).json({
      success: true,
      message: "specific user updated successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSpecificUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "specific user deleted successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export let readMyProfile = async (req, res, next) => {
  let id = req.id;
  try {
    let result = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "myProfile read successful",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export let updateMyProfile = async (req, res, next) => {
  let id = req.id;
  let data = req.body;
  delete data.email;
  delete data.password;
  try {
    let result = await User.findByIdAndUpdate(id, data, { new: true });
    res.status(201).json({
      success: true,
      message: "myProfile update successful",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export let deleteMyProfile = async (req, res, next) => {
  let id = req.id;
  try {
    let result = await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "myProfile delete successful",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
