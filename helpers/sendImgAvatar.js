//import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
//import dotenv from "dotenv";
import path from "path";
import cloudinary from "./cloudinary.js";

//dotenv.config();



//видаляэмо файл з тимчасової папки
const deleteFile = async (pathFile) => {
  await fs.unlink(pathFile);
};


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//записуємо файл, отриманий з масиву обєктів на cloudinary і видаляємо тимчасовий файл
const sendCloudinaryAvatars = async (file, imageArray) => {
  const { path: pathImgSourse, filename } = file;
  const fileName = path.parse(filename);
  
  //папка для запису image на cloudinary
  const folder = `TaskPro_Avatars`;

    const cloudinaryResult = await cloudinary.uploader.upload(pathImgSourse, {
    public_id: fileName.name,
    folder: folder,
    width: 68,
  });
  const img = {
    nameAvatar:cloudinaryResult.original_filename,
    avatarUrl: cloudinaryResult.url,
  };
  imageArray.push(img);
    //видаляємо файл на temp
  deleteFile(pathImgSourse);
  //return img;

};

export default sendCloudinaryAvatars;
