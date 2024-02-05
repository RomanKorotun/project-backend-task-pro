import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import dotenv from "dotenv";
import path from "path";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

dotenv.config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;



cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  use_filename: true,
  unique_filename: true,
});
//видаляэмо файл з тимчасової папки
const deleteFile = async (pathFile) => {
  await fs.unlink(pathFile);
};
//Назва файлу JSON буде формуватись в залежності від виду пристрою і розширення файлу:
// Для десктопу desktop_webp desktop_jpeg
// Для таблетки tablet_webp ....
const getPathFileJSON = (typeDev, extFile) => {
  return path.join(path.resolve("images"), `${typeDev}_${extFile}.json`);
};
//const pathListImg =
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//записуємо обєкт картинки в файл Json
const writeImageToFile = async (pathFile,imageArray) => {
  imageArray.sort(
    (firstImage, secondImage) => firstImage.serialNumb - secondImage.serialNumb
  );
  const jsonData = JSON.stringify(imageArray, null, 2);
  await fs.writeFile(pathFile, jsonData);
};
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//отримуємо код - фрагмент імені файлу по друге підркеслення "m_11"  з назви файлу  "m_11_імяФайлу"
const getID = (fileName) => {
  const arrSimvol = fileName.split("");
  let count = 0;
  let i = 0;
  while (count < 2 && i < 5) {
    if (arrSimvol[i] === "_") {
      count += 1;
    }
    i += 1;
  }
  if (count === 2) {
    return fileName.slice(0, i - 1);
  } else {
    return (Math.random() * 10).toString();
  }
};
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//записуємо файл, отриманий з масиву обєктів на cloudinary і видаляємо тимчасовий файл
const sendCloudinary = async (file, ind,imageArray) => {
  const { path: pathImgSourse, filename } = file;
  //
  const fileName = path.parse(filename);
  const id = getID(fileName.name);
  const shortTypeDev = fileName.name[0];
  let typeDev = "";
  switch (shortTypeDev) {
    case "d":
      typeDev = "desktop";
      break;
    case "t":
      typeDev = "tablet";
      break;
    case "m":
      typeDev = "mobile";
      break;
  }
  //console.log('fileName', fileName)
  //папка для запису image на cloudinary
  const folder = `Task_Dashboard_Bg/${typeDev}_${fileName.ext.slice(1)}`;
  const cloudinaryResult = await cloudinary.uploader.upload(pathImgSourse, {
    public_id: fileName.name,
    folder: folder,
    width: 700,
  });
  const img = {
    id,
    typedevice: shortTypeDev,
    typefile: cloudinaryResult.format,
    folder: cloudinaryResult.folder,
    serialNumb: ind,
    url: cloudinaryResult.url,
    src: cloudinaryResult.original_filename,
  };
  //массив для запису обэктів картинок
  imageArray.push(img);
  //console.log('imageArray', imageArray)
  //видаляємо файл на temp
  deleteFile(pathImgSourse);
  return getPathFileJSON(typeDev, fileName.ext.slice(1));
};

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//Надсилаємо фото
const sendPhoto1 = async (req, res) => {
  const imageArray = [];
  let pathListImg = "";
  await Promise.all(
    req.files.map(async (file, index) => {
      pathListImg = await sendCloudinary(file, index + 1,imageArray);
    })
  );
  await writeImageToFile(pathListImg,imageArray);
  res.json({ message: "file upload" });
};

const sendPhoto = ctrlWrapper(sendPhoto1);

export default sendPhoto;

//массив для збереження обєктів картинок фону

