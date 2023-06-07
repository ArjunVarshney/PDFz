"use client";
import React, { useEffect, useState } from "react";

const Keyboard = ({ className = "", keyClasses = "" }) => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!pressedKeys.includes(event.key)) {
        setPressedKeys((prevKeys: any) => [...prevKeys, event.key]);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setPressedKeys((prevKeys: any[]) =>
        prevKeys.filter((key) => key !== event.key)
      );
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    for (let key of pressedKeys) {
      if (key.match(/[a-zA-Z]/) || key == "/" || key == " ") {
        if (key == "/") key = "slash";
        if (key == " ") key = "space";
        document
          .querySelector(`.${key}`)
          ?.classList.add("!bg-secondary", "scale-90");
        document.querySelector(`.${key}`)?.classList.remove("shadow-md");
        setTimeout(() => {
          document
            .querySelector(`.${key}`)
            ?.classList.remove("!bg-secondary", "scale-90");
          document.querySelector(`.${key}`)?.classList.add("shadow-md");
        }, 200);
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [pressedKeys]);

  return (
    <>
      <div
        className={
          `${className} ` +
          "p-5 border border-solid border-neutral/75 rounded-box bg-base-200"
        }
      >
        <div className="flex justify-center gap-1 my-1 w-full">
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md q"
            }
          >
            q
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md w"
            }
          >
            w
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md e"
            }
          >
            e
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md r"
            }
          >
            r
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md t"
            }
          >
            t
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md y"
            }
          >
            y
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md u"
            }
          >
            u
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md i"
            }
          >
            i
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md o"
            }
          >
            o
          </kbd>
          <kbd
            className={
              `${keyClasses} ` +
              "kbd kbd-lg transition-all shadow-md p bg-primary"
            }
          >
            p
          </kbd>
        </div>
        <div className="flex justify-center gap-1 my-1 w-full">
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md a"
            }
          >
            a
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md s"
            }
          >
            s
          </kbd>
          <kbd
            className={
              `${keyClasses} ` +
              "kbd kbd-lg transition-all shadow-md d bg-primary"
            }
          >
            d
          </kbd>
          <kbd
            className={
              `${keyClasses} ` +
              "kbd kbd-lg transition-all shadow-md f bg-primary"
            }
          >
            f
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md g"
            }
          >
            g
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md h"
            }
          >
            h
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md j"
            }
          >
            j
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md k"
            }
          >
            k
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md l"
            }
          >
            l
          </kbd>
        </div>
        <div className="flex justify-center gap-1 my-1 w-full">
          <kbd
            className={
              `${keyClasses} ` +
              "kbd kbd-lg transition-all shadow-md z bg-primary"
            }
          >
            z
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md x"
            }
          >
            x
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md c"
            }
          >
            c
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md v"
            }
          >
            v
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md b"
            }
          >
            b
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md n"
            }
          >
            n
          </kbd>
          <kbd
            className={
              `${keyClasses} ` + "kbd kbd-lg transition-all shadow-md m"
            }
          >
            m
          </kbd>
          <kbd className="kbd kbd-lg transition-all shadow-md slash">/</kbd>
        </div>
        <div className="flex justify-center gap-1 my-1 w-full">
          <kbd
            className={
              `${keyClasses} ` +
              "kbd kbd-lg transition-all shadow-md space w-[60%]"
            }
          >
            {" "}
          </kbd>
        </div>
      </div>
    </>
  );
};

export default Keyboard;
