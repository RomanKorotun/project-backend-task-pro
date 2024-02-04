import mongoose, { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

mongoose.Schema.Types.String.cast(false);

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

columnSchema.post("save", handleSaveError);
columnSchema.pre("findOneAndUpdate", setUpdateSettings);
columnSchema.post("findOneAndUpdate", handleSaveError);

export const columnJoiSchema = Joi.object({
  title: Joi.string().required(),
});

const Column = model("column", columnSchema);

export default Column;
