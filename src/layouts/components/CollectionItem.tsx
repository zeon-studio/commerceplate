"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createUrl } from "@/lib/utils";

const CollectionItem = ({
  title,
  path,
  productCount,
}: {
  title: string;
  path: string;
  productCount: any;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());
  const isActive = pathname === path;

  return (
    <li>
      <Link
        href={createUrl(path, newParams)}
        className={`flex items-center justify-between text-light dark:text-darkmode-light ${
          isActive ? "text-dark dark:text-darkmode-light font-semibold" : ""
        }`}
      >
        {title} <span>{productCount > 0 ? `(${productCount})` : ""}</span>
      </Link>
    </li>
  );
};

export default CollectionItem;
