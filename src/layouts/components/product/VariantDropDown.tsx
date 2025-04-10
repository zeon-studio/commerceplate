"use client";

import { useEffect, useRef, useState } from "react";

const VariantDropDown = ({ sizeOption }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select One");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updateUrl = (param: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(param.toLowerCase(), value);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;

    // Replace the URL without reloading the page
    window.history.replaceState({}, "", newUrl);
  };

  const handleSizeChanged = (value: string) => {
    setSelected(value);
    updateUrl(sizeOption.name, value);
    setIsOpen(false);
  };

  useEffect(() => {
    const setInitialSizeFromUrl = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const sizeParam = searchParams.get(sizeOption.name.toLowerCase());
      if (sizeParam && sizeOption.values.includes(sizeParam)) {
        setSelected(sizeParam);
      }
    };

    setInitialSizeFromUrl();

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sizeOption]);

  return (
    <div className="w-72 relative" ref={dropdownRef}>
      <button
        className="w-full py-2 pl-3 pr-10 text-left bg-light rounded-md cursor-pointer sm:text-sm focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block truncate text-text-light">{selected}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            className={`h-5 w-5 text-text-light transform transition-transform ${isOpen ? "rotate-180" : ""}`}
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
      </button>

      {isOpen && (
        <ul className="absolute z-20 mt-1 max-h-60 w-full bg-white shadow-lg rounded-md overflow-auto ring-1 ring-black/5 focus:outline-none">
          {sizeOption?.values?.map((size: string) => (
            <li
              key={size}
              className="py-2 px-4 cursor-pointer hover:bg-dark/50 hover:text-white text-text-light"
              onClick={() => handleSizeChanged(size)}
            >
              {size}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VariantDropDown;
