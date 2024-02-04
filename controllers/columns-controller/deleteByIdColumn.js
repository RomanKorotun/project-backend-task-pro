import Column from "../../models/Column.js";

const deleteByIdColumn = async (req, res, next) => {
  const { id: _id } = req.params;
  const deleteColumn = await Column.findByIdAndDelete(id);
  res.status(204).json();
};
export default deleteByIdColumn;
