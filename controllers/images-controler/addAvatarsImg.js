
import {HttpError, sendCloudinaryAvatars,writeImageToFile} from "../../helpers/index.js";
import path from "path";
//import writeImageToFile from "../../helpers/writeImageTofile.js";

const addAvatarsImg = async (req, res) => {
    const imageArray = [];

  const pathListImg = path.join(path.resolve("images"), `avatars.json`);;

if (!req.files){
    throw HttpError(400, "missing files")
}
  await Promise.all(
    req.files.map(async (file) => {
      await sendCloudinaryAvatars(file, imageArray);
    })

  );

  await writeImageToFile(pathListImg, imageArray);
  res.json({ message: "files avatars upload" });
};
export default addAvatarsImg;
