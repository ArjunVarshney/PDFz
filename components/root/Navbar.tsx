import Link from "next/link";
import React from "react";
import ThemeDropDown from "./ThemeDropDown";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-center pt-5 bg-transparent absolute top-0 left-0">
      <div className="navbar bg-base-100 w-[95%] sm:w-[85%] md:w-[95%] xl:w-[80%] rounded-box shadow-xl z-10">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            PDFz
          </Link>
        </div>
        <div className="flex justify-end flex-1 px-2">
          <div className="flex items-stretch">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost rounded-btn">
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  ></path>
                </svg>
                <span className="hidden sm:inline-block font-normal">
                  Theme
                </span>
                <svg
                  width="12px"
                  height="12px"
                  className="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 2048 2048"
                >
                  <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
              </label>
              <ThemeDropDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
