import multer from "multer";
import patch from "path";


const destination = patch.resolve("temp");
const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    if (Array.isArray(file) ){
      file.map((elem)=>{
     const newFileName =  elem.file.originalname;
     console.log('newFileName', newFileName)
      cb(null, newFileName);
   })
    } else {
      const newFileName = file.originalname;
      cb(null, newFileName);
 }
   },
});
// const fileFilter = (req, file, cb) => {
//   const extention = file.originalname.split(".").pop();
//   //  console.log('file.originalname', file.originalname)
//   if (extention !== "jpg" && extention !== "png") {
//     cb(
//       HttpError(
//         404,
//         `${extention} no valid extention file (alloved value "jpg" and "png")`
//       )
//     );
//   }
// };

// const limits = {
//   fileSize: 1024 * 1024 * 10,
// };
//const upload = multer({ storage, limits, fileFilter });
const upload = multer({ storage});
export default upload;
