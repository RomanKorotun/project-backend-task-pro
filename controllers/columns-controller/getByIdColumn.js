import HttpError from "../../helpers/HttpError.js";
import Column from "../../models/Column.js";

const getByIdColumn = async (req, res) => {
  const { id: _id, idBoard: owner } = req.params;
  const column = await Column.findOne({ _id, owner });
  if (column === null) {
    throw HttpError(404);
  }
  res.json(column);
};
export default getByIdColumn;
