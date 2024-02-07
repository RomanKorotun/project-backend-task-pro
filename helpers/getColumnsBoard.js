import Card from "../models/Card.js";
import Column from "../models/Column.js";
const getAarCards = async (column) => {
  const arrCard = await Card.find({ owner: column._id });
  
   
  return arrCard;
};


const getColumnsBoard = async (listB) => {
  const activeBoard = listB.find((el) => el.isActive === true);
  const columns = await Column.find({ owner: activeBoard._id });
  const cards = await Promise.all(columns.map(async (column) => {
    const arCards = await getAarCards(column);
    return {
      ...column._doc,
      cards: arCards,
    };
  }));
  return listB.map((board) => {
    if (board.isActive) {
      return { ...board._doc, columns: cards };
    } else {
      return board;
    }
  });
};
export default getColumnsBoard;