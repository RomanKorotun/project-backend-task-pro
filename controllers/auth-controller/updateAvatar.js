import cloudinary from "../../helpers/cloudinary.js";
import { User } from "../../models/User.js";
import fs from "fs/promises";

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;

    // завантаження аватарки на хмару у папку "avatars"
    const { url: avatarUpload } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "avatars",
      }
    );

    //видалення файла з аватаркою з папки temp
    await fs.unlink(req.file.path);

    const result = await User.findByIdAndUpdate(_id, {
      avatarURL: { avatarCustom: avatarUpload },
    });

    res.json({
      email: result.email,
      avatarURL: result.avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
  }
};

export default updateAvatar;
