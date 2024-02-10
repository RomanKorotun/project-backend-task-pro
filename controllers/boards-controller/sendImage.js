//import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import dotenv from "dotenv";
import path from "path";
import {cloudinary} from "../../helpers/index.js";


dotenv.config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

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
//отримуємо код - фрагмент імені файлу по третє підркеслення "m_11"  з назви файлу  "m_11_імяФайлу"
const getID = (fileName) => {
  const arrSimvol = fileName.split("");
  let count = 0;
  let i2 = 0;//позиция второго подчеркивания
let i3 = 0;//позиция второго подчеркивания
  while (count < 3 && i3 < 10) {
    if (arrSimvol[i3] === "_") {
      count += 1;
    }
    if (count === 2){
        i2 = i3;
    }

    i3 += 1;
  }
  const id = fileName.slice(0, i2 - 1); 
if (count === 2) {
   const x = '1x';
}else {
  if (count === 3) {
  const x = fileName.slice(i2, i3 - 1); ;
}}
 return {
  id,
  x
 }
  
};
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//записуємо файл, отриманий з масиву обєктів на cloudinary і видаляємо тимчасовий файл
const sendCloudinary = async (file, ind,imageArray) => {
  const { path: pathImgSourse, filename } = file;

  const fileName = path.parse(filename);
  const id_and_X = getID(fileName.name).id;
  const id = id_and_X.id;
const x = id_and_X.x;
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

  //папка для запису image на cloudinary
  const folder = `Task_Dashboard_Bg/${typeDev}_${fileName.ext.slice(1)}`;
  const cloudinaryResult = await cloudinary.uploader.upload(pathImgSourse, {
    public_id: fileName.name,
    folder: folder,
    width: 700,
  });
  const img = {
    id,
    x,//щільність зображення
    typedevice: shortTypeDev,
    typefile: cloudinaryResult.format,
    folder: cloudinaryResult.folder,
    serialNumb: ind,
    url: cloudinaryResult.url,
    src: cloudinaryResult.original_filename,
  };
  //массив для запису обэктів картинок
  imageArray.push(img);
  //видаляємо файл на temp
  deleteFile(pathImgSourse);
  return getPathFileJSON(typeDev, fileName.ext.slice(1));
};

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//Надсилаємо фото
const sendPhoto = async (req, res) => {
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



export default sendPhoto;

//массив для збереження обєктів картинок фону

