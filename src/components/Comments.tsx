import { KImage as Image } from '@/components/Image';
import Post from '@/components/Post';

const Comments = () => {
  return (
    <div className="">
      <form className="flex items-center justify-between gap-4 p-4">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src="general/avatar.png"
            alt="Lama Dev"
            width={100}
            height={100}
            tr={true}
          />
        </div>
        <input
          type="text"
          className="flex-1 bg-transparent p-2 text-xl outline-none"
          placeholder="Post your reply"
        />
        <button className="rounded-full bg-white px-4 py-2 font-bold text-black">
          Reply
        </button>
      </form>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Comments;
