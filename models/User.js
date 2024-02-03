import { Schema, model } from "mongoose";
import { handleSaveError } from "./hooks.js";
import Joi from "joi";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  avatarURL: {
    type: String,
    requred: true,
  },
  //   verify: {
  //     type: Boolean,
  //     default: false,
  //   },
  theme: String,
  token: {
    type: String,
    //required: [true, "Verify token is required"],
  },
});

userSchema.post("save", handleSaveError); //операція save у методі, яка викличе хук після невдалого збереження

const User = model("user", userSchema);

const userRegisterSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).max(36).required(),
});

const userLogSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).max(36).required(),
});

export { User, userRegisterSchema, userLogSchema };
