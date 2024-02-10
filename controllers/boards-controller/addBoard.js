import BoardModel from "../../models/Board.js";
import ImageModel from "../../models/CollectImg.js";

const getUrl = async (objFind) => {
  const array = await ImageModel.find(objFind);

  if (array.length > 0) {
    return array[0].imgUrl;
  } else {
     return "";
  }
};

const addBoard = async (req, res) => {
  const { _id: owner } = req.user;
  const { background } = req.body;
  // в списку дощок маэ бути тільки одна активна дошка, тому шукаємо попередню активну дошку і робимо її неактивною
  let numbBgr = 1;
  if (background) {
    numbBgr = background;
  }
  await BoardModel.findOneAndUpdate(
    { owner, isActive: true },
    { isActive: false }
  );

  //шукаємо фонові картинки для дошки  по замовчуванню
  const objFind = {
    serialNumber: numbBgr,
    device: "desktop",
    X: "1x",
  };

  const background_decktop_jpeg_1x = await getUrl(objFind);
  objFind.X = "2x";
  const background_decktop_jpeg_2x = await getUrl(objFind);
  objFind.device = "tablet";
  const background_tablet_jpeg_2x = await getUrl(objFind);
  objFind.X = "1x";
  const background_tablet_jpeg_1x = await getUrl(objFind);
  objFind.device = "mobile";
  const background_mobile_jpeg_1x = await getUrl(objFind);

  objFind.X = "2x";
  const background_mobile_jpeg_2x = await getUrl(objFind);

  const board = await BoardModel.create({
    ...req.body,
    background_decktop_jpeg_1x,
    background_decktop_jpeg_2x,
    background_tablet_jpeg_1x,
    background_tablet_jpeg_2x,
    background_mobile_jpeg_1x,
    background_mobile_jpeg_2x,

    owner: req.user._id,
    isActive: true,
  });
  res.status(201).json(board);
};

export default addBoard;
