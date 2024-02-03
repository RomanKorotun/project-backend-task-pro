import HttpError from "../../helpers/HttpError.js";
import { User } from "../../models/User.js";
import bcryptjs from "bcryptjs";
//import { nanoid } from "nanoid";

const userRegister = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return next(HttpError(409, "Email in use"));
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  const avatarURL = "avatarUrl";

  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
  });

  res.status(201).json({
    user: {
      userName: newUser.userName,
      email: newUser.email,
    },
  });
};
export default userRegister;
