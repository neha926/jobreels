// Cloudinary Cloud Storage Configuration for Video Reels & Photos
// Section 25 & 26: Storage Architecture (App -> API -> Database, Media -> Object Storage -> CDN)

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || 'demo_key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'demo_secret',
  secure: true
});

/**
 * Upload Video to Cloudinary with automatic HLS compression and thumbnail generation
 * @param {string} filePathOrBase64 - Video stream / buffer / base64
 * @returns {Promise<{ videoUrl: string, thumbnailUrl: string, duration: number }>}
 */
export const uploadReelVideo = async (filePathOrBase64) => {
  try {
    const result = await cloudinary.uploader.upload(filePathOrBase64, {
      resource_type: "video",
      folder: "kaamreels_videos",
      eager: [
        { format: "mp4", transformation: [{ quality: "auto" }, { width: 720, crop: "scale" }] },
        { format: "jpg", transformation: [{ width: 400, crop: "scale" }] } // auto thumbnail
      ],
      eager_async: true
    });

    return {
      success: true,
      videoUrl: result.secure_url,
      thumbnailUrl: result.eager?.[1]?.secure_url || result.secure_url.replace(/\.[^/.]+$/, ".jpg"),
      publicId: result.public_id,
      duration: result.duration
    };
  } catch (error) {
    console.error("Cloudinary Video Upload Error:", error.message);
    throw error;
  }
};

/**
 * Upload Image (Profile Photo / Company Logo / Certificate)
 */
export const uploadImage = async (filePathOrBase64) => {
  try {
    const result = await cloudinary.uploader.upload(filePathOrBase64, {
      resource_type: "image",
      folder: "kaamreels_profiles",
      transformation: [{ width: 500, height: 500, crop: "fill", gravity: "face" }]
    });

    return {
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error("Cloudinary Image Upload Error:", error.message);
    throw error;
  }
};

export default cloudinary;
