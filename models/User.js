import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";
import Joi from "joi";

const userNameRegexp = /^[A-Za-z\d@$!%*?&]{2,32}$/;
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegexp =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;

const themeList = ["light", "dark", "violet"];

const userSchema = new Schema(
  {
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
      //required: [true, "Verify token is required"],
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
    .message("Invalid userName")
    .required(),
  email: Joi.string()
    .pattern(emailRegexp)
    .message("Invalid email. Example: user@mail.com")
    .required(),
  password: Joi.string()
    .pattern(passwordRegexp)
    .message("Invalid password.Example: aW12@$!%*?&")
    .required(),
});

const userLogSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .message("Invalid email. Example: user@mail.com")
    .required(),
  password: Joi.string()
    .pattern(passwordRegexp)
    .message("Invalid password.Example: aW12@$!%*?&")
    .required(),
});

const userUpdateSchema = Joi.object({
  userName: Joi.string()
    .pattern(userNameRegexp)
    .message("Invalid userName")
    .required(),
  email: Joi.string()
    .pattern(emailRegexp)
    .message("Invalid email. Example: user@mail.com")
    .required(),
  password: Joi.string()
    .pattern(passwordRegexp)
    .message("Invalid password.Example: aW12@$!%*?&")
    .required(),
});

export { User, userRegisterSchema, userLogSchema, userUpdateSchema };
