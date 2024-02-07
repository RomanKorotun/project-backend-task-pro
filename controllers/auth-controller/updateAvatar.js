import cloudinary from "../../helpers/cloudinary.js";
import { User } from "../../models/User.js";
import fs from "fs/promises";

const updateAvatar = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    // завантаження аватарки на хмару у папку "avatars"
    const { url: avatarUpload } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "avatars",
      }
    );

    //видалення файла з аватаркою з папки temp
    await fs.unlink(req.file.path);

    const result = await User.findOneAndUpdate(
      { _id: userId },
      {
        avatarURL: avatarUpload,
        defAvatar: false,
      }
    );

    //запис в об'єкт user посилання на новаий аватар
    req.user.avatarURL = avatarUpload;

    res.json({ avatarURL: result.avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
  }
};

export default updateAvatar;
