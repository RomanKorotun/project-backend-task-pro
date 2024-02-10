import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const dashboardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    icnboard: {
      type: String,
      required: true,
    },

    
    background_decktop_jpeg_1x: {
      type: String,
      required: true,
    },
    background_decktop_jpeg_2x: {
      type: String,
      required: true,
    },
    background_mobile_jpeg_1x: {
      type: String,
      required: true,
    },
    background_mobile_jpeg_2x: {
      type: String,
      required: true,
    },
    background_tablet_jpeg_1x: {
      type: String,
      required: true,
    },
    background_tablet_jpeg_2x: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// хук зміни статусу помилки при запису
dashboardSchema.post("save", handleSaveError);
// хук зміни налаштувань (оновлення та валідації) перед  оновленням документу
dashboardSchema.pre("findOneAndUpdate", setUpdateSettings);
// хук зміни статусу помилки при оновленні
dashboardSchema.post("findOneAndUpdate", handleSaveError);
//

export const dashboardAddSchema = Joi.object({
  title: Joi.string().required(),
  icnboard: Joi.string().required(),
  background: Joi.string().required(),
  isActive: Joi.boolean(),
});
export const dashboarUpdateSchema = Joi.object({
  title: Joi.string(),
  icnboard: Joi.string(),
  background: Joi.string(),
});
export const dashboardUpdateActivSchema = Joi.object({
  isActive: Joi.boolean().required(),
});
const BoardModel = model("board", dashboardSchema);

export default BoardModel;
