import Card from "../../models/Card.js";

const getByIdCard = async (req, res) => {
  const { idColumn, id } = req.params;

  const result = await Card.findOne({
    _id: id,
    owner: idColumn,
  });

  res.json(result);
};

export default getByIdCard;
