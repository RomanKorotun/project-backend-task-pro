import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, setUpdateSettings } from "../models/hooks.js";

const labelList = ["low", "medium", "high", "without"];

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
      enum: labelList,
      default: "without",
    },
    deadline: {
      type: String,
      default: "No deadline",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "column",
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
    .min(6)
    .messages({ "any.required": "missing required 'title' field" }),
  description: Joi.string()
    .required()
    .min(10)
    .messages({ "any.required": "missing required 'description' field" }),
});

export const cardUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string().valid(...labelList),
  deadline: Joi.string(),
});

const Card = model("card", cardSchema);

export default Card;
