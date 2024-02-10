import { HttpError } from "../helpers/index.js";

const deviceList = ["desktop", "mobile","tablet"];
const xList =["1x","2x"]
const isValidParamImg = (req,res,next)=>{
  const  {device,X}=req.params;
  console.log('x:', X)
  console.log('device', device)

   const devOk = deviceList.some((el)=>el = device);
   console.log('devOk', devOk)
   const xOk = xList.some((el)=>el = X);
   if (!devOk || !xOk ){
  return next(HttpError(400,`No valid device: ${device} or x:${X}`) ); 
   }
   next();
}
export default isValidParamImg;