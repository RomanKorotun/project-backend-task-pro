import BoardModel from "../../models/Board.js";

const getAllBoards = async (req, res) => {
  const query = { owner: req.user._id };
  const list = await BoardModel.find(query).populate("owner","email userName");
  //const list = await BoardModel.find(query, "tytle");
  res.json(list);
};
export default getAllBoards;


