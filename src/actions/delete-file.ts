'use server';

import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});


export async function deleteFile(publicId: string, resourceType: 'image' | 'video' | 'raw') {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType
    });
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw new Error('Failed to delete file from Cloudinary');
  }
}
