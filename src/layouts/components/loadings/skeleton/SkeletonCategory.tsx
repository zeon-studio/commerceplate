const SkeletonCategory = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6">
      {Array(3)
        .fill(0)
        .map((_, index) => {
          return (
            <div
              key={index}
              className="h-[150px] md:h-[250px] lg:h-[306px] rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700"
            />
          );
        })}
    </div>
  );
};

export default SkeletonCategory;
