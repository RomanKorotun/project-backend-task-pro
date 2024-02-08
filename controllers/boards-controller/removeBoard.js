import HttpError from "../../helpers/HttpError.js";
import BoardModel from "../../models/Board.js";
import Card from "../../models/Card.js";
import Column from "../../models/Column.js";

const removeBoard = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  //спочатку перевіримо чи валідний id передав користувач
  const board = await BoardModel.findOne({ _id: id, owner });
  if (!board) {
    throw HttpError(404, ` Board with id = ${id} not found`);
  }
  const isActive = board.isActive;
  //якщо валідний id отримуємо масив колонок що належать дошці
  const columns = await Column.find({ owner: board._id });
  if (columns) {
    await Promise.all(
      columns.map(async (column) => {
        //видаляємо для кожної солонки дошки що видаляємо всі картки
        const cards = await Card.deleteMany({ owner: column._doc._id });
      })
    );
  }
//видаляэмо колонки що належать дощці що видаляємо
  await Column.deleteMany({ owner: board._id });
  await BoardModel.findOneAndDelete({
    _id: id,
    owner,
  });
  // якщо ми видалили активну дошку назначаэмо активну першу в масиві дошок юзера
  if (isActive) {
    const boards = await BoardModel.find({ owner });
    if (boards.length !== 0) {
      const _id = boards[0]._id;
      await BoardModel.findByIdAndUpdate({ _id }, { isActive: true });
    }
  }
  res.json({
    message: `Board ${id} deleted for user ${owner}`,
  });
};

export default removeBoard;
