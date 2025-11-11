import { KImage as Image } from '@/components/Image';

const Search = () => {
  return (
    <div className="flex items-center gap-4 rounded-full bg-inputGray px-4 py-2">
      <Image src="icons/explore.svg" alt="search" width={16} height={16} />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none placeholder:text-textGray"
      />
    </div>
  );
};

export default Search;
