import Column from "../../models/Column.js";

const updateByIdColumn = async (req, res, next) => {
  const { id: _id } = req.params;
  const updateColumn = await Column.findByIdAndUpdate(id, req.body);
  res.json(updateColumn);
};
export default updateByIdColumn;
