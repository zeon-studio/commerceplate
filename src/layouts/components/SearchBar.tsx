"use client";
import { createUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCollapse } from "react-collapsed";
import { IoSearch } from "react-icons/io5";
import { TbZoomCancel } from "react-icons/tb";

const SearchBar = ({
  products,
  searchValue,
}: {
  products?: any;
  searchValue?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } =
    useCollapse({
      hasDisabledAnimation: true,
    });

  useEffect(() => {
    const inputField = document.getElementById(
      "searchInputBar",
    ) as HTMLInputElement;
    if (inputField || searchParams.get("q")) {
      inputField.focus();
    }
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".collapse-bar-class") &&
        !target.closest(".search-button-class") &&
        isExpanded
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isExpanded, setExpanded, searchParams]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setExpanded(false);

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("/products", newParams));
  }

  return (
    <div className="flex items-center">
      <button
        className="search-button-class search-icon mr-4 md:mr-6 z-20"
        {...getToggleProps()}
      >
        {isExpanded ? <TbZoomCancel size={20} /> : <IoSearch size={20} />}
      </button>
      <div
        className="collapse-bar-class w-full absolute top-[56px] max-lg:left-0 lg:top-1 lg:w-52 lg:right-[180px]"
        {...getCollapseProps()}
      >
        <div className="container">
          <div className="row">
            <form onSubmit={onSubmit} className="flex justify-center">
              <input
                id="searchInputBar"
                key={searchParams?.get("q")}
                type="search"
                name="search"
                placeholder="Search"
                autoComplete="off"
                defaultValue={searchParams?.get("q") || ""}
                className="w-full rounded-s-md lg:rounded-md bg-light dark:bg-darkmode-light px-3 py-2 text-darkmode-dark dark:text-dark placeholder:text-darkmode-dark dark:placeholder:text-light focus:ring-transparent border-none search-input"
              />
              <button className="lg:hidden rounded-e-md lg:rounded-none px-2 cursor-pointer text-darkmode-dark dark:text-dark bg-light dark:bg-darkmode-light border-none">
                <IoSearch size={25} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
