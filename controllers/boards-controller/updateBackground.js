import  HttpError  from "../../helpers/HttpError.js";
import {getObjBgrImg} from "../../helpers/index.js";
import BoardModel from "../../models/Board.js";


const updateBackground = async (req,res) =>{
    const { background}= req.body;
    const { id } = req.params;
    const { _id: owner } = req.user;
//шукаємо фонові картинки для дошки  по замовчуванню
let numbBgr = 1;
  if (background) {
    numbBgr = Number(background);
  }

//отримуємо обєкт картинок в залежності від номеру списку що приходить з фронта
const backgroundObj = await getObjBgrImg(numbBgr); 
    const board = await BoardModel.findOneAndUpdate(
        { _id: id, owner },
        {...req.body,
         ...backgroundObj,
        }
      );
      if (!board) {
        throw HttpError(404, ` Board with id = ${id} not found`);
      }
      res.status(201).json(board);
}
export default updateBackground;