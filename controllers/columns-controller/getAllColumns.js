import Column from "../../models/Column.js";

const getAllColumns = async (req, res, next) => {
  const { idBoard: board } = req.params;
  const allColumns = await Column.find({ board }).populate("board", "title");
  res.json(allColumns);
};
export default getAllColumns;
