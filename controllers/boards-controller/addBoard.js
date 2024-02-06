import BoardModel from "../../models/Board.js";

const addBoard =async (req, res) => {
  const {isActive}=req.body;
  const {_id:owner} =req.user;
 
    // в списку дощок маэ бути тільки одна активна дошка, тому шукаємо попередню активну дошку і робимо її неактивною
 
    // if(isActive === true) {
        await BoardModel.findOneAndUpdate(
        {  owner, isActive: true },
        {isActive :false}
      ); 
    //  }
  
    const board = await BoardModel.create({
      ...req.body,
       owner: req.user._id,
       isActive: true,
    });
   res.status(201).json(board);
  };

  export default addBoard;

