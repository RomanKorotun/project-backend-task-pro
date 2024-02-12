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
//Назва файлу JSON буде формуватись в залежності від виду пристрою і розширення файлу:
// Для десктопу desktop_webp desktop_jpeg
// Для таблетки tablet_webp ....
const getPathFileJSON = (typeDev, extFile) => {
  return path.join(path.resolve("images"), `${typeDev}_${extFile}.json`);
};

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//отримуємо код - фрагмент імені файлу по третє підркеслення "m_11"  з назви файлу  "m_11_імяФайлу"
const getID = (fileName) => {
  const arrSimvol = fileName.split("");
  let count = 0;
  let i2 = 0; //позиция второго подчеркивания
  let i3 = 0; //позиция третего подчеркивания
  while (count < 3 && i3 < 10) {
    if (arrSimvol[i3] === "_") {
      count += 1;
    }
    if ((count === 2)&&(i2 === 0)) {
  
      i2 = i3;
    }

    i3 += 1;
  };


  const id = fileName.slice(0, i2 );
  let x;
  switch (count) {
    case 2:
      x = "1x";
      break;
    case 3:
      x = fileName.slice(i2+1, i3 - 1);
      break;
    default:
      x = "??";
  }

  return {
    id,
    x,
  };
};
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//записуємо файл, отриманий з масиву обєктів на cloudinary і видаляємо тимчасовий файл
const sendCloudinary = async (file, ind, imageArray,width) => {
  const { path: pathImgSourse, filename } = file;
  //
  const fileName = path.parse(filename);

  const id_and_X = getID(fileName.name);

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
  const folder = `Task_Dashboard_Bg/${typeDev}_${fileName.ext.slice(1)}_${x}`;
  
  
  const cloudinaryResult = await cloudinary.uploader.upload(pathImgSourse, {
    public_id: fileName.name,
    folder: folder,
    width,
  });

  const img = {
    id,
    x, //щільність зображення
    typedevice: shortTypeDev,
    typeDev,
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

export default sendCloudinary;
