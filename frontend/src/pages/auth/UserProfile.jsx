import React, { useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState({
    email: "teacher@gmail.com",
    password: "111111", // For display purpose only, not secure
    username: "chungdt3",
    confirmPassword: "111111",
    id: 1,
    role: "admin",
    phone: "0123456789",
    address: "Ha Noi",
    gender: "men",
    createdAt: "2024-05-28T07:30:50.451+00:00",
    updatedAt: "2024-05-28T07:31:50.451+00:00",
    loginType: "system",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = () => {
    // Save changes logic
    console.log("Changes saved", user);
  };

  const handleDelete = () => {
    // Delete account logic
    console.log("Account deleted");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit your profile</h2>
      <div className="flex items-center mb-4">
        <img src="https://via.placeholder.com/150" alt="Profile" className="w-16 h-16 rounded-full mr-4" />
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Upload photo</button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Remove photo</button>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full name</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={user.gender}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
          Delete your account
        </button>
        <div>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2">Close</button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
