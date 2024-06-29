import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "@/App";

const ShippingAddress = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const [addresses, setAddresses] = useState(userAuth.user.shippingAddress || []);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    specificAddress: "",
  });

  const handleDelete = async (id) => {
    const updatedAddresses = addresses.filter((address) => address._id !== id);
    setAddresses(updatedAddresses);
    setUserAuth({ ...userAuth, user: { ...userAuth.user, shippingAddress: updatedAddresses } });
    sessionStorage.setItem("user", JSON.stringify({ ...userAuth, user: { ...userAuth.user, shippingAddress: updatedAddresses } }));
    try {
      await axios.delete(`/api/addresses/${id}`);
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post(`/api/addresses`, newAddress);
      const updatedAddresses = [...addresses, response.data];
      setAddresses(updatedAddresses);
      setUserAuth({ ...userAuth, user: { ...userAuth.user, shippingAddress: updatedAddresses } });
      sessionStorage.setItem("user", JSON.stringify({ ...userAuth, user: { ...userAuth.user, shippingAddress: updatedAddresses } }));
      setNewAddress({
        fullName: "",
        phone: "",
        address: "",
        specificAddress: "",
      });
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Thêm địa chỉ mới</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input id="fullName" name="fullName" type="text" value={newAddress.fullName} onChange={handleChange} className="w-full px-3 py-2 border rounded mb-2" />
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input id="phone" name="phone" type="text" value={newAddress.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded mb-2" />
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input id="address" name="address" type="text" value={newAddress.address} onChange={handleChange} className="w-full px-3 py-2 border rounded mb-2" />
            <label htmlFor="specificAddress" className="block text-sm font-medium text-gray-700">
              Specific Address
            </label>
            <input id="specificAddress" name="specificAddress" type="text" value={newAddress.specificAddress} onChange={handleChange} className="w-full px-3 py-2 border rounded mb-2" />
          </div>
        </div>
        <button onClick={handleAdd} className="bg-blue-500 text-white py-2 px-4 rounded">
          Thêm địa chỉ
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <div key={address._id} className="bg-white p-4 rounded shadow-md">
            <div className="mb-4">
              <h3 className="text-lg font-bold">{address.fullName}</h3>
            </div>
            <div className="mb-4">
              <p>{address.phone}</p>
              <p>{address.address}</p>
              <p>{address.specificAddress}</p>
            </div>
            <div className="flex justify-end">
              <button onClick={() => handleDelete(address._id)} className="bg-red-500 text-white py-2 px-4 rounded">
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingAddress;
