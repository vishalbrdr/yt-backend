import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded
    fs.unlinkSync(localFilePath); //remove locally saved temp file as the upload operation failed
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove locally saved temp file as the upload operation failed
    return null;
  }
};

const deleteFromCloudinary = async (oldImageUrl) => {
  try {
    if (!oldImageUrl) {
    }
    const match = oldImageUrl.match(/\/([^\/]+)\.([a-zA-Z0-9]+)$/);
    const imageName = match ? match[1] : null;
    const response = await cloudinary.uploader.destroy(imageName);
    return response;
  } catch (error) {
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
