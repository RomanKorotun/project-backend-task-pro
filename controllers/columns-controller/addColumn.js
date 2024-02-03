import Column from "../../models/Column.js";

const addColumn = async (req, res, next) => {
  const board = "65be64ba347d9668b656e262";
  const column = await Column.create({ ...req.body, board });
  console.log(column);
};
export default addColumn;
