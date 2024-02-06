import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "../models/hooks.js";
import Joi from "joi";

const priorityList = ["low", "medium", "high", "without"];

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Input card title"],
    },
    description: {
      type: String,
      required: [true, "Input card description"],
    },
    priority: {
      type: String,
      enum: priorityList,
      default: "without",
    },
    deadline: {
      type: String,
      default: "No deadline",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "column",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

cardSchema.post("save", handleSaveError);
cardSchema.pre("findOneAndUpdate", setUpdateSettings);
cardSchema.post("findOneAndUpdate", handleSaveError);

export const cardAddSchema = Joi.object({
  title: Joi.string()
    .required()
    .min(3)
    .messages({ "any.required": "missing required 'title' field" }),
  description: Joi.string()
    .required()
    .min(6)
    .messages({ "any.required": "missing required 'description' field" }),
  priority: Joi.string().valid(...priorityList),
  deadline: Joi.string(),
});

export const cardUpdateSchema = Joi.object({
  title: Joi.string().min(3),
  description: Joi.string().min(6),
  priority: Joi.string().valid(...priorityList),
  deadline: Joi.string(),
});

export const switchColumnSchema = Joi.object({
  owner: Joi.string().required(),
});

const Card = model("card", cardSchema);

export default Card;
