import  HttpError  from "../../helpers/HttpError.js";
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

const updateBackground = async (req,res) =>{
    const { background}= req.body;
    const { id } = req.params;
    const { _id: owner } = req.user;



//шукаємо фонові картинки для дошки  по замовчуванню
const objFind = {
    serialNumber: background,
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


    const board = await BoardModel.findOneAndUpdate(
        { _id: id, owner },
        {...req.body,
            background_decktop_jpeg_1x,
            background_decktop_jpeg_2x,
            background_tablet_jpeg_2x,
            background_tablet_jpeg_1x,
            background_mobile_jpeg_1x
        
        }
      );
      if (!board) {
        throw HttpError(404, ` Board with id = ${id} not found`);
      }
      res.status(201).json(board);
}
export default updateBackground;