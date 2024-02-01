import { HttpError } from "../helpers/index.js";

const isEmptyBody = (req, res, next) => {
  const items = Object.keys(req.body);
  const length = items.length;
  if (length === 0) {
    return next(HttpError(400, "missing fields"));
  }
  next();
};
export default isEmptyBody;
