import Image from "next/image";

const EmptyFav = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="./fav.svg" alt="search-img" height={300} width={300} />

      <h2 className="text-2xl font-semibold mt-6">Add a favorite</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Go on, add a favorite board!!
      </p>
    </div>
  );
};

export default EmptyFav;
