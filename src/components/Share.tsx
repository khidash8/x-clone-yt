'use client';

import React, { useState } from 'react';

import NextImage from 'next/image';

import { shareAction } from '@/actions';
import { KImage as Image } from '@/components/Image';
import ImageEditor from '@/components/ImageEditor';

const Share = () => {
  const [media, setMedia] = useState<File | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [settings, setSettings] = useState<{
    type: 'original' | 'wide' | 'square';
    sensitive: boolean;
  }>({
    type: 'original',
    sensitive: false,
  });

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    const result = await shareAction(formData, settings);

    if (result.error) {
      alert(result.error);
    } else {
      // Reset form
      setMedia(null);
      // Show success message or redirect
    }
  };

  const previewURL = media ? URL.createObjectURL(media) : null;

  return (
    <form className="flex gap-4 p-4" action={handleSubmit}>
      {/* AVATAR */}
      <div className="relative h-10 w-10 overflow-hidden rounded-full">
        <Image
          src="general/avatar.png"
          alt=""
          width={100}
          height={100}
          tr={true}
        />
      </div>
      {/* OTHERS */}
      <div className="flex flex-1 flex-col gap-4">
        <input
          type="text"
          name="desc"
          placeholder="What is happening?!"
          className="bg-transparent text-xl outline-none placeholder:text-textGray"
        />
        {/* PREVIEW IMAGE */}
        {media?.type.includes('image') && previewURL && (
          <div className="relative overflow-hidden rounded-xl">
            <NextImage
              src={previewURL}
              alt=""
              width={600}
              height={600}
              className={`w-full ${
                settings.type === 'original'
                  ? 'h-full object-contain'
                  : settings.type === 'square'
                    ? 'aspect-square object-cover'
                    : 'aspect-video object-cover'
              }`}
            />
            <div
              className="absolute left-2 top-2 cursor-pointer rounded-full bg-black bg-opacity-50 px-4 py-1 text-sm font-bold text-white"
              onClick={() => setIsEditorOpen(true)}
            >
              Edit
            </div>
            <div
              className="absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-50 text-sm font-bold text-white"
              onClick={() => setMedia(null)}
            >
              X
            </div>
          </div>
        )}
        {media?.type.includes('video') && previewURL && (
          <div className="relative">
            <video src={previewURL} controls />
            <div
              className="absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-50 text-sm font-bold text-white"
              onClick={() => setMedia(null)}
            >
              X
            </div>
          </div>
        )}
        {isEditorOpen && previewURL && (
          <ImageEditor
            onClose={() => setIsEditorOpen(false)}
            previewURL={previewURL}
            settings={settings}
            setSettings={setSettings}
          />
        )}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4">
            <input
              type="file"
              name="file"
              onChange={handleMediaChange}
              className="hidden"
              id="file"
              accept="image/*,video/*"
            />
            <label htmlFor="file">
              <Image
                src="icons/image.svg"
                alt=""
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </label>
            <Image
              src="icons/gif.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <Image
              src="icons/poll.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <Image
              src="icons/emoji.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <Image
              src="icons/schedule.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <Image
              src="icons/location.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </div>
          <button className="rounded-full bg-white px-4 py-2 font-bold text-black">
            Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default Share;
