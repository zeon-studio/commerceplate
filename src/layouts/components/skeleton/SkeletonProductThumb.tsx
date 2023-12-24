import React from "react";

const SkeletonProductThumb = () => {
  return (
    <div className="row justify-center">
      <div>
        <div className="h-[323px] md:h-[623px] rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700 mb-4"></div>
        <div className="grid grid-cols-4 gap-x-4">
          {Array(4)
            .fill(0)
            .map((_, index) => {
              return (
                <div
                  key={index}
                  className="h-[80px] md:h-[146px] rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700"
                ></div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductThumb;
