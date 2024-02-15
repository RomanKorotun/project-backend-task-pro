import HttpError from "../../helpers/HttpError.js";
import {getColumnsBoard} from "../../helpers/index.js";
import BoardModel from "../../models/Board.js";

const getByIdBoard = async (req, res) => {
    const { id} = req.params;
      const board = await BoardModel.findOne({
      _id: id,
      owner: req.user._id,
    }).populate("owner","userName email");;
    const owner = req.user;
    
    if (!board) {
      throw HttpError(404, ` Board with id = ${id} not found`);
    }
    if (board.isActive === false){
      //Робимо попердедню активну дошку не активною
      await BoardModel.findOneAndUpdate(
        {  owner, isActive: true },
        {isActive :false}
      ); 
    }
    // отриману дошку робимо активною
   await BoardModel.findOneAndUpdate(
      { _id: id, owner },
      {...req.body,isActive: true}
    );
  //Отримуємо і виводимо колонки для активної дошки після її виводу,
  // інщі дошки виводим без змін
  const listBoardsAndColumns = await getColumnsBoard([board]);
 if (listBoardsAndColumns[0] )
 {
  listBoardsAndColumns[0].isActive = true
 }
    res.json(listBoardsAndColumns);
  };

  export default getByIdBoard;

  