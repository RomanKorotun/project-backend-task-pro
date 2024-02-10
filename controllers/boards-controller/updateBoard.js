import HttpError from "../../helpers/HttpError.js";
import { getObjBgrImg } from "../../helpers/index.js";
import BoardModel from "../../models/Board.js";

const updateBoard = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const { background } = req.body;
  

  let numbBgr = 1;
  if (background) {
    numbBgr = Number(background);
  }
if (numbBgr > 15) {
  throw HttpError(404, ` Serial number = ${numbBgr} cannot be more than 15`);
  }

  //отримуємо обєкт картинок в залежності від номеру списку що приходить з фронта
  const backgroundObj = await getObjBgrImg(numbBgr);
  // налаштування  {new:true,runValidators:true} винесли в хук addAdjustmentsBeforeUpdate при створенні схеми mongoose
  const board = await BoardModel.findOneAndUpdate(
    {
      _id: id,
      owner,
    },
    { ...req.body, ...backgroundObj }
  );

  if (!board) {
    throw HttpError(404, ` Board with id = ${id} not found`);
  }
  res.status(201).json(board);
};

export default updateBoard;
