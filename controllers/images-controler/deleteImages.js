import ImageModel from "../../models/CollectImg.js";

const deleteImages = async (req, res) => {
  const { id } = req.params;
  if (id) {
    await ImageModel.findByIdAndDelete(id);
    res.status(201).json({ message: `Image id ${id} deleted` });
  } else {
    await ImageModel.deleteMany();
    res.status(201).json({ message: "Images  deleted" });
  }
};

export default deleteImages;
