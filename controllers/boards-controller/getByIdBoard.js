import BoardModel from "../../models/Board.js";

const getByIdBoard = async (req, res) => {
    const { id} = req.params;
    const board = await BoardModel.findOne({
      _id: id,
      owner: req.user._id,
    });
    if (!board) {
      throw HttpError(404, ` Contact with id = ${id} not found`);
    }
    res.json(board);
  };

  export default getByIdBoard;

  