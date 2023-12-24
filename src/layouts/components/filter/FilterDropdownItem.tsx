"use client";

import { SortFilterItem } from "@/lib/constants";
import { createUrl } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ListItem, PathFilterItem } from "../product/ProductLayouts";

function PathFilterItem({ item }: { item: PathFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname === item.path;
  const newParams = new URLSearchParams(searchParams.toString());
  const DynamicTag = active ? "p" : Link;

  newParams.delete("q");

  return (
    <li className="mt-2 flex text-black dark:text-white" key={item.title}>
      <DynamicTag
        href={createUrl(item.path, newParams)}
        className={`w-full text-sm ${
          active ? "bg-green-400" : "hover:underline"
        }`}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

function SortFilterItem({ item }: { item: SortFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const q = searchParams.get("q");

  const newParams = new URLSearchParams(searchParams.toString());

  if (item.slug) {
    newParams.set("sort", item.slug);
  } else {
    newParams.delete("sort");
  }

  const href = createUrl(pathname, newParams);

  const active = searchParams.get("sort") === item.slug;

  const DynamicTag = active ? "p" : Link;

  return (
    <li
      className="flex text-sm text-dark hover:bg-light hover:text-white"
      key={item.title}
    >
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={`w-full pl-4 py-2 ${active ? "bg-dark text-white" : ""}`}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

export function FilterDropdownItem({ item }: { item: ListItem }) {
  return "path" in item ? (
    <PathFilterItem item={item} />
  ) : (
    <SortFilterItem item={item} />
  );
}
