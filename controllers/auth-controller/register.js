import HttpError from "../../helpers/HttpError.js";
import { User } from "../../models/User.js";
import bcryptjs from "bcryptjs";
import { nanoid } from "nanoid";

const userRegister = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return next(HttpError(409, "Email in use"));
  }
  const avatarURL = "avatarURL";
  const theme = "theme";
  const hashPassword = await bcryptjs.hash(password, 10);
  console.log("password :>> ", password);
  console.log("hashPassword :>> ", hashPassword);
  const token = nanoid();

  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
    token,
  });

  res.status(201).json({
    user: {
      userName: newUser.userName,
      email: newUser.email,
      password: hashPassword,
      theme,
      token,
    },
    avatarURL,
  });
};
export default userRegister;
