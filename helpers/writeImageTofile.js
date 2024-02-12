import fs from "fs/promises";
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//записуємо обєкт картинки в файл Json
const writeImageToFile = async (pathFile,imageArray) => {

    const jsonData = JSON.stringify(imageArray, null, 2);
    await fs.writeFile(pathFile, jsonData);
  };


  export default writeImageToFile;