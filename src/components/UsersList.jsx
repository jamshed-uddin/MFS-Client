import React from "react";
import UserCard from "./UserCard";

const UsersList = ({ users }) => {
  return (
    <div>
      {!!users.length ? (
        users?.map((user) => <UserCard user={user} key={user?._id} />)
      ) : (
        <div>No user found</div>
      )}
    </div>
  );
};

export default UsersList;
