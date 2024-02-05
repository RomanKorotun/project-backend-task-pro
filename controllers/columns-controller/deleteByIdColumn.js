import { HttpError } from "../../helpers/index.js";
import Column from "../../models/Column.js";

const deleteByIdColumn = async (req, res) => {
  const { id } = req.params;
  const deleteColumn = await Column.findByIdAndDelete(id);
  if (deleteColumn === null) {
    throw HttpError(404);
  }
  res.status(204).json();
};
export default deleteByIdColumn;
