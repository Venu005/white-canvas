import Image from "next/image";

const EmptySearch = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="./search.svg" alt="search-img" height={300} width={300} />

      <h2 className="text-2xl font-semibold mt-6">No results found 😿</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try searching something else.
      </p>
    </div>
  );
};

export default EmptySearch;
