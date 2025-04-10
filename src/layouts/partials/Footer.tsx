"use client";

import Logo from "@/components/Logo";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import social from "@/config/social.json";
import DynamicIcon from "@/helpers/DynamicIcon";
import { markdownify } from "@/lib/utils/textConverter";
import Link from "next/link";

export interface ISocial {
  name: string;
  icon: string;
  link: string;
}

const Footer = () => {
  const { copyright } = config.params;

  return (
    <footer className="bg-light dark:bg-darkmode-light">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center py-10 md:pt-20 md:pb-14">
          <Logo />

          <ul className="flex gap-x-4 lg:gap-x-10 my-3">
            {menu.footer.map((menu) => (
              <li className="footer-link" key={menu.name}>
                <Link href={menu.url}>{menu.name}</Link>
              </li>
            ))}
          </ul>

          {/* social share */}
          <ul className="social-icons social-icons-footer">
            {social?.main.map((social: ISocial) => (
              <li key={social.name}>
                <a
                  aria-label={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <span className="sr-only">{social.name}</span>
                  <DynamicIcon className="inline-block" icon={social.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-border py-5 dark:border-darkmode-border">
          <div className="flex flex-col md:flex-row gap-y-2 justify-between items-center text-text-light dark:text-darkmode-text-light">
            <ul className="flex gap-x-4">
              {menu.footerCopyright.map((menu) => (
                <li className="footer-link" key={menu.name}>
                  <Link href={menu.url}>{menu.name}</Link>
                </li>
              ))}
            </ul>

            <p
              className="text-sm font-light"
              dangerouslySetInnerHTML={markdownify(copyright)}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
