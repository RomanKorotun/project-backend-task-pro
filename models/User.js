import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";
import Joi from "joi";

const userNameRegexp =
  /^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegexp = /^[a-zA-Z0-9!@#$%^&*]{8,64}/;

const themeList = ["light", "dark", "violet"];

const userSchema = new Schema(
  {
    userName: {
      type: String,
      match: userNameRegexp,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },

    avatarURL: {
      avatarDark: String,
      avatarViolet: String,
      avatarLight: String,
      avatarCustom: String,
    },
    theme: {
      type: String,
      enum: themeList,
      default: "light",
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

// хук зміни статусу помилки при запису
userSchema.post("save", handleSaveError); //операція save у методі, яка викличе хук після невдалого збереження

// хук зміни налаштувань (оновлення та валідації) перед  оновленням документу
userSchema.pre("findOneAndUpdate", setUpdateSettings);

// хук зміни статусу помилки при оновленні
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

const userRegisterSchema = Joi.object({
  userName: Joi.string()
    .pattern(userNameRegexp)
    .message("Invalid user Name")
    .required(),
  email: Joi.string().pattern(emailRegexp).message("Invalid email").required(),
  password: Joi.string()
    .pattern(passwordRegexp)
    .message("Invalid password")
    .required(),
});

const userLogSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).message("Invalid email").required(),
  password: Joi.string()
    .pattern(passwordRegexp)
    .message("Invalid password")
    .required(),
});

const userUpdateSchema = Joi.object({
  userName: Joi.string().pattern(userNameRegexp).message("Invalid user Name"),
  email: Joi.string().pattern(emailRegexp).message("Invalid email"),
  password: Joi.string().pattern(passwordRegexp).message("Invalid password"),
});

export { User, userRegisterSchema, userLogSchema, userUpdateSchema };
