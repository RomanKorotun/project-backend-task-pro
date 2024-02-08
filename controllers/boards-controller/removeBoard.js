import HttpError from "../../helpers/HttpError.js";
import BoardModel from "../../models/Board.js";
import Card from "../../models/Card.js";
import Column from "../../models/Column.js";

const removeBoard = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  //спочатку перевіримо чи валідний id передав користувач
  const board = await BoardModel.findById(id);
  if (!board) {
    throw HttpError(404, ` Board with id = ${id} not found`);
  }
  //якщо валідний id отримуємо масив колонок що належать дошці
  const columns = await Column.find({ owner: board._id });
  //console.log("columns", columns);
  if (columns) {
    // await Promise.all(
    //   columns.map(async (column) => {
        //console.log("!!!!!!!!!!!column._doc._id", column._doc._id);
        const cards = await Card.deleteMany({ owner: column._doc._id });
        // const cards = await Card.find({ owner: column._doc._id });
        //console.log(`cards для ад  ${column._doc._id }` , cards);

        // return {
        //   ...column._doc,
        // };
      // })
    // );
 
  }

  await Column.deleteMany({ owner: board._id });


  //  await BoardModel.findOneAndDelete(
  //   {
  //     _id: id,
  //     owner,
  //   });

  res.json({
    message: "Board deleted",
  });
};

export default removeBoard;
