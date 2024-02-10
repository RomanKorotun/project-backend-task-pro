import ImageModel from "../../models/CollectImg.js";

const getImagesParam = async (req,res)=>{
   const  {serialNumber,device,X} = req.params;
   

   const objFind =  {
      serialNumber
   }

   if (device) {
      objFind.device = device;  
   }
   if (X) {
      objFind.X = X;  
   }
   console.log('objFind', objFind)
  const images = await ImageModel.find(objFind);
   res.json(images);
}

export default getImagesParam;