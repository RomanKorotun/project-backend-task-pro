import express from "express";

import cardsController from "../../controllers/cards-controller/index.js";

import { isEmptyBody, isValidId } from "../../middleware/index.js";
import { validateBody } from "../../decorators/validateBody.js";
import { cardAddSchema, cardUpdateSchema } from "../../models/Card.js";

const cardsRouter = express.Router();

cardsRouter.get("/", cardsController.getAll);

cardsRouter.post(
  "/",
  isEmptyBody,
  validateBody(cardAddSchema),
  cardsController.addOne
);

cardsRouter.put(
  "/:id",
  isValidId,
  validateBody(cardUpdateSchema),
  isEmptyBody,
  cardsController.updateOne
);

cardsRouter.delete("/:id", isValidId, cardsController.deleteOne);

export default cardsRouter;
