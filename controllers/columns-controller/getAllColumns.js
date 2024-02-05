import Column from "../../models/Column.js";

const getAllColumns = async (req, res) => {
  const { idBoard: owner } = req.params;
  const allColumns = await Column.find({ owner });
  res.json(allColumns);
};
export default getAllColumns;
