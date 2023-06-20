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
              <Link
                href={"https://github.com/ArjunVarshney/PDFz"}
                target="_blank"
                className="btn btn-ghost rounded-btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-icon"
                  style={{
                    width: "22",
                    height: "22",
                    verticalAlign: "middle",
                    fill: "currentColor",
                    overflow: "hidden",
                  }}
                  viewBox="0 0 1024 1024"
                >
                  <path d="m438.4 849.1 222.7-646.7c.2-.5.3-1.1.4-1.6L438.4 849.1z" />
                  <path d="M661.2 168.7h-67.5c-3.4 0-6.5 2.2-7.6 5.4L354.7 846c-.3.8-.4 1.7-.4 2.6 0 4.4 3.6 8 8 8h67.8c3.4 0 6.5-2.2 7.6-5.4l.7-2.1 223.1-648.3 7.4-21.4c.3-.8.4-1.7.4-2.6-.1-4.5-3.6-8.1-8.1-8.1zm293.4 333.4c-.8-1-1.7-1.9-2.7-2.7l-219-171.3c-3.5-2.7-8.5-2.1-11.2 1.4-1.1 1.4-1.7 3.1-1.7 4.9v81.3c0 2.5 1.1 4.8 3.1 6.3l115 90-115 90c-1.9 1.5-3.1 3.8-3.1 6.3v81.3c0 4.4 3.6 8 8 8 1.8 0 3.5-.6 4.9-1.7l219-171.3c6.9-5.4 8.2-15.5 2.7-22.5zm-663.5-174-219 171.3c-1 .8-1.9 1.7-2.7 2.7-5.4 7-4.2 17 2.7 22.5l219 171.3c1.4 1.1 3.1 1.7 4.9 1.7 4.4 0 8-3.6 8-8v-81.3c0-2.5-1.1-4.8-3.1-6.3l-115-90 115-90c1.9-1.5 3.1-3.8 3.1-6.3v-81.3c0-1.8-.6-3.5-1.7-4.9-2.7-3.5-7.7-4.1-11.2-1.4z" />
                </svg>
              </Link>
            </div>
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
