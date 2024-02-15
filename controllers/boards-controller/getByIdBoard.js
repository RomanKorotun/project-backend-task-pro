import HttpError from "../../helpers/HttpError.js";
import { getColumnsBoard } from "../../helpers/index.js";
import BoardModel from "../../models/Board.js";

const getByIdBoard = async (req, res) => {
  const owner =req.user;
  const { id } = req.params;
  let board = await BoardModel.findOne({
    _id: id,
    owner,
  }).populate("owner", "userName email");
  
  if (!board) {
    throw HttpError(404, ` Board with id = ${id} not found`);
  }
  if (board.isActive === false) {
    //Робимо попердедню активну дошку не активною
    await BoardModel.findOneAndUpdate(
      { owner, isActive: true },
      { isActive: false }
    );
    // отриману дошку робимо активною
   board =await BoardModel.findOneAndUpdate(
      { _id: id, owner },
      { ...req.body, isActive: true }
    );
    }
  //Отримуємо і виводимо колонки для активної дошки після її виводу,
  // інщі дошки виводим без змін
  const listBoardsAndColumns = await getColumnsBoard([board]);
 
  res.json(listBoardsAndColumns);
};

export default getByIdBoard;
