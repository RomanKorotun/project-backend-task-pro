import { Schema, model } from "mongoose";
import Joi from "joi";

const dashboardSchema = new Schema({
    tytle: {
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

 export  const dashboardAddSchema = Joi.object({
    tytle: Joi.string().required(),
    icons: Joi.string().required(),
    background: Joi.string().required(),
  });
export  const dashboarUpdateSchema = Joi.object({
    tytle: Joi.string(),
    icons: Joi.string(),
    background: Joi.string(),
  });  
  const BoardModel = model("board", dashboardSchema);

  export default BoardModel ;