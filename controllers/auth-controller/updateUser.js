import { User } from "../../models/User.js";
import bcryptjs from "bcryptjs";
import cloudinary from "../../helpers/cloudinary.js";
import fs from "fs/promises";

const updateUser = async (req, res) => {
  try {
    const { _id } = req.user;

    let hashPassword = null;

    if (req.body.password) {
      hashPassword = await bcryptjs.hash(req.body.password, 10);
    }

    if (req.file) {
      const { url: avatarUpload } = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "avatars",
        }
      );
      await fs.unlink(req.file.path);
      if (req.body.password) {
        const result = await User.findByIdAndUpdate(_id, {
          ...req.body,
          password: hashPassword,
          avatarURL: { avatarCustom: avatarUpload },
        });

        res.json({
          avatarURL: result.avatarURL,
          userName: result.userName,
          email: result.email,
        });
        return;
      }

      const result = await User.findByIdAndUpdate(_id, {
        ...req.body,
        avatarURL: { avatarCustom: avatarUpload },
      });

      res.json({
        avatarURL: result.avatarURL,
        userName: result.userName,
        email: result.email,
      });
      return;
    }

    if (req.body.password) {
      const result = await User.findByIdAndUpdate(_id, {
        ...req.body,
        password: hashPassword,
      });

      res.json({
        userName: result.userName,
        email: result.email,
      });
      return;
    }

    const result = await User.findByIdAndUpdate(_id, {
      ...req.body,
    });

    res.json({
      userName: result.userName,
      email: result.email,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

export default updateUser;
