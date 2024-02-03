import express from "express";
import { authenticate } from "../../middleware/index.js";
import { isEmptyBody, isValidId } from "../../middleware/index.js";
import { validateBody } from "../../decorators/validateBody.js";
import { columnJoiSchema } from "../../models/Column.js";
import {
  addColumn,
  deleteByIdColumn,
  getAllColumns,
  updateByIdColumn,
} from "../../controllers/columns-controller/index.js";

const columnsRouter = express.Router();

columnsRouter.use(authenticate);

columnsRouter.get("/", getAllColumns);

columnsRouter.post("/", isEmptyBody, validateBody(columnJoiSchema), addColumn);

columnsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(columnJoiSchema),
  updateByIdColumn
);

columnsRouter.delete("/:id", isValidId, deleteByIdColumn);

export default columnsRouter;
