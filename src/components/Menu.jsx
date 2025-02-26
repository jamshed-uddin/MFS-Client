import React from "react";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
  DocumentCurrencyBangladeshiIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
const menuLinks = [
  {
    name: "Send money",
    href: "/wallet/sendmoney",
    icons: [DocumentCurrencyBangladeshiIcon, ArrowRightIcon],
    access: "user",
  },
  {
    name: "Cash out",
    href: "/wallet/cashout",
    icons: [DocumentCurrencyBangladeshiIcon, ArrowRightStartOnRectangleIcon],
    access: "user",
  },
  {
    name: "Cash in",
    href: "/wallet/cashin",
    icons: [DocumentCurrencyBangladeshiIcon, ArrowLeftStartOnRectangleIcon],
    access: "user",
  },
  {
    name: "Withdraw",
    href: "/wallet/withdraw",
    icons: [DocumentCurrencyBangladeshiIcon, ArrowUpIcon],
    access: "user",
  },
  {
    name: "Recharge",
    href: "/wallet/recharge",
    icons: [DocumentCurrencyBangladeshiIcon, ArrowDownIcon],
    access: "user",
  },
];

const Menu = () => {
  return (
    <div className="flex items-center flex-wrap gap-3 ">
      {menuLinks.map((link) => (
        <Link
          href={link.href}
          key={link.name}
          className="border border-blue-500 p-2 rounded-xl"
        >
          <span className="flex items-end ">
            {link.icons.map((icon, index) => {
              const LinkIcon = icon;

              return (
                <LinkIcon
                  className={`${index === 0 ? "w-6" : "w-4"} text-blue-500 `}
                  key={index}
                />
              );
            })}
          </span>
          <span className="text-sm font-medium">{link.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Menu;
