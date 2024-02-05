import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import HttpError from "../../helpers/HttpError.js";
import { User } from "../../models/User.js";
import bcryptjs from "bcryptjs";

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  //дефолтний аватар для світлої
  const avatarURL =
    "http://res.cloudinary.com/drj0am35a/image/upload/v1707058150/lt_user.jpg";

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

export default signUp;
