/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidatePath } from 'next/cache';

import { imagekit } from '@/utils';

export const shareAction = async (
  formData: FormData,
  settings: { type: 'original' | 'wide' | 'square'; sensitive: boolean },
) => {
  try {
    const file = formData.get('file') as File;
    const desc = formData.get('desc') as string;

    if (!file || file.size === 0) {
      return { error: 'No file selected' };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const transformation = `w-600${
      settings.type === 'square'
        ? ',ar-1-1'
        : settings.type === 'wide'
          ? ',ar-16-9'
          : ''
    }`;

    // Prepare custom metadata - only include if values are valid
    const customMetadata: Record<string, any> = {
      sensitive: Boolean(settings.sensitive),
    };

    // Only add description if it's not empty
    if (desc && desc.trim().length > 0) {
      customMetadata.description = desc.trim();
    }

    const uploadResult = await new Promise<any>((resolve, reject) => {
      imagekit.upload(
        {
          file: buffer,
          fileName: file.name,
          folder: '/x-clone-lamadev/posts',
          ...(file.type.includes('image') && {
            transformation: {
              pre: transformation,
            },
          }),
          customMetadata,
        },
        function (error, result) {
          if (error) {
            console.error('ImageKit upload error:', error);
            reject(error);
          } else {
            console.log('Upload successful:', result);
            resolve(result);
          }
        },
      );
    });

    revalidatePath('/');

    // Return only serializable data
    return {
      success: true,
      data: {
        fileId: uploadResult.fileId,
        name: uploadResult.name,
        url: uploadResult.url,
        thumbnailUrl: uploadResult.thumbnailUrl,
        filePath: uploadResult.filePath,
        fileType: uploadResult.fileType,
        size: uploadResult.size,
        width: uploadResult.width,
        height: uploadResult.height,
      },
    };
  } catch (error) {
    console.error('Share action error:', error);
    return { error: 'Failed to upload media' };
  }
};
