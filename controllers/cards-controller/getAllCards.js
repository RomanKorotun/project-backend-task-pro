import Card from "../../models/Card.js";

const getAllCards = async (req, res) => {
  const { idColumn } = req.params;

  const result = await Card.find({ owner: idColumn }).populate("owner", "title");

  res.json(result);
};

export default getAllCards;
