"use client";

import UserFilter from "@/components/UserFilter";
import UsersList from "@/components/UsersList";
import useSession from "@/hooks/useSession";
import { requestClient } from "@/utils/requestClient";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const params = useSearchParams();
  const validQueries = ["role", "status", "activeOnly"];

  const router = useRouter();
  const { isAdmin } = useSession();

  useEffect(() => {
    if (!isAdmin) router.push("/wallet");
  }, [isAdmin, router]);

  const validQueryParams = (searchParams, validQueries) => {
    const queries = {};

    validQueries.forEach((key) => {
      if (key in searchParams) {
        queries[key] = searchParams[key];
      }
    });

    return new URLSearchParams(queries).toString();
  };

  const validParams = validQueryParams(params, validQueries);

  useEffect(() => {
    const getUser = async () => {
      const data = await requestClient(`/users?${validParams}`);
      setUsers(data?.data);
    };

    getUser();
  }, [validParams]);
  return (
    <div className=" space-y-4">
      <UserFilter />
      <div>
        <div className="grid grid-cols-5 place-content-start gap-6 py-2.5">
          {["Name", "Email", "Mobile number", "Balance", "Action"].map((n) => (
            <div key={n}>{n}</div>
          ))}
        </div>
        <UsersList users={users} />
      </div>
    </div>
  );
};

export default Users;
