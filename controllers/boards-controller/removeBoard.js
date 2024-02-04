import BoardModel from "../../models/Board.js";

const removeBoard = async (req, res) => {
  const { id} = req.params;
  const { _id: owner } = req.user;
  const board = await BoardModel.findOneAndDelete({
    _id: id,
    owner,
  });
  if (!id) {
    throw HttpError(404, ` Board with id = ${id} not found`);
  }
  res.json({
    message: "Board deleted",
  });
};

export default removeBoard;