import { KImage as Image } from '@/components/Image';

const PostInfo = () => {
  return (
    <div className="relative h-4 w-4 cursor-pointer">
      <Image src="icons/infoMore.svg" alt="" width={16} height={16} />
    </div>
  );
};

export default PostInfo;
