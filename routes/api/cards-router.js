import express from "express";

import {
  getAllCards,
  getByIdCard,
  addCard,
  updateCard,
  switchCardColumn,
  deleteCard,
} from "../../controllers/cards-controller/index.js";

import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middleware/index.js";
import { validateBody } from "../../decorators/validateBody.js";
import {
  cardAddSchema,
  cardUpdateSchema,
  switchColumnSchema,
} from "../../models/Card.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";

const cardsRouter = express.Router();

cardsRouter.use(authenticate);

cardsRouter.get("/:idColumn", ctrlWrapper(getAllCards));

cardsRouter.get("/:idColumn/:id", isValidId, ctrlWrapper(getByIdCard));

cardsRouter.post(
  "/:idColumn",
  isEmptyBody,
  validateBody(cardAddSchema),
  ctrlWrapper(addCard)
);

cardsRouter.put(
  "/:idColumn/:id",
  isValidId,
  isEmptyBody,
  validateBody(cardUpdateSchema),
  ctrlWrapper(updateCard)
);

cardsRouter.patch(
  "/:idColumn/:id",
  isValidId,
  isEmptyBody,
  validateBody(switchColumnSchema),
  ctrlWrapper(switchCardColumn)
);

cardsRouter.delete("/:idColumn/:id", isValidId, ctrlWrapper(deleteCard));

export default cardsRouter;
