import UserFilter from "@/components/UserFilter";
import React from "react";
import UsersListComp from "./UsersListComp";

const Users = async ({ searchParams }) => {
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
  console.log(validParams);

  return (
    <div className=" space-y-4">
      <UserFilter />
      <UsersListComp validParams={validParams} />
    </div>
  );
};

export default Users;
