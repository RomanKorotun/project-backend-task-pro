import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const dashboardSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    icons: {
      type: String,
      required: [true],
    },
    background: {
      type: String,
      required: [true],
    
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
  });

  // хук зміни статусу помилки при запису
  dashboardSchema.post("save", handleSaveError);
  // хук зміни налаштувань (оновлення та валідації) перед  оновленням документу
  dashboardSchema.pre("findOneAndUpdate", setUpdateSettings);
  // хук зміни статусу помилки при оновленні
  dashboardSchema.post("findOneAndUpdate", handleSaveError);
  //

 export  const dashboardAddSchema = Joi.object({
    title: Joi.string().required(),
    icons: Joi.string().required(),
    background: Joi.string().required(),
  });
export  const dashboarUpdateSchema = Joi.object({
    title: Joi.string(),
    icons: Joi.string(),
    background: Joi.string(),
  });  
  const BoardModel = model("board", dashboardSchema);

  export default BoardModel ;