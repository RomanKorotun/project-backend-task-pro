import express from "express";
import {isEmptyBody,isValidId} from "../../middleware/index.js";
import {addBoard, getAllBoards,getByIdBoard,updateBoard,removeBoard,updateBoardActive, updateBackground}from "../../controllers/boards-controller/index.js";
import { validateBody } from "../../decorators/validateBody.js";
import { dashboarUpdateSchema, dashboardAddSchema,dashboardUpdateActivSchema, dashboardUpdateBackgroundSchema} from "../../models/Board.js";
import authenticate from "../../middleware/authenticate.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const boardsRouter = express.Router();
boardsRouter.use(authenticate);
boardsRouter.get("/", ctrlWrapper(getAllBoards));
boardsRouter.get("/:id",isValidId, ctrlWrapper(getByIdBoard));

boardsRouter.post("/",isEmptyBody,validateBody(dashboardAddSchema), ctrlWrapper(addBoard));
boardsRouter.patch(
  "/active/:id",
  isValidId,
  validateBody(dashboardUpdateActivSchema, "missing field active"),
  updateBoardActive
);

boardsRouter.put(
    "/:id",
    isValidId,
    isEmptyBody,
    validateBody(dashboarUpdateSchema),
    ctrlWrapper(updateBoard)
  );
  boardsRouter.patch(
    "/background/:id",
    isValidId,
    isEmptyBody,
    validateBody(dashboardUpdateBackgroundSchema),
    ctrlWrapper(updateBackground)
  );


  boardsRouter.delete("/:id", isValidId, ctrlWrapper(removeBoard));

export default boardsRouter;
