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
    background: {
      type: Number,
      default: 1,
    },
    
    background_decktop_jpeg_1x: {
      type: String,
    },
    background_decktop_jpeg_2x: {
      type: String,
      },
    background_mobile_jpeg_1x: {
      type: String,
      },
    background_mobile_jpeg_2x: {
      type: String,
    },
    background_tablet_jpeg_1x: {
      type: String,
    },
    background_tablet_jpeg_2x: {
      type: String,
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
  background: Joi.number(),
  background_decktop_jpeg_1x: Joi.string(),
  background_decktop_jpeg_2x: Joi.string(),
  background_mobile_jpeg_1x: Joi.string(),
  background_mobile_jpeg_2x: Joi.string(),
  background_tablet_jpeg_1x: Joi.string(),
  background_tablet_jpeg_2x: Joi.string(),
  isActive: Joi.boolean(),
});
export const dashboarUpdateSchema = Joi.object({
  title: Joi.string(),
  icnboard: Joi.string(),
  background_decktop_jpeg_1x: Joi.string(),
  background_decktop_jpeg_2x: Joi.string(),
  background_mobile_jpeg_1x: Joi.string(),
  background_mobile_jpeg_2x: Joi.string(),
  background_tablet_jpeg_1x: Joi.string(),
  background_tablet_jpeg_2x: Joi.string(),
});
export const dashboardUpdateActivSchema = Joi.object({
  isActive: Joi.boolean().required(),
});
export const dashboardUpdateBackgroundSchema = Joi.object({
  background: Joi.number().required(),
});
const BoardModel = model("board", dashboardSchema);

export default BoardModel;
