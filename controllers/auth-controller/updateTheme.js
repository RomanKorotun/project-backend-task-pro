import HttpError from "../../helpers/HttpError.js";
import { User } from "../../models/User.js";

const updateTheme = async (req, res) => {
  try {
    const { _id: userId, theme } = req.user;

    const result = await User.findOneAndUpdate(
      { _id: userId, theme },
      req.body
    );

    if (!result) {
      throw HttpError(404, `User with ${userId} not found. Please repeat.`);
    }
    res.json({ theme: result.theme });
  } catch (error) {
    next(error);
  }
};

export default updateTheme;
