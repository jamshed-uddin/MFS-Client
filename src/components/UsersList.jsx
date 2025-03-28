import React from "react";
import UserCard from "./UserCard";

const UsersList = ({ users }) => {
  return (
    <div className="">
      {users?.map((user) => (
        <UserCard user={user} key={user?._id} />
      ))}
    </div>
  );
};

export default UsersList;
