import { HttpError } from "../helpers/index.js";

const isValidNumbList = (req, res, next) => {
  const { background: serialNumber } = req.body;

  let serNumberOk = true;
  if ( serialNumber > 15) {
    serNumberOk = false;
  }
  if (!serNumberOk) {
    return next(
      HttpError(
        400,
        `No valid serial number:${serialNumber}`
      )
    );
  }
  next();
};

export default isValidNumbList;
