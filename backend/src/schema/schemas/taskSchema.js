import { Schema, Types } from "mongoose";
import { statusEnum } from "../../constant/constant.js";

const taskSchema = Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    deadline: {
      type: Date,
    },
    status: {
      type: String,
      enum: {
        values: statusEnum,
        message: (enumValue) => {
          return `${enumValue.value} is not valid enum`;
        },
      },
      default: "pending",
    },
    assignees: {
      type: Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default taskSchema;
