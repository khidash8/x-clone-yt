'use client';
import { Image } from '@imagekit/next';

type ImageType = {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  className?: string;
  tr?: boolean;
};

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

if (!urlEndpoint) {
  throw new Error('Error: Please add urlEndpoint to .env or .env.local');
}

const KImage = ({ src, height, width, alt, className, tr }: ImageType) => {
  return (
    <Image
      urlEndpoint={urlEndpoint}
      src={src}
      width={width}
      height={height}
      {...(tr && {
        transformation: [{ width: `${width}`, height: `${height}` }],
      })}
      alt={alt}
      className={className}
    />
  );
};

export { KImage };
