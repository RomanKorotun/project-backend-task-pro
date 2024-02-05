import express from "express";
import { authenticate } from "../../middleware/index.js";
import { isEmptyBody, isValidId } from "../../middleware/index.js";
import { validateBody } from "../../decorators/validateBody.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import { columnJoiSchema } from "../../models/Column.js";
import {
  addColumn,
  deleteByIdColumn,
  getAllColumns,
  updateByIdColumn,
} from "../../controllers/columns-controller/index.js";

const columnsRouter = express.Router();

columnsRouter.use(authenticate);

columnsRouter.get("/:idBoard", ctrlWrapper(getAllColumns));

columnsRouter.post(
  "/:idBoard",
  isEmptyBody,
  validateBody(columnJoiSchema),
  ctrlWrapper(addColumn)
);

columnsRouter.patch(
  "/:idBoard/:id",
  isValidId,
  isEmptyBody,
  validateBody(columnJoiSchema),
  ctrlWrapper(updateByIdColumn)
);

columnsRouter.delete("/:idBoard/:id", isValidId, ctrlWrapper(deleteByIdColumn));

export default columnsRouter;
