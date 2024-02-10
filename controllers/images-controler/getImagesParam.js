import ImageModel from "../../models/CollectImg.js";

const getImagesParam = async (req,res)=>{
   const  {device,X} = req.params;
   
  const images = await ImageModel.find({
    device,X
   })
   res.json(images);
}

export default getImagesParam;