import express from "express";

import { authenticate, isEmptyBody, isValidId, isBoardPresent } from "../../middleware/index.js";
import { validateBody } from "../../decorators/validateBody.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import { columnJoiSchema } from "../../models/Column.js";
import {
  addColumn,
  deleteByIdColumn,
  getAllColumns,
  getByIdColumn,
  updateByIdColumn,
} from "../../controllers/columns-controller/index.js";

const columnsRouter = express.Router();

columnsRouter.use(authenticate);

columnsRouter.get("/:idBoard",isValidId,isBoardPresent, ctrlWrapper(getAllColumns));

columnsRouter.get("/:idBoard/:id", isValidId,isBoardPresent, ctrlWrapper(getByIdColumn));

columnsRouter.post(
  "/:idBoard",
   isValidId,
  isEmptyBody,
  isBoardPresent,
  validateBody(columnJoiSchema),
  ctrlWrapper(addColumn)
);

columnsRouter.patch(
  "/:idBoard/:id",
  isValidId,
  isEmptyBody,
  isBoardPresent,
  validateBody(columnJoiSchema),
  ctrlWrapper(updateByIdColumn)
);

columnsRouter.delete("/:idBoard/:id", isValidId, ctrlWrapper(deleteByIdColumn));

export default columnsRouter;
