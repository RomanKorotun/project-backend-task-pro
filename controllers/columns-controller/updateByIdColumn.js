import Column from "../../models/Column.js";
import { HttpError } from "../../helpers/index.js";

const updateByIdColumn = async (req, res) => {
  const { id: _id, idBoard: owner } = req.params;
  const updateColumn = await Column.findOneAndUpdate({ _id, owner }, req.body);
  if (updateColumn === null) {
    throw HttpError(404);
  }
  res.json(updateColumn);
};
export default updateByIdColumn;
