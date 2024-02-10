import getObjBgrImg from "../../helpers/getObjBgrImg.js";
import BoardModel from "../../models/Board.js";


const addBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { background } = req.body;

  // в списку дощок маэ бути тільки одна активна дошка, тому шукаємо попередню активну дошку і робимо її неактивною
  let numbBgr = 1;
  if (background) {
    numbBgr = Number(background);
  }
  await BoardModel.findOneAndUpdate(
    { owner, isActive: true },
    { isActive: false }
  );

  //шукаємо фонові картинки для дошки  по замовчуванню
//отримуємо обєкт картинок в залежності від номеру списку що приходить з фронта
  const backgroundObj = await getObjBgrImg(numbBgr); 

  const board = await BoardModel.create({
    ...req.body,
    ...backgroundObj,
    owner: req.user._id,
    isActive: true,
  });
  res.status(201).json(board);
};

export default addBoard;
