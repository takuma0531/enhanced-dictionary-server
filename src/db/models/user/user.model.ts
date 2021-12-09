import { Schema, model } from "mongoose";
import { userPlugin } from "./user.plugin";
import { UserDocument, UserModel } from "../../../typings/models/user";

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    words: [
      {
        type: Schema.Types.ObjectId,
        ref: "Word",
      },
    ],
  },
  { timestamps: true }
);

userPlugin(userSchema);

export const User = model<UserDocument, UserModel>("User", userSchema);
