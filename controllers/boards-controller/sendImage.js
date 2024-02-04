import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
//import "dotenv/config";
import dotenv from "dotenv";
import path from "path";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";
//import os from "os"
dotenv.config();
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
const pathListImg = path.join(path.resolve("images"), "imagesList.json");
const imageArray = [];
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  use_filename: true,
  unique_filename: true,
});
const deleteFile = async (pathFile) => {
  await fs.unlink(pathFile);
};

const writeImageToFile = async (pathFile) => {
 imageArray.sort((firstImage,secondImage)=>firstImage.id-secondImage.id);
  console.log('imageArray', imageArray)
  const jsonData = JSON.stringify(imageArray, null, 2);
  await fs.appendFile(pathFile, jsonData);
};

const sendCloudinary = async (file, id) => {
  const { path: pathImgSourse, filename } = file;
  //
  const fileName = path.parse(filename);

  const folder = "BgDashboard";

  const cloudinaryResult = await cloudinary.uploader.upload(pathImgSourse, {
    public_id: fileName.name,
    asset_folder: folder,
    width: 700,
  });
  const img = {
    id,
    url: cloudinaryResult.url,
    src: cloudinaryResult.original_filename,
  };
  imageArray.push(img);
  //console.log('imageArrau.length', imageArray.length)
  //

  deleteFile(pathImgSourse);
};

// const sendPhoto1 = async (req, res) => {
//   req.files.map((file, index) => {
//     sendCloudinary(file, index + 1);
//   });
//   writeImageToFile(pathListImg);
//   res.json({ message: "file upload" });
// };

const sendPhoto1 = async (req, res) => {
  await Promise.all(req.files.map(async (file, index) => {
    await sendCloudinary(file, index + 1);
  }));
  await writeImageToFile(pathListImg);
  res.json({ message: "file upload" });
};

const sendPhoto = ctrlWrapper(sendPhoto1);
export default sendPhoto;

