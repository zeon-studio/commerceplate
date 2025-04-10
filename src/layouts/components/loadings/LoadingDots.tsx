import React from "react";

const dots = "mx-[1px] inline-block h-1 w-1 animate-blink rounded-md";

const LoadingDots = ({ className }: { className: string }) => {
  return (
    <span className="inline-flex items-center">
      <span className={`${dots} ${className}`} />
      <span className={`${dots} animation-delay-[200ms] ${className}`} />
      <span className={`${dots} animation-delay-[400ms] ${className}`} />
    </span>
  );
};

export default LoadingDots;
