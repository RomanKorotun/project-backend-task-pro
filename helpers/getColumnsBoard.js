import Column from "../models/Column.js";

const getColumnsBoard = async (listB) => {
  const activeBoard = listB.find((el) => el.isActive === true);
  const columns = await Column.find({ owner: activeBoard._id });
  const cards = columns.map((column) => {
    const fcard = {
      id: "65c28f4816478934190dce5e",
      title: "перша картка",
      description: "опис 1",
      priority: "low",
    };
    const scard = {
      id: "65c28f4816478934190dce5e",
      title: "Другк картка",
      description: "опис 2",
      priority: "low",
    };
    const tcard = {
      id: "65c28f4816478934190dce5e",
      title: "третя картка",
      description: "опис 3",
      priority: "high",
    };
    return {
      col: column._doc,
      cards: [fcard, scard, tcard],
    };
  });

  return listB.map((board) => {
    if (board.isActive) {
      return { board: board._doc, columns: cards };
    } else {
      return board;
    }
  });
};

export default getColumnsBoard;
