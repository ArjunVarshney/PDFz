import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-center pt-5 bg-transparent absolute top-0 left-0">
      <div className="navbar bg-base-100 w-[80%] rounded-box shadow-xl z-10">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          PDFz
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
