import multer from "multer";
import path from "path";

// const checkFileType = (file, cb) => {
//   const fileTypes = [
//     ".jpeg",
//     ".jpg",
//     ".JPG",
//     ".JPEG",
//     ".png",
//     ".svg",
//     ".doc",
//     ".pdf",
//     ".mp4",
//     ".PNG",
//   ];
//   const extName = fileTypes.includes(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const mimeType = fileTypes.includes(file.mimetype);

//   if (mimeType && extName) {
//     return cb(null, true);
//   } else {
//     cb("Error: file format not supported");
//   }
// };
const checkFileType = (file, cb) => {
  // Allowed file extensions
  const allowedExtensions = [
    ".jpeg",
    ".jpg",
    ".png",
    ".svg",
    ".doc",
    ".pdf",
    ".mp4",
  ];

  // Check if the file extension is in the allowed list
  const isValidExtension = allowedExtensions.includes(
    path.extname(file.originalname).toLowerCase()
  );

  if (isValidExtension) {
    // If the file extension is valid, allow it
    return cb(null, true);
  } else {
    // If the file extension is not valid, reject it
    cb("Error: file format not supported");
  }
};

const limit = {
  fileSize: 1024 * 1024 * 5, //2Mb
};

// let fileFilter = (req, file, cb) => {
//   let validExtensions = [
//     ".jpeg",
//     ".jpg",
//     ".JPG",
//     ".JPEG",
//     ".png",
//     ".svg",
//     ".doc",
//     ".pdf",
//     ".mp4",
//     ".PNG",
//   ];

//   let originalName = file.originalname;
//   let originalExtension = path.extname(originalName); //note path module is inbuilt module(package) of node js (ie no need to install path package)
//   let isValidExtension = validExtensions.includes(originalExtension);

//   if (isValidExtension) {
//     cb(null, true);
//   } else {
//     cb(new Error("File is not supported"), false);
//   }
// };

export const uploadMultiple = multer({
  storage: multer.memoryStorage(),
  limits: limit,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).array("image", 12);

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: limit,
  fileFilter: async function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");
