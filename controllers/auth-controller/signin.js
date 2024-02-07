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

  const avatarLight =
    "http://res.cloudinary.com/drj0am35a/image/upload/v1707058150/lt_user.jpg";
  const avatarDark =
    "http://res.cloudinary.com/drj0am35a/image/upload/v1707058150/dk_user.jpg";
  const avatarViolet =
    "http://res.cloudinary.com/drj0am35a/image/upload/v1707058150/vl_user.jpg";

  switch (user.theme) {
    case "dark":
      user.avatarURL = avatarDark;
      break;
    case "violet":
      user.avatarURL = avatarViolet;
      break;
    default:
      user.avatarURL = avatarLight;
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

  await User.findByIdAndUpdate(user._id, { token });

  const listBoards = await BoardModel.find({ owner: user._id });
  //Отримуємо і виводимо колонки для активної дошки після її виводу,
  // інщі дошки виводим без змін
  const listBoardsAndColumns = await getColumnsBoard(listBoards);

  res.json({
    token: token,
    user: {
      userName: user.userName,
      email: user.email,
      avatarURl: user.avatarURL,
      theme: user.theme,
      boards: listBoardsAndColumns,
    },
  });
};

export default userSigIn;
