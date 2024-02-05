import HttpError from "../helpers/HttpError.js";
import "dotenv/config";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Authorization not define!"));
  }

  //перевірка чи є в рядку хедер слово bearer та токен
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Authorization row not valid"));
  }

  //перевірка токена на валідність
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    // перевірка чи є такий Юзер
    const user = await User.findById(id);
    if (!user || !user.token || token !== user.token) {
      return next(HttpError(401, " User not define"));
    }
    req.user = user; //додаєм до обєкту user поле з даними користувача, який робить приватні запити
    next();
  } catch (error) {
    next(HttpError(401, "Unauthorized"));
  }
};

export default authenticate;
