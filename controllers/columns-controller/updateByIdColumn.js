import Column from "../../models/Column.js";
import { HttpError } from "../../helpers/index.js";

const updateByIdColumn = async (req, res) => {
  const { id } = req.params;
  const updateColumn = await Column.findByIdAndUpdate(id, req.body);
  if (updateColumn === null) {
    throw HttpError(404);
  }
  res.json(updateColumn);
};
export default updateByIdColumn;
