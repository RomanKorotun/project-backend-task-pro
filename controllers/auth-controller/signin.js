import HttpError from "../../helpers/HttpError.js";
import { User } from "../../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
const { JWT_SECRET } = process.env;

const userSigIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); //перевірка наявності юзера з таким email-ом

  if (!user) {
    return next(HttpError(401, "Email or password is wrong"));
  }

  const passwordCompare = await bcryptjs.compare(password, user.password); // перевірка валідності паролю
  if (!passwordCompare) {
    return next(HttpError(401, "Email or password is wrong"));
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" }); // генерація токена

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token: token,
    user: {
      userName: user.userName,
      email: user.email,
      avatarURl: user.avatarURl,
    },
  });
};

export default userSigIn;
