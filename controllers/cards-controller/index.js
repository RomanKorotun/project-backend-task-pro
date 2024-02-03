import Card from "../../models/Card.js";
import HttpError from "../../helpers/HttpError.js";

const getAll = async (req, res) => {
  //   const { _id: owner } = req.column;
  //   const result = await Card.find({ owner });
  const result = await Card.find();

  res.json(result);
};

const addOne = async (req, res) => {
  //   const { _id: owner } = req.column;
  const { priority = "without", deadline = "No deadline" } = req.body;
  const result = await Card.create({
    ...req.body,
    priority,
    deadline,
    // owner,
  });

  res.status(201).json(result);
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  //   const { _id: owner } = req.column;
  const result = await Card.findOneAndUpdate({ _id: id }, req.body);

  res.json(result);
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  //   const { _id: owner } = req.column;
  const result = await Card.findByIdAndDelete({ _id: id });
  if (!result) {
    throw HttpError(404);
  }
  res.status(204).json({ message: "Card deleted" });
};

export default { getAll, addOne, updateOne, deleteOne };
