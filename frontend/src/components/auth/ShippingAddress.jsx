import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserContext } from "@/App";

const ShippingAddress = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const [addresses, setAddresses] = useState(userAuth.user.addresses || []);
  const [isEditing, setIsEditing] = useState(null);

  const handleSetDefault = async (id) => {
    const updatedAddresses = addresses.map((address) => (address.id === id ? { ...address, default: true } : { ...address, default: false }));
    setAddresses(updatedAddresses);
    setUserAuth({ ...userAuth, user: { ...userAuth.user, addresses: updatedAddresses } });
    sessionStorage.setItem("user", JSON.stringify({ ...userAuth, user: { ...userAuth.user, addresses: updatedAddresses } }));

    // Optionally, send the update to the backend
    try {
      await axios.post(`/api/addresses/${id}/set-default`);
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  const handleDelete = async (id) => {
    const updatedAddresses = addresses.filter((address) => address.id !== id);
    setAddresses(updatedAddresses);
    setUserAuth({ ...userAuth, user: { ...userAuth.user, addresses: updatedAddresses } });
    sessionStorage.setItem("user", JSON.stringify({ ...userAuth, user: { ...userAuth.user, addresses: updatedAddresses } }));

    // Optionally, send the delete request to the backend
    try {
      await axios.delete(`/api/addresses/${id}`);
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleUpdate = async (id, updatedAddress) => {
    const updatedAddresses = addresses.map((address) => (address.id === id ? updatedAddress : address));
    setAddresses(updatedAddresses);
    setUserAuth({ ...userAuth, user: { ...userAuth.user, addresses: updatedAddresses } });
    sessionStorage.setItem("user", JSON.stringify({ ...userAuth, user: { ...userAuth.user, addresses: updatedAddresses } }));

    // Optionally, send the update to the backend
    try {
      await axios.put(`/api/addresses/${id}`, updatedAddress);
    } catch (error) {
      console.error("Error updating address:", error);
    }
    setIsEditing(null);
  };

  const handleEdit = (id) => {
    setIsEditing(id);
  };

  return (
    <div>
      <Button className="mb-4">Thêm địa chỉ mới</Button>
      {addresses.map((address) => (
        <Card key={address.id} className="mb-4">
          <CardHeader>
            <CardTitle>{address.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing === address.id ? (
              <>
                <Label htmlFor={`name-${address.id}`}>Name</Label>
                <Input id={`name-${address.id}`} type="text" defaultValue={address.name} onChange={(e) => handleUpdate(address.id, { ...address, name: e.target.value })} />
                <Label htmlFor={`phone-${address.id}`}>Phone</Label>
                <Input id={`phone-${address.id}`} type="text" defaultValue={address.phone} onChange={(e) => handleUpdate(address.id, { ...address, phone: e.target.value })} />
                <Label htmlFor={`address-${address.id}`}>Address</Label>
                <Input id={`address-${address.id}`} type="text" defaultValue={address.address} onChange={(e) => handleUpdate(address.id, { ...address, address: e.target.value })} />
              </>
            ) : (
              <>
                <p>{address.name}</p>
                <p>{address.phone}</p>
                <p>{address.address}</p>
                {address.default && <span className="text-red-500">Mặc định</span>}
              </>
            )}
          </CardContent>
          <CardFooter>
            {isEditing === address.id ? (
              <>
                <Button onClick={() => handleUpdate(address.id)}>Lưu</Button>
                <Button onClick={() => setIsEditing(null)}>Hủy</Button>
              </>
            ) : (
              <>
                <Button onClick={() => handleEdit(address.id)}>Cập nhật</Button>
                <Button onClick={() => handleDelete(address.id)}>Xóa</Button>
                {!address.default && <Button onClick={() => handleSetDefault(address.id)}>Thiết lập mặc định</Button>}
              </>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ShippingAddress;
