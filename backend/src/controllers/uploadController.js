import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { fireBaseAuth, fireBaseUser } from "../config/config.js";
import sharp from "sharp";

import { signInWithEmailAndPassword } from "firebase/auth";
import { app, auth } from "../config/firebaseConfig.js";
import { upload } from "../middleware/multer.js";

let uploadImage = async (file, quantity) => {
  const storageFB = getStorage(app);

  await signInWithEmailAndPassword(auth, fireBaseUser, fireBaseAuth);

  if (quantity === "single") {
    const dateTime = Date.now();
    const fileName = `images/${dateTime}`;
    const storageRef = ref(storageFB, fileName);
    const metadata = {};
    await uploadBytesResumable(storageRef, file.buffer, metadata);
    return fileName;
  }

  if (quantity == "multiple") {
    for (let i = 0; i < file.images.length; i++) {
      const dateTime = Date.now();
      const fileName = `images/${dateTime}`;
      const storageRef = ref(storageFB, fileName);
      const metadata = {};
      const saveImage = await Image.create({ imageUrl: fileName });
      file.item.imageId.push({ _id: saveImage._id });
      await file.item.save();

      await uploadBytesResumable(storageRef, file.images[i].buffer, metadata);
    }
    return;
  }
};

export let createUpload = async (req, res) => {
  console.log("*******************");
  console.log(req.file);
  const file = {
    type: req.file,
    buffer: req.file.buffer,
  };
  console.log(file);
  try {
    const buildImage = await uploadImage(file, "single");
    res.json({
      status: "success",
      imageName: buildImage,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// Resize the uploaded image before saving
export const uploadAndResize = async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Error uploading file", error: err });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Resize the image using sharp
      const resizedBuffer = await sharp(req.file.buffer)
        .resize({ width: 800 }) // Set desired width
        .toBuffer();

      // Update the file buffer with the resized image
      req.file.buffer = resizedBuffer;

      // Call next middleware to proceed with file upload
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};
