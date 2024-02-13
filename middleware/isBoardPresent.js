import HttpError from "../helpers/HttpError.js";
import BoardModel from "../models/Board.js";

const isBoardPresent = async(req,res,next)=>{
    const { idBoard } = req.params;
   
      const board = await BoardModel.findById(idBoard);
  
       if(!board) {
  
       return next(HttpError(400, "missing board "));
       }
    next();
}
export default isBoardPresent;