"use client";

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { createUrl } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const VariantDropDown = ({ sizeOption }: any) => {
  const [selected, setSelected] = useState("Select One");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSizeChanged = (selected: string) => {
    setSelected(selected);

    const optionSearchParams = new URLSearchParams(searchParams.toString());
    optionSearchParams.set(sizeOption.name.toLowerCase(), selected);
    const newUrl = createUrl(pathname, optionSearchParams);
    router.replace(newUrl, { scroll: false });
  };

  return (
    <div className="w-72">
      <Listbox value={selected} onChange={handleSizeChanged}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-theme-light py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm">
            <span className="block truncate text-light">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                className={`-mr-1 h-5 w-5 text-light transform transition-transform`}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {sizeOption?.values?.map((size: string) => (
                <Listbox.Option
                  key={size}
                  className={({ active }) =>
                    `relative select-none py-2 pl-4 cursor-pointer ${
                      active ? "bg-light text-white" : "text-light"
                    }`
                  }
                  value={size}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {size}
                      </span>
                      {/* {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                          <BsCheckLg className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null} */}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default VariantDropDown;
