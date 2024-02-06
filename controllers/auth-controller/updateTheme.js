import HttpError from "../../helpers/HttpError.js";
import { User } from "../../models/User.js";

const updateTheme = async (req, res) => {
  const { _id: userId } = req.user;
  const { theme } = req.body;

  let updateAvatarTheme;

  const avatarLight =
    "http://res.cloudinary.com/drj0am35a/image/upload/v1707058150/lt_user.jpg";
  const avatarDark =
    "http://res.cloudinary.com/drj0am35a/image/upload/v1707058150/dk_user.jpg";
  const avatarViolet =
    "http://res.cloudinary.com/drj0am35a/image/upload/v1707058150/vl_user.jpg";

  switch (theme) {
    case "dark":
      updateAvatarTheme = avatarDark;
      break;
    case "violet":
      updateAvatarTheme = avatarViolet;
      break;
    default:
      updateAvatarTheme = avatarLight;
  }

  // Оновлення теми
  await User.findByIdAndUpdate(userId, { theme });

  // Оновлення avatarURL
  const result = await User.findByIdAndUpdate(
    userId,
    { avatarURL: updateAvatarTheme },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, `User with ${userId} not found. Please repeat.`);
  }

  res.json({
    theme: result.theme,
    avatarURL: updateAvatarTheme,
  });
};

export default updateTheme;
