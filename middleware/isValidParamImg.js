import { HttpError } from "../helpers/index.js";

const deviceList = ["desktop", "mobile", "tablet"];
const xList = ["1x", "2x"];
const isValidParamImg = (req, res, next) => {
  const { serialNumber, device, X } = req.params;
  //device та X можна не вказувати у запиті. Тоді будуть undefound
  let devOk = true;
  let xOk = true;
  let serNumberOk = false;
  if (device) {
    devOk = deviceList.some((el) => (el = device));
  }
  if (X) {
    xOk = xList.some((el) => (el = X));
  }
  if (serialNumber >= 1 && serialNumber <= 15) {
    serNumberOk = true;
  }

  if (!devOk || !xOk || !serNumberOk) {
    return next(
      HttpError(
        400,
        `No valid serial number:${device}  or device: ${device} or x:${X}`
      )
    );
  }
  next();
};
export default isValidParamImg;
