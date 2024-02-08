
import {getColumnsBoard} from "../../helpers/index.js";
import BoardModel from "../../models/Board.js";

const getAllBoards = async (req, res) => {
  const query = { owner: req.user._id };

  const listBoards = await BoardModel.find(query).populate(
    "owner",
    "email userName"
  );
  //Отримуємо і виводимо колонки для активної дошки після її виводу,
  // інщі дошки виводим без змін
 
  const listBoardsAndColumns = await getColumnsBoard(listBoards);
   res.json(listBoardsAndColumns);
};
export default getAllBoards;

