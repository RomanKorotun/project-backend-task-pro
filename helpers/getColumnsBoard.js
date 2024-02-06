import Column from "../models/Column.js";


const getColumnsBoard = async (listB) => {
    const activeBoard = listB.find((el) => el.isActive === true);
    const column = await Column.find({ owner: activeBoard._id });
    return listB.map((board) => {
      if (board.isActive) {
        return { board: board._doc, columns: column };
      } else {
        return board;
      }
    });
  };

export default getColumnsBoard;
