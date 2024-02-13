import Card from "../../models/Card.js";

const addCard = async (req, res) => {
  const { idColumn } = req.params;
  const { priority = "without", deadline = "No deadline" } = req.body;

  const result = await Card.create({
    ...req.body,
     priority,
    deadline,
    owner: idColumn,
  });

  res.status(201).json(result);
};

export default addCard;
