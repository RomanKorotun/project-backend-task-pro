import { getColumnsBoard } from "../../helpers/index.js";
import BoardModel from "../../models/Board.js";

const currentUser = async (req, res) => {
  const { userName, email, theme, avatarURL, _id } = req.user;

  const listBoards = await BoardModel.find({ owner: _id });

  const listBoardsAndColumns = await getColumnsBoard(listBoards);

  res.json({
    user: {
      avatarURL,
      userName,
      email,
      theme,
      boards: listBoardsAndColumns,
    },
  });
};
export default currentUser;
