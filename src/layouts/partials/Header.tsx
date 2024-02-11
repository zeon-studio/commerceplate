"use client";

import Logo from "@/components/Logo";
import NavUser from "@/components/NavUser";
import SearchBar from "@/components/SearchBar";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

interface IChildNavigationLink {
  name: string;
  url: string;
}

interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}

const isMenuItemActive = (menu: INavigationLink, pathname: string) => {
  return (pathname === `${menu.url}/` || pathname === menu.url) && "nav-active";
};

const renderMenuItem = (
  menu: INavigationLink,
  pathname: string,
  handleToggleChildMenu: () => void,
  showChildMenu: boolean,
) => {
  return menu.hasChildren ? (
    <li className="nav-item nav-dropdown group relative" key={menu.name}>
      <span
        className={`nav-link inline-flex items-center ${
          (menu.children?.map(({ url }) => url).includes(pathname) ||
            menu.children?.map(({ url }) => `${url}/`).includes(pathname)) &&
          "active"
        }`}
        onClick={handleToggleChildMenu}
      >
        {menu.name}
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </span>
      <ul
        className={`nav-dropdown-list ${showChildMenu ? "visible" : "hidden"}`}
      >
        {menu.children?.map((child, i) => (
          <li className="nav-dropdown-item" key={`children-${i}`}>
            <Link
              href={child.url}
              className={`nav-dropdown-link ${isMenuItemActive(child, pathname)}`}
            >
              {child.name}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  ) : (
    <li className="nav-item" key={menu.name}>
      <Link
        href={menu.url}
        className={`nav-link block ${isMenuItemActive(menu, pathname)}`}
      >
        {menu.name}
      </Link>
    </li>
  );
};

const Header: React.FC<{ children: any }> = ({ children }) => {
  const [navbarShadow, setNavbarShadow] = useState(false);
  const { main }: { main: INavigationLink[] } = menu;
  const { navigation_button, settings } = config;
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showChildMenu, setShowChildMenu] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
    setShowSidebar(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarShadow(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setShowChildMenu(false);
  };

  const handleToggleChildMenu = () => {
    setShowChildMenu(!showChildMenu);
  };

  return (
    <header
      className={`header z-30 ${settings.sticky_header && "sticky top-0"} ${navbarShadow ? "shadow-sm" : "shadow-none"}`}
    >
      <nav className="navbar flex-wrap container">
        <div className="order-1 flex items-center justify-between space-x-7 lg:space-x-14">
          <Logo />

          <div className="relative z-40 hidden md:block">
            <label
              htmlFor="nav-toggle"
              className="order-3 cursor-pointer flex items-center text-dark dark:text-white lg:order-1"
            >
              <span className="mr-2 font-medium">Pages</span>
              <button
                id="nav-toggle"
                className="focus:outline-none"
                onClick={handleToggleSidebar}
              >
                {showSidebar ? (
                  <svg className="h-3 fill-current block" viewBox="0 0 20 20">
                    <title>Menu Close</title>
                    <polygon
                      points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                      transform="rotate(45 10 10)"
                    ></polygon>
                  </svg>
                ) : (
                  <svg className="h-3 fill-current block" viewBox="0 0 20 20">
                    <title>Menu Open</title>
                    <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
                  </svg>
                )}
              </button>
            </label>

            <div
              className={`fixed top-0 left-0 h-full bg-black opacity-50 w-full ${showSidebar ? "block" : "hidden"}`}
              onClick={handleToggleSidebar}
            ></div>

            <div
              className={`fixed top-0 left-0 h-full bg-white dark:bg-darkmode-body overflow-y-auto w-full md:w-96 p-9 ${showSidebar ? "transition-transform transform translate-x-0" : "transition-transform transform -translate-x-full"}`}
            >
              <div className="flex justify-between items-center mb-14">
                <Logo />

                <button onClick={handleToggleSidebar} className="p-2">
                  <svg className="h-5 fill-current block" viewBox="0 0 20 20">
                    <title>Menu Close</title>
                    <polygon
                      points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                      transform="rotate(45 10 10)"
                    ></polygon>
                  </svg>
                </button>
              </div>
              <ul>
                {main.map((menu, i) => (
                  <React.Fragment key={`menu-${i}`}>
                    {renderMenuItem(
                      menu,
                      pathname,
                      handleToggleChildMenu,
                      showChildMenu,
                    )}
                  </React.Fragment>
                ))}
                {navigation_button.enable && (
                  <li className="mt-4 inline-block lg:hidden mr-4 md:mr-6">
                    <Link
                      className="btn btn-outline-primary btn-sm"
                      href={navigation_button.link}
                    >
                      {navigation_button.label}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="max-lg:mt-4 w-full lg:w-[45%] xl:w-[60%] lg:order-2 order-3">
          {settings.search && <SearchBar />}
        </div>

        <div className="order-2 lg:order-3 ml-auto flex items-center lg:ml-0">
          <ThemeSwitcher className="mr-4 md:mr-6" />
          <Suspense fallback={children[0]}>{children[1]}</Suspense>

          {settings.account && (
            <div className="ml-4 md:ml-6">
              <NavUser />
            </div>
          )}

          <div className="relative z-40 block md:hidden ml-6">
            <label
              htmlFor="nav-toggle"
              className="cursor-pointer flex items-center text-dark dark:text-white border dark:border-light p-1 rounded-md"
            >
              <button
                id="nav-toggle"
                className="focus:outline-none"
                onClick={handleToggleSidebar}
              >
                {showSidebar ? (
                  <svg className="h-5 fill-current block" viewBox="0 0 20 20">
                    <title>Menu Close</title>
                    <polygon
                      points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                      transform="rotate(45 10 10)"
                    ></polygon>
                  </svg>
                ) : (
                  <svg className="h-5 fill-current block" viewBox="0 0 20 20">
                    <title>Menu Open</title>
                    <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
                  </svg>
                )}
              </button>
            </label>

            <div
              className={`fixed top-0 left-0 h-full bg-black opacity-50 w-full ${showSidebar ? "block" : "hidden"}`}
              onClick={handleToggleSidebar}
            ></div>

            <div
              className={`fixed top-0 left-0 h-full bg-white dark:bg-darkmode-body overflow-y-auto w-full md:w-96 p-9 ${showSidebar ? "transition-transform transform translate-x-0" : "transition-transform transform -translate-x-full"}`}
            >
              <div className="flex justify-between items-center mb-14">
                <Logo />

                <button onClick={handleToggleSidebar} className="p-2">
                  <svg className="h-5 fill-current block" viewBox="0 0 20 20">
                    <title>Menu Close</title>
                    <polygon
                      points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                      transform="rotate(45 10 10)"
                    ></polygon>
                  </svg>
                </button>
              </div>
              <ul>
                {main.map((menu, i) => (
                  <React.Fragment key={`menu-${i}`}>
                    {renderMenuItem(
                      menu,
                      pathname,
                      handleToggleChildMenu,
                      showChildMenu,
                    )}
                  </React.Fragment>
                ))}
                {navigation_button.enable && (
                  <li className="mt-4 inline-block lg:hidden mr-4 md:mr-6">
                    <Link
                      className="btn btn-outline-primary btn-sm"
                      href={navigation_button.link}
                    >
                      {navigation_button.label}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* <div className="flex-1 mt-4 mx-4 block lg:hidden">
        {settings.search && <SearchBar />}
      </div> */}
    </header>
  );
};

export default Header;
