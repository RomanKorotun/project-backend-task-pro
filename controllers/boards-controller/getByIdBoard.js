import HttpError from "../../helpers/HttpError.js";
import {getColumnsBoard} from "../../helpers/index.js";
import BoardModel from "../../models/Board.js";

const getByIdBoard = async (req, res) => {
    const { id} = req.params;
    const board = await BoardModel.findOne({
      _id: id,
      owner: req.user._id,
    }).populate("owner","userName email");;
    if (!board) {
      throw HttpError(404, ` Board with id = ${id} not found`);
    }
  //Отримуємо і виводимо колонки для активної дошки після її виводу,
  // інщі дошки виводим без змін
  const listBoardsAndColumns = await getColumnsBoard([board]);

    res.json(listBoardsAndColumns);
  };

  export default getByIdBoard;

  