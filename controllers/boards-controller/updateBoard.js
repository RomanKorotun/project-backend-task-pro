import HttpError from "../../helpers/HttpError.js";
import BoardModel from "../../models/Board.js";

const updateBoard = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  // налаштування  {new:true,runValidators:true} винесли в хук addAdjustmentsBeforeUpdate при створенні схеми mongoose
  const board = await BoardModel.findOneAndUpdate(
    {
      _id: id,
      owner,
    },
    req.body
  );

  if (!board) {
    throw HttpError(404, ` Board with id = ${id} not found`);
  }
  res.status(201).json(board);
};

export default updateBoard;
