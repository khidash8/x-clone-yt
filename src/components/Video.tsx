'use client';
import { Video } from '@imagekit/next';

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

type VideoTypes = {
  path: string;
  className?: string;
};

export const IKVideo = ({ path, className }: VideoTypes) => {
  return (
    <Video
      urlEndpoint={urlEndpoint}
      src={path}
      className={className}
      transformation={[
        { width: '1920', height: '1080', quality: 90 },
        // { raw: 'l-text,i-AnxiousApe,fs-100,co-white,l-end' },
      ]}
      controls
    />
  );
};
