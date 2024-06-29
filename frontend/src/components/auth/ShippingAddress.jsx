import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "@/App";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import addressData from "../../data/address.js"; // Adjusted import path

const ShippingAddress = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const [addresses, setAddresses] = useState(userAuth.user.shippingAddress || []);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    specificAddress: "",
  });
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const provinces = addressData.map((province) => province.Name);
  const districts = selectedProvince ? addressData.find((province) => province.Name === selectedProvince).Districts.map((district) => district.Name) : [];
  const wards = selectedDistrict
    ? addressData
        .find((province) => province.Name === selectedProvince)
        .Districts.find((district) => district.Name === selectedDistrict)
        .Wards.map((ward) => ward.Name)
    : [];

  const handleDelete = async (id) => {
    console.log("Delete address with id:", id);
  };

  const handleAdd = async () => {
    console.log("Add new address:", newAddress);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleProvinceChange = (value) => {
    console.log("Selected Province:", value);
    setSelectedProvince(value);
    setSelectedDistrict("");
    setSelectedWard("");
  };

  const handleDistrictChange = (value) => {
    console.log("Selected District:", value);
    setSelectedDistrict(value);
    setSelectedWard("");
  };

  const handleWardChange = (value) => {
    console.log("Selected Ward:", value);
    setSelectedWard(value);
  };

  useEffect(() => {
    if (selectedProvince && selectedDistrict && selectedWard) {
      setNewAddress((prevState) => ({
        ...prevState,
        address: `${selectedWard} - ${selectedDistrict} - ${selectedProvince}`,
      }));
    }
  }, [selectedProvince, selectedDistrict, selectedWard]);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild className="w-auto">
          <Button variant="outline">Add New Address</Button>
        </DialogTrigger>
        <DialogContent className="max-w-auto">
          <DialogHeader>
            <DialogTitle>Add New Shipping Address</DialogTitle>
            <DialogDescription>Fill in the details below to add a new shipping address.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" value={newAddress.fullName} onChange={handleChange} />
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={newAddress.phone} onChange={handleChange} />
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={newAddress.address} readOnly />

              <div className="flex flex-wrap gap-4">
                <div>
                  <Label htmlFor="province">Province</Label>
                  <Select value={selectedProvince} onValueChange={handleProvinceChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tỉnh/ Thành Phố" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tỉnh/ Thành Phố</SelectLabel>
                        {provinces.map((province) => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="district">District</Label>
                  <Select value={selectedDistrict} onValueChange={handleDistrictChange} disabled={!selectedProvince}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Quận/ Huyện / Thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Quận/ Huyện / Thành phố</SelectLabel>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="ward">Ward</Label>
                  <Select value={selectedWard} onValueChange={handleWardChange} disabled={!selectedDistrict}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Phường / Xã" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Phường / Xã</SelectLabel>
                        {wards.map((ward) => (
                          <SelectItem key={ward} value={ward}>
                            {ward}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Label htmlFor="specificAddress">Specific Address</Label>
              <Input placeholder="Số nhà, đường, ngõ, ..." id="specificAddress" name="specificAddress" value={newAddress.specificAddress} onChange={handleChange} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAdd}>Add Address</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
              <Button onClick={() => handleDelete(address._id)} className="bg-red-500 text-white py-2 px-4 rounded">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingAddress;
