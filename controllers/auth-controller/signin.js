import HttpError from "../../helpers/HttpError.js";
import { User } from "../../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import BoardModel from "../../models/Board.js";
import { getColumnsBoard } from "../../helpers/index.js";

const { JWT_SECRET } = process.env;

const userSigIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }); //перевірка наявності юзера з таким email-ом

  let avatarDark = null;
  let avatarViolet = null;
  let avatarLight = null;

  if (!user.avatarURL.avatarCustom) {
    switch (user.theme) {
      case "dark":
        avatarDark =
          "http://res.cloudinary.com/drj0am35a/image/upload/v1707058150/dk_user.jpg";
        break;
      case "violet":
        avatarViolet =
          "http://res.cloudinary.com/drj0am35a/image/upload/v1707058150/vl_user.jpg";
        break;
      default:
        avatarLight =
          "http://res.cloudinary.com/drj0am35a/image/upload/v1707058150/lt_user.jpg";
    }
  }

  if (!user) {
    throw HttpError(401, "Your Email or password is wrong");
  }

  const passwordCompare = await bcryptjs.compare(password, user.password); // перевірка валідності паролю
  if (!passwordCompare) {
    throw HttpError(401, "Your Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" }); // генерація токена

  if (user.avatarURL.avatarCustom) {
    await User.findByIdAndUpdate(user._id, { token });
  }

  if (avatarDark) {
    await User.findByIdAndUpdate(user._id, {
      token,
      avatarURL: { avatarDark },
    });
  }

  if (avatarViolet) {
    await User.findByIdAndUpdate(user._id, {
      token,
      avatarURL: { avatarViolet },
    });
  }

  if (avatarLight) {
    await User.findByIdAndUpdate(user._id, {
      token,
      avatarURL: { avatarLight },
    });
  }

  const { avatarURL } = await User.findOne({ email });

  const listBoards = await BoardModel.find({ owner: user._id });
  //Отримуємо і виводимо колонки для активної дошки після її виводу,
  // інщі дошки виводим без змін
  const listBoardsAndColumns = await getColumnsBoard(listBoards);

  res.json({
    token: token,
    user: {
      userName: user.userName,
      email: user.email,
      avatarURL: avatarURL,
      theme: user.theme,
      boards: listBoardsAndColumns,
    },
  });
};

export default userSigIn;
