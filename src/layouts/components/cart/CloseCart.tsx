import { FaXmark } from "react-icons/fa6";

export default function CloseCart({ className }: { className?: string }) {
  return (
    <div className="relative text-black transition-colors dark:border-neutral-700 dark:text-white">
      <FaXmark
        className={`h-6 transition-all ease-in-out hover:scale-110 ${className || ""}`}
      />
    </div>
  );
}
