"use client";
import React from "react";
import {
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
  DocumentCurrencyBangladeshiIcon,
  ArrowDownIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import useSession from "@/hooks/useSession";
const menuLinks = [
  {
    name: "Send money",
    href: "/wallet/sendmoney",
    icons: [DocumentCurrencyBangladeshiIcon, ArrowRightIcon],
  },
  {
    name: "Cash out",
    href: "/wallet/cashout",
    icons: [DocumentCurrencyBangladeshiIcon, ArrowRightStartOnRectangleIcon],
  },
  {
    name: "Cash in",
    href: "/wallet/cashin",
    icons: [DocumentCurrencyBangladeshiIcon, ArrowLeftStartOnRectangleIcon],
  },
  {
    name: "Withdraw",
    href: "/wallet/withdraw",
    icons: [DocumentCurrencyBangladeshiIcon, ArrowUpIcon],
  },
  {
    name: "Recharge",
    href: "/wallet/recharge",
    icons: [DocumentCurrencyBangladeshiIcon, ArrowDownIcon],
  },
  {
    name: "Users",
    href: "/wallet/users",
    icons: [UsersIcon],
  },
  {
    name: "Transactions",
    href: "/wallet/transactions",
    icons: [ClipboardDocumentListIcon],
  },
];

const Menu = () => {
  const { user } = useSession();
  const roleBasedMenu = {
    user: ["Send money", "Cash out", "Transactions"],
    agent: ["Cash in", "Withdraw", "Recharge", "Transactions"],
    admin: ["Recharge", "Users", "Transactions"],
  };

  const filteredMenuLinks = menuLinks.filter(({ name }) =>
    roleBasedMenu[user?.role]?.includes(name)
  );
  console.log(filteredMenuLinks);
  return (
    <div className="flex items-center flex-wrap gap-3 ">
      {filteredMenuLinks?.map((link) => (
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
