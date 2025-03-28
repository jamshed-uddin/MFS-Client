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
  MagnifyingGlassIcon,
  UserIcon,
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
    name: "Agents",
    href: "/wallet/users?role=agent",
    icons: [UserIcon, DocumentCurrencyBangladeshiIcon],
  },
  {
    name: "Pending agents",
    href: "/wallet/users?role=agent&status=pending",
    icons: [UserIcon, DocumentCurrencyBangladeshiIcon, MagnifyingGlassIcon],
  },
  {
    name: "Transactions",
    href: "/wallet/transactions",
    icons: [ClipboardDocumentListIcon],
  },
  {
    name: "Withdraw requests",
    href: "/wallet/transactions?type=withdrawal&status=pending",
    icons: [DocumentCurrencyBangladeshiIcon, ArrowUpIcon, MagnifyingGlassIcon],
  },
  {
    name: "Recharge requests",
    href: "/wallet/transactions?type=balance_recharge&status=pending",
    icons: [
      DocumentCurrencyBangladeshiIcon,
      ArrowDownIcon,
      MagnifyingGlassIcon,
    ],
  },
];

const Menu = () => {
  const { user } = useSession();
  const roleBasedMenu = {
    user: ["Send money", "Cash out", "Transactions"],
    agent: [
      "Cash in",
      "Withdraw",
      "Recharge",
      "Transactions",
      "Withdraw requests",
      "Recharge requests",
    ],
    admin: [
      "Users",
      "Agents",
      "Pending agents",
      "Transactions",
      "Withdraw requests",
      "Recharge requests",
    ],
  };

  const filteredMenuLinks = menuLinks.filter(({ name }) =>
    roleBasedMenu[user?.role]?.includes(name)
  );

  if (user?.role === "agent") {
    if (user?.status === "pending") {
      return (
        <h3 className="font-medium">
          Agent profile under review. You can operate after approval.
        </h3>
      );
    } else if (user?.status === "pending") {
      return (
        <h3 className="font-medium">
          Agent request rejected. Contact support for details.
        </h3>
      );
    }
  }

  return (
    <div className="flex items-center flex-wrap gap-3 ">
      {filteredMenuLinks?.map((link) => (
        <Link
          href={link.href}
          key={link.name}
          className="border border-blue-600 p-2 rounded-xl"
        >
          <span className="flex items-end ">
            {link.icons.map((icon, index) => {
              const LinkIcon = icon;

              return (
                <LinkIcon
                  className={`${index === 0 ? "w-6" : "w-4"} text-blue-600 `}
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
