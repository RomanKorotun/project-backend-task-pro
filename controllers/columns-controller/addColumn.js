import Column from "../../models/Column.js";

const addColumn = async (req, res) => {
  const { idBoard: owner } = req.params;
  const column = await Column.create({ ...req.body, owner });
  res.status(201).json(column);
};
export default addColumn;
