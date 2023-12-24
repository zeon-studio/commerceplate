import { useEffect } from "react";

const useLoadMore = (
  elementRef: React.RefObject<HTMLElement>,
  callback: () => void,
) => {
  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current;
      if (
        element &&
        element.getBoundingClientRect().bottom <= window.innerHeight
      ) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [elementRef, callback]);
};

export default useLoadMore;
