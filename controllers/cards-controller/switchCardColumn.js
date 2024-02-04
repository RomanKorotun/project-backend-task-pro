import Card from "../../models/Card.js";

const switchCardColumn = async (req, res) => {
  const { idColumn, id } = req.params;

  const result = await Card.findOneAndUpdate(
    {
      _id: id,
      owner: idColumn,
    },
    req.body
  );

  res.json(result);
};

export default switchCardColumn;
