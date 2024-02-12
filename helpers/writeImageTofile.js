import fs from "fs/promises";
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//записуємо обєкт картинки в файл Json
const writeImageToFile = async (pathFile,imageArray) => {
    // console.log('pathFile', pathFile)
    // console.log(2222)
    const jsonData = JSON.stringify(imageArray, null, 2);
    await fs.writeFile(pathFile, jsonData);
  };


  export default writeImageToFile;