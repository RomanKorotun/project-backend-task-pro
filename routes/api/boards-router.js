import express from "express";
import sendPhoto from "../../controllers/boards-controller/sendImage.js";
import upload from "../../middleware/upload.js";
import {isEmptyBody,isValidId} from "../../middleware/index.js";
import {addBoard, getAllBoards,getByIdBoard,updateBoard,removeBoard}from "../../controllers/boards-controller/index.js";
import { validateBody } from "../../decorators/validateBody.js";
import { dashboarUpdateSchema, dashboardAddSchema } from "../../models/Board.js";
import authenticate from "../../middleware/authenticate.js";

const boardsRouter = express.Router();
boardsRouter.use(authenticate);
boardsRouter.get("/",upload.array("images",45), sendPhoto);
boardsRouter.get("/", getAllBoards);
boardsRouter.get("/:id",isValidId, getByIdBoard);
boardsRouter.post("/",isEmptyBody,validateBody(dashboardAddSchema), addBoard);
boardsRouter.put(
    "/:id",
    isValidId,
    isEmptyBody,
    validateBody(dashboarUpdateSchema),
    updateBoard
  );
  boardsRouter.delete("/:id", isValidId, removeBoard);

export default boardsRouter;
