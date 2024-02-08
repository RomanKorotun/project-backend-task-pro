import { HttpError } from "../../helpers/index.js";
import Card from "../../models/Card.js";
import Column from "../../models/Column.js";

const deleteByIdColumn = async (req, res) => {
  const { id: _id, idBoard: owner } = req.params;
  await Card.deleteMany({ owner: _id });
  const deleteColumn = await Column.findOneAndDelete({ _id, owner });
  if (deleteColumn === null) {
    throw HttpError(404);
  }
  res.json({
    message: "column deleted",
  });
};
export default deleteByIdColumn;
