import multer from "multer";
import path from "path";

let limit = {
  fileSize: 1024 * 1024 * 3, //2Mb
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let staticFolder = "./public";

    cb(null, staticFolder);
  },

  filename: (req, file, cb) => {
    let fileName = Date.now() + file.originalname;
    cb(null, fileName);
  },
});

let fileFilter = (req, file, cb) => {
  let validExtensions = [
    ".jpeg",
    ".jpg",
    ".JPG",
    ".JPEG",
    ".png",
    ".svg",
    ".doc",
    ".pdf",
    ".mp4",
    ".PNG",
  ];

  let originalName = file.originalname;
  let originalExtension = path.extname(originalName); //note path module is inbuilt module(package) of node js (ie no need to install path package)
  let isValidExtension = validExtensions.includes(originalExtension);

  if (isValidExtension) {
    cb(null, true);
  } else {
    cb(new Error("File is not supported"), false);
  }
};

const upload = multer({
  storage: storage, //we define the location in server where the file is store and control the fileName
  fileFilter: fileFilter, //we filter (generally) according to extension
  limit: limit, //we filter file according to its size
});

export default upload;
