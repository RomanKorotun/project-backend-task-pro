import Column from "../../models/Column.js";

const addColumn = async (req, res) => {
  const { idBoard: board } = req.params;
  const column = await Column.create({ ...req.body, board });
  res.status(201).json(column);
};
export default addColumn;
