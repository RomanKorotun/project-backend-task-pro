import ImageModel from "../../models/CollectImg.js";

const getAllImages = async (req,res)=>{
    const images = await ImageModel.find({
       })
       res.json(images);
}
export default getAllImages;