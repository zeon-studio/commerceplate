"use client";

import { getUserDetails } from "@/lib/shopify";
import { user } from "@/lib/shopify/types";
import { Listbox, Transition } from "@headlessui/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import Gravatar from "react-gravatar";
import { BsPerson } from "react-icons/bs";

export const fetchUser = async () => {
  try {
    const accessToken = Cookies.get("token");
    if (!accessToken) {
      return null;
    } else {
      const userDetails: user = await getUserDetails(accessToken);
      const userInfo = userDetails.customer;
      return userInfo;
    }
  } catch (error) {
    // console.log("Error fetching user details:", error);
    return null;
  }
};

const NavUser = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const getUser = async () => {
      const userInfo = await fetchUser();
      setUser(userInfo);
    };
    getUser();
  }, [pathname]);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <Listbox onChange={handleLogout}>
        <div className="relative">
          {user ? (
            <Listbox.Button className="relative cursor-pointer text-left sm:text-xs flex items-center justify-center">
              <div className="flex items-center gap-x-1">
                <div className="h-6 w-6 border border-darkmode-border dark:border-border rounded-full">
                  <Gravatar
                    email={user?.email}
                    style={{ borderRadius: "50px" }}
                  />
                </div>

                <div className="leading-none max-md:hidden">
                  <div className="flex items-center">
                    <p className="block text-dark dark:text-darkmode-dark text-base truncate">
                      {user?.firstName}
                    </p>
                    <svg
                      className={`w-5 text-dark dark:text-darkmode-dark dark:hover:text-darkmode-primary`}
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
                  </div>
                  {/* <p className="text-[8px]">Orders & Account</p> */}
                </div>
              </div>
            </Listbox.Button>
          ) : (
            <Link
              className="text-xl text-dark hover:text-primary dark:border-darkmode-border dark:text-white flex items-center"
              href="/login"
              aria-label="login"
            >
              <BsPerson className="dark:hover:text-darkmode-primary" />
            </Link>
          )}

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-20 text-center absolute w-full md:overflow-hidden">
              <Listbox.Option value={"Logout"}>
                <button className="btn btn-primary max-md:btn-sm mt-2">
                  Logout
                </button>
              </Listbox.Option>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
};

export default NavUser;
