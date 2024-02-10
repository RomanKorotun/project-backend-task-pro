import ImageModel from "../../models/CollectImg.js";

const deleteImages = async (req, res)=>{
    const result = await ImageModel.deleteMany();
    res.status(201).json({ message: "Images  deleted" });
}

export default deleteImages;

