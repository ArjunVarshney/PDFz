"use client";
import React, { useEffect } from "react";
import { themes } from "@/constants/themes";

const ThemeDropDown = () => {
  const changeTheme = (theme: string) => {
    const html = document.querySelector("html");
    html?.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    const theme = window.localStorage.getItem("theme");
    if (!theme) {
      window.localStorage.setItem("theme", "dark");
    } else {
      changeTheme(theme);
    }
  }, []);

  return (
    <div
      tabIndex={0}
      className="dropdown-content bg-base-200 text-base-content rounded-box top-px h-[70vh] max-h-96 w-56 overflow-y-auto shadow mt-16"
    >
      <div className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
        {themes.map((theme, index) => {
          return (
            <button
              key={index}
              className="outline-base-content overflow-hidden rounded-lg text-left"
              onClick={() => changeTheme(theme)}
            >
              <div
                data-theme={theme}
                className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
              >
                <div className="grid grid-cols-5 grid-rows-3">
                  <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="invisible h-3 w-3 shrink-0"
                    >
                      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                    </svg>{" "}
                    <div className="flex-grow text-sm">{theme}</div>{" "}
                    <div className="flex h-full flex-shrink-0 flex-wrap gap-1">
                      <div className="bg-primary w-2 rounded"></div>{" "}
                      <div className="bg-secondary w-2 rounded"></div>{" "}
                      <div className="bg-accent w-2 rounded"></div>{" "}
                      <div className="bg-neutral w-2 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeDropDown;
