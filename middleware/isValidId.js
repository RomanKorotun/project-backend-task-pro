import { HttpError } from "../helpers/index.js";
import { isValidObjectId } from "mongoose";

const isValidId = (req, res, next) => {
  let id;
  let id2;
  const param = Object.keys(req.params);
  if (param[0]) {
    if (param[0] === "idBoard") {
      id = req.params.idBoard;
    } else if (param[0] === "idColumn") {
      id = req.params.idColumn;
    } else if (param[0] === "id") {
      id = req.params.id;
    }
  }
  if (isValidObjectId(id) === false) {
    return next(HttpError(400, `${id} is not id`));
  }
  if (param[1]) {
    id2 = req.params.id;
    if (isValidObjectId(id2) === false) {
      return next(HttpError(400, `${id2} is not id`));
    }
  }

  next();
};
export default isValidId;
