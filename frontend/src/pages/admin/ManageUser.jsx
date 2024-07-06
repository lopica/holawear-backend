import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "../../components/UserTable";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loginTypes, setLoginTypes] = useState([]); // Giả sử bạn có một API để lấy loại đăng nhập nếu cần thiết

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:9999/api/user/all");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:9999/api/role/getAll");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    // Call fetch functions
    fetchUsers();
    fetchRoles();
  }, []);

  const handleDelete = (userId) => {
    // Implement delete functionality
    console.log("dele:" + userId);
  };

  const handleEdit = (userId) => {
    // Implement edit functionality
    console.log("edit" + userId);
  };

  const handleDetail = (userId) => {
    // Implement edit functionality
    console.log("Detail" + userId);
  };
  return (
    <div>
      <UserTable users={users} roles={roles} onDelete={handleDelete} onEdit={handleEdit} onDetail={handleDetail} />
    </div>
  );
};

export default ManageUser;
