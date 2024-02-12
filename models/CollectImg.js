import mongoose, { Schema, model } from "mongoose";
import Joi from "joi";
//import { handleSaveError, setUpdateSettings } from "./hooks.js";
const X_List =["1x" ,"2x"]
const extList =["webp","jpg"];
const deviceList =["desktop","tablet","mobile"];
const ImgSchema = new Schema(
    {
        serialNumber: {
            type: Number,
            required: true 
        }, 
        device: {
            type: String,
            enum:deviceList,
            required: true 
        },
        X:{//поле для обозначення щильності зображення
            type: String,
            enum:X_List,
            default: "1x" 
        }, 
        imgUrl: {
            type: String,
            required: true 
        },
        extention:{
            type: String,
            enum:extList,
            required: true 
        }, 
        alt: String, //поле для альтернативного тексту
    },
    { versionKey: false }
  );
 export const helpMailSchema = Joi.object({
    widthImage: Joi.number().required(), 
});
const ImageModel = model('bgr_image', ImgSchema);

export default ImageModel;
