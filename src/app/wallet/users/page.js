import UserFilter from "@/components/UserFilter";
import UsersList from "@/components/UsersList";
import { requestClient } from "@/utils/requestClient";
import { cookies } from "next/headers";
import React from "react";

const Users = async ({ searchParams }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;

  const params = await searchParams;
  const validQueries = ["role", "status", "activeOnly"];

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

  const users = await requestClient(`/users?${validParams}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(users);
  return (
    <div>
      <UserFilter />
      <UsersList users={users?.data} />
    </div>
  );
};

export default Users;
