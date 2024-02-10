import sendCloudinary from "../../helpers/sendImagesAndWrite.js";
import writeImageToFile from "../../helpers/writeImageTofile.js";
import ImageModel from "../../models/CollectImg.js";

const writeToBd = async (array) => {
  array.sort(
    (firstImage, secondImage) =>
      firstImage.serialNumber - secondImage.serialNumber
  );
  await Promise.all(
    array.map(async (elem) => {
      await ImageModel.create({
        serialNumber: elem.serialNumb,
        device: elem.typeDev,
        X: elem.x,
        imgUrl: elem.url,
        extention: elem.typefile,
      });
    })
  );
};

const addImages = async (req, res) => {
  const imageArray = [];
  let pathListImg = "";
  await Promise.all(
    req.files.map(async (file, index) => {
      pathListImg = await sendCloudinary(file, index + 1, imageArray);
    })
  );
  // Очікуємо завершення всіх операцій додавання файлів перед сортуванням
  imageArray.sort(
    (firstImage, secondImage) => firstImage.serialNumb - secondImage.serialNumb
  );
  await writeImageToFile(pathListImg, imageArray);

  await writeToBd(imageArray);

  res.json({ message: "files upload" });
};
export default addImages;
