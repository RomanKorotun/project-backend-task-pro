import HttpError  from "../../helpers/HttpError.js";
import BoardModel from "../../models/Board.js";

const updateActive = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const {isActive}=req.body;
    // в списку дощок маэ бути тільки одна активна дошка, тому шукаємо попередню активну дошку і робимо її неактивною
     if(isActive === true) {
        await BoardModel.findOneAndUpdate(
        {  owner, isActive: true },
        {isActive :false}
      ); 
     }
     // створену дошку робимо активною
    const board = await BoardModel.findOneAndUpdate(
      { _id: id, owner },
      {...req.body,isActive: true}
    );
    if (!board) {
      throw HttpError(404, ` Board with id = ${id} not found`);
    }
    res.status(201).json(board);
  };

  export default updateActive;