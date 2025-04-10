const SkeletonProducts = () => {
  return (
    <section className="pt-14 xl:pt-28">
      <div className="container">
        <div className="row gy-4">
          <div className="col-12 lg:col-3">
            <div className="hidden lg:block h-8 mb-4 rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700" />
            <div className="hidden lg:block h-full rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700" />
          </div>

          <div className="col-12 lg:col-9">
            <div>
              <div className="flex justify-between">
                <div className="h-8 w-2/12 mb-4 rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700" />
                <div className="h-8 w-3/12 mb-4 rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700" />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {Array(9)
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkeletonProducts;
