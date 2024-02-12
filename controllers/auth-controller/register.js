import HttpError from "../../helpers/HttpError.js";
import { User } from "../../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  //дефолтний аватар для світлої
  const avatarLight =
    "http://res.cloudinary.com/drj0am35a/image/upload/v1707058150/lt_user.jpg";

  const newUser = await User.create({
    ...req.body,
    avatarURL: { avatarLight },
    password: hashPassword,
  });

  const { _id } = await User.findOne({ email });

  const payload = {
    id: _id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  await User.findByIdAndUpdate(_id, { token });

  res.status(201).json({
    token,
    user: {
      userName: newUser.userName,
      email: newUser.email,
      avatarURL: newUser.avatarURL,
      theme: newUser.theme,
    },
  });
};

export default signUp;
