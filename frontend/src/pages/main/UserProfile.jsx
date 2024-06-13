import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState({
    username: "doanchung8089",
    name: "Chung",
    email: "doanchung@gmail.com",
    phone: "******55",
    gender: "male",
    dob: "06/20",
    profileImage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = () => {
    // Save user profile logic
    console.log("User profile saved", user);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/4 bg-white p-4 shadow-md">
        <div className="flex items-center mb-4">
          <FaUserEdit size={50} className="mr-4" />
          <div>
            <h2 className="text-xl font-bold">{user.username}</h2>
          </div>
        </div>
        <nav className="text-gray-700">
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-blue-500">
                Tài Khoản Của Tôi
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-blue-500">
                Hồ Sơ
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-blue-500">
                Địa Chỉ
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-blue-500">
                Đổi Mặt Khẩu
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-3/4 bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Hồ Sơ Của Tôi</h2>
        <p className="text-gray-600 mb-6">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Tên đăng nhập</label>
          <input type="text" className="w-full px-3 py-2 border rounded" value={user.username} disabled />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Tên</label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border rounded"
            value={user.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            className="w-full px-3 py-2 border rounded"
            value={user.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Giới tính</label>
          <div className="flex items-center">
            <label className="mr-4">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={user.gender === "male"}
                onChange={handleInputChange}
                className="mr-1"
              />
              Nam
            </label>
            <label className="mr-4">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={user.gender === "female"}
                onChange={handleInputChange}
                className="mr-1"
              />
              Nữ
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={user.gender === "other"}
                onChange={handleInputChange}
                className="mr-1"
              />
              Khác
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Ngày sinh</label>
          <input
            type="text"
            name="dob"
            className="w-full px-3 py-2 border rounded"
            value={user.dob}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSave} className="bg-red-500 text-white px-4 py-2 rounded">
          Lưu
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
