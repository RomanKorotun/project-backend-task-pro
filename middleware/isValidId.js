import { HttpError } from "../helpers/index.js";
import { isValidObjectId } from "mongoose";

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (isValidObjectId(id) === false) {
    return next(HttpError(400, `${id} is not id`));
  }
  next();
};
export default isValidId;
