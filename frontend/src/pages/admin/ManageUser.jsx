import React from "react";
import UserTable from "../../components/UserTable";

const ManageProduct = ({ users, roles, loginTypes }) => {
  const handleDelete = (userId) => {
    // Implement delete functionality
    console.log("dele:" + userId);
  };

  const handleEdit = (userId) => {
    // Implement edit functionality
    console.log("edit" + userId);
  };

  return (
    <div>
      <UserTable users={users} roles={roles} loginTypes={loginTypes} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default ManageProduct;
