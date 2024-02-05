import HttpError from "../../helpers/HttpError.js";
import { User } from "../../models/User.js";
import bcryptjs from "bcryptjs";

const updateUser = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const updateData = req.body;

    // Отримати пароль з req.body
    const { password } = req.body;

    const hashPassword = await bcryptjs.hash(password, 10);
    //дані для оновлення з запиту разом з хешованим паролем
    const newUserData = { ...updateData, password: hashPassword };

    const result = await User.findOneAndUpdate(
      { _id: userId }, // Умова пошуку
      newUserData
    );

    const { userName, email } = result;

    const updateResult = {
      userName,
      email,
    };

    res.json(updateResult);
  } catch (error) {
    next(error);
  }
};

export default updateUser;
