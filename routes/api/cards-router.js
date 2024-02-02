import express from "express";

import cardsController from "../../controllers/cards-controller/index.js";

import { isEmptyBody, isValidId } from "../../middleware/index.js";

// import validateBody from

const cardsRouter = express.Router();

cardsRouter.get("/", cardsController.getAll);

cardsRouter.post("/", isEmptyBody, cardsController.addOne);

cardsRouter.put("/:id", isValidId, isEmptyBody, cardsController.updateOne);

cardsRouter.delete("/:id", isValidId, cardsController.deleteOne);

export default cardsRouter;
