import HttpError from "../../helpers/HttpError.js";
import { User } from "../../models/User.js";

const updateTheme = async (req, res) => {
  const { _id } = req.user;
  const { theme } = req.body;

  let avatarDark = null;
  let avatarViolet = null;
  let avatarLight = null;

  if (!req.user.avatarURL.avatarCustom) {
    switch (theme) {
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

  if (req.user.avatarURL.avatarCustom) {
    await User.findByIdAndUpdate(_id, { theme });
  }

  if (avatarDark) {
    const user = await User.findByIdAndUpdate(_id, {
      theme,
      avatarURL: { avatarDark },
    });
  }

  if (avatarViolet) {
    const user = await User.findByIdAndUpdate(_id, {
      theme,
      avatarURL: { avatarViolet },
    });
  }

  if (avatarLight) {
    const user = await User.findByIdAndUpdate(_id, {
      theme,
      avatarURL: { avatarLight },
    });
  }

  const { avatarURL, email } = await User.findById(_id);

  if (req.user.avatarURL.avatarCustom) {
    res.json({
      email,
      theme,
    });
    return;
  }

  res.json({
    email,
    theme,
    avatarURL,
  });
};

export default updateTheme;
