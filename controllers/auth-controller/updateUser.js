import { User } from "../../models/User.js";
import bcryptjs from "bcryptjs";
import cloudinary from "../../helpers/cloudinary.js";
import fs from "fs/promises";

const updateUser = async (req, res) => {
  try {
    const { _id } = req.user;

    const { password } = req.body;

    const hashPassword = await bcryptjs.hash(password, 10);

    if (req.file !== undefined) {
      const { url: avatarUpload } = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "avatars",
        }
      );
      await fs.unlink(req.file.path);
      const result = await User.findByIdAndUpdate(_id, {
        ...req.body,
        password: hashPassword,
        avatarURL: { avatarCustom: avatarUpload },
      });
      res.json({
        avatarURL: result.avatarURL,
        userName: result.userName,
        email: result.email,
        password: result.password,
      });
      return;
    }

    const result = await User.findByIdAndUpdate(_id, {
      ...req.body,
      password: hashPassword,
    });

    res.json({
      userName: result.userName,
      email: result.email,
      password: result.password,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

export default updateUser;
