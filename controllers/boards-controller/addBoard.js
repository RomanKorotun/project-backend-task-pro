import BoardModel from "../../models/Board.js";

const addBoard =async (req, res) => {
  console.log('req.user', req.user)
    const board = await BoardModel.create({
      ...req.body,
       owner: req.user._id, 
    });
   res.status(201).json(board);
  };

  export default addBoard;

