const SkeletonProductGallery = () => {
  return (
    <>
      <section className="md:section-sm">
        <div className="container">
          <div className="row justify-center">
            {/* right side contents  */}
            <div className="col-10 md:col-8 lg:col-6">
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

            {/* left side contents  */}
            <div className="col-10 md:col-8 lg:col-5 md:ml-7 py-6 lg:py-0">
              {Array(8)
                .fill(0)
                .map((_, index) => {
                  return (
                    <div
                      key={index}
                      className="h-20 mb-4 rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700"
                    ></div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-14 xl:pt-28">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      </section>
    </>
  );
};

export default SkeletonProductGallery;
