import Card from "../../models/Card.js";
import HttpError from "../../helpers/HttpError.js";

const deleteCard = async (req, res) => {
  const { idColumn, id } = req.params;

  const result = await Card.findOneAndDelete({
    _id: id,
    owner: idColumn,
  });
  if (!result) {
    throw HttpError(404, "User not found");
  }

  res.status(201).json({ message: "Card deleted" });
};

export default deleteCard;
