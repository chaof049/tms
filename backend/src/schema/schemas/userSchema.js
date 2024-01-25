import { Schema } from "mongoose";
import { roleEnum } from "../../constant/constant.js";

const userSchema = Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    role: {
      type: String,
      enum: {
        values: roleEnum,
        message: (enumValue) => {
          return `${enumValue.value} is not valid enum`;
        },
      },
      // enum: ["superadmin", "admin", "user"],
    },
  },
  {
    timestamps: true,
  }
);

export default userSchema;
