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
          "https://res.cloudinary.com/drqeo1pu5/image/upload/v1707809622/TaskPro_Avatars/dk_user.jpg";
        break;
      case "violet":
        avatarViolet =
          "https://res.cloudinary.com/drqeo1pu5/image/upload/v1707809622/TaskPro_Avatars/vl_user.jpg";
        break;
      default:
        avatarLight =
          "https://res.cloudinary.com/drqeo1pu5/image/upload/v1707809622/TaskPro_Avatars/lt_user.jpg";
    }
  }

  if (req.user.avatarURL.avatarCustom) {
    await User.findByIdAndUpdate(_id, { theme });
  }

  if (avatarDark) {
    await User.findByIdAndUpdate(_id, {
      theme,
      avatarURL: { avatarDark },
    });
  }

  if (avatarViolet) {
    await User.findByIdAndUpdate(_id, {
      theme,
      avatarURL: { avatarViolet },
    });
  }

  if (avatarLight) {
    await User.findByIdAndUpdate(_id, {
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
