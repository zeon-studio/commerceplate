const SkeletonFeaturedProducts = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array(8)
        .fill(0)
        .map((_, index) => {
          return (
            <div key={index}>
              <div className="h-[150px] md:h-[269px] rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700" />
              <div className="flex flex-col justify-center items-center">
                <div className="mt-4 w-24 h-3 rounded-full animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
                <div className="mt-2 w-16 h-2 rounded-full animate-pulse bg-neutral-200 dark:bg-neutral-700"></div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SkeletonFeaturedProducts;
