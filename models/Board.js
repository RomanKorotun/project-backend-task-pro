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


  