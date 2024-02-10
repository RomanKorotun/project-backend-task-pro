import ImageModel from "../models/CollectImg.js";

const getUrl = async (objFind) => {
  const array = await ImageModel.find(objFind);

  if (array.length > 0) {
    return array[0].imgUrl;
  } else {
    return "";
  }
};

const getObjBgrImg = async (numbBgr) => {
  const objFind = {
    serialNumber: numbBgr,
    device: "desktop",
    X: "1x",
  };
  const background_decktop_jpeg_1x = await getUrl(objFind);
  objFind.X = "2x";
  const background_decktop_jpeg_2x = await getUrl(objFind);
  objFind.device = "tablet";
  const background_tablet_jpeg_2x = await getUrl(objFind);
  objFind.X = "1x";
  const background_tablet_jpeg_1x = await getUrl(objFind);
  objFind.device = "mobile";
  const background_mobile_jpeg_1x = await getUrl(objFind);
  objFind.X = "2x";
  const background_mobile_jpeg_2x = await getUrl(objFind);
  const obj = {
    background_decktop_jpeg_1x,
    background_decktop_jpeg_2x,
    background_tablet_jpeg_1x,
    background_tablet_jpeg_2x,
    background_mobile_jpeg_1x,
    background_mobile_jpeg_2x,
  };

  return obj;
};

export default getObjBgrImg;
