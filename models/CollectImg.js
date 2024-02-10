import mongoose, { Schema, model } from "mongoose";
//import Joi from "joi";
//import { handleSaveError, setUpdateSettings } from "./hooks.js";
const X_List =["1x" ,"2x"]
const extList =["webp","jpg"];
const ImgSchema = new Schema(
    {
        serialNumber: {
            type: Number,
            required: true 
        }, 
        device: {
            type: String,
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
  

const ImageModel = model('bgr_image', ImgSchema);

export default ImageModel;
