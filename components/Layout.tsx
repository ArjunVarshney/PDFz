import React from "react";

type layoutProps = {
  children: React.ReactNode;
  className?: string;
};

const Layout = ({ children, className = "" }: layoutProps) => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div
        className={
          `${className} ` +
          "hero-content max-w-none text-left w-[95%] sm:w-[85%] md:w-full lg:w-[95%] xl:w-[80%] justify-around"
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
