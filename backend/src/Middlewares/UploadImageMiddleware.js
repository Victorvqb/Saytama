import path from "path";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const storage = multer.diskStorage({
  destination: (request, file, callback) =>
    callback(null, process.env.DIR_PRODUCT_IMAGES_UPLOAD),
  filename: (request, file, callback) => {
    var temp_file_arr = file.originalname.split(".");

    // var temp_file_name = temp_file_arr[0];

    var temp_file_extension = temp_file_arr[1];

    callback(null, uuidv4().toString() + "." + temp_file_extension);
  },
});

export const UploadImageMiddleware = multer({
  storage: storage,
  limits: "1000000",
  fileFilter: (request, file, callback) => {
    const types = ["image/png", "image/jpg", "image/jpeg"];

    if (types.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
}).single("image");
