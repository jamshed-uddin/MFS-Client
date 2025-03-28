import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href={"/wallet"}
      className="block text-xl font-bold text-blue-600 mb-3 w-fit"
    >
      Transactly
    </Link>
  );
};

export default Logo;
