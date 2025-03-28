"use client";
import UsersList from "@/components/UsersList";
import { useGetUsersQuery } from "@/redux/APIs/baseApi";
import React from "react";

const UsersListComp = ({ validParams }) => {
  console.log(validParams);

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useGetUsersQuery(validParams);

  return (
    <div className="w-full overflow-x-auto hide-scrollbar">
      {users?.data.length ? (
        <div className="w-max ">
          <div className="grid grid-cols-7 place-content-start gap-6 py-2.5">
            {[
              "Name",
              "Type",
              "Email",
              "Mobile number",
              "Balance",
              "Active status",
              "Status",
            ].map((n) => (
              <div key={n} className="w-fit">
                {n}
              </div>
            ))}
          </div>

          <UsersList users={users?.data} />
        </div>
      ) : (
        <div className="font-medium">No users found</div>
      )}
    </div>
  );
};

export default UsersListComp;
