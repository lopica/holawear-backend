import React from "react";
import UserTable from "../../components/UserTable";

const ManageProduct = ({ users }) => {
  const handleDelete = (userId) => {
    // Implement delete functionality
  };

  const handleEdit = (userId) => {
    // Implement edit functionality
  };

  return (
    <div>
      <UserTable users={users} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default ManageProduct;
