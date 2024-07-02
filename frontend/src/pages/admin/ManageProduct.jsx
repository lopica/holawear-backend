import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableDepot from "../../components/admin/TableDepot";
import TableProduct from "../../components/admin/TableProduct";

const ManageProduct = () => {
  const depotData = [
    {
      id: 1,
      productId: 1,
      importPrice: 5000,
      stock: 20,
      stockDetails: {
        "#ff0000": {
          L: 3,
          M: 2,
          XL: 5,
        },
        "#50d71e": {
          S: 2,
          L: 1,
          XL: 3,
          "2XL": 4,
        },
      },
      importTotal: 100000,
      createdAt: "2024-05-23T08:56:21.618Z",
    },
    {
      id: 2,
      productId: 1,
      importPrice: 5000,
      stock: 30,
      stockDetails: {
        "#ff0000": {
          L: 3,
          M: 2,
          XL: 5,
        },
        "#50d71e": {
          S: 2,
          L: 1,
          XL: 3,
          "2XL": 4,
        },
      },
      importTotal: 150000,
      createdAt: "2024-05-23T08:56:21.618Z",
    },
  ];
  const productData = [
    {
      id: 1,
      title: "Adidas Running Shoes",
      description: "Mô tả sản phẩm.",
      category: "men",
      importPrice: 5000,
      price: 10000,
      discountPercentage: 10,
      rating: 4.5,
      stock: 20,
      type: "Shoes",
      tags: ["shoes", "running", "adidas"],
      brand: "Adidas",
      createdAt: "2024-05-23T08:56:21.618Z",
      updatedAt: "2024-05-23T08:56:21.618Z",
      availabilityStatus: "In Stock",
      reviews: [
        {
          rating: 5,
          comment: "Great shoes! Very comfortable.",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "John Smith",
          reviewerEmail: "john.smith@example.com",
        },
        {
          rating: 4,
          comment: "Good quality, but a bit pricey.",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Jane Doe",
          reviewerEmail: "jane.doe@example.com",
        },
      ],
      returnPolicy: "30 days return policy",
      minimumOrderQuantity: 1,
      images: ["", ""],
      thumbnail: "",
      stockDetails: {
        "#ff0000": {
          L: 3,
          M: 2,
          XL: 5,
        },
        "#50d71e": {
          S: 2,
          L: 1,
          XL: 3,
          "2XL": 4,
        },
      },
    },
    {
      id: 2,
      title: "Nike Running Shoes",
      description: "Mô tả sản phẩm.",
      category: "men",
      importPrice: 5000,
      price: 10000,
      discountPercentage: 10,
      rating: 4.5,
      stock: 20,
      type: "Shoes",
      tags: ["shoes", "running", "adidas"],
      brand: "Adidas",
      createdAt: "2024-05-23T08:56:21.618Z",
      updatedAt: "2024-05-23T08:56:21.618Z",
      availabilityStatus: "Sold Out",
      reviews: [
        {
          rating: 5,
          comment: "Great shoes! Very comfortable.",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "John Smith",
          reviewerEmail: "john.smith@example.com",
        },
        {
          rating: 4,
          comment: "Good quality, but a bit pricey.",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Jane Doe",
          reviewerEmail: "jane.doe@example.com",
        },
      ],
      returnPolicy: "30 days return policy",
      minimumOrderQuantity: 1,
      images: ["", ""],
      thumbnail: "",
      stockDetails: {
        "#ff0000": {
          L: 3,
          M: 2,
          XL: 5,
        },
        "#50d71e": {
          S: 2,
          L: 1,
          XL: 3,
          "2XL": 4,
        },
      },
    },
  ];
  const categoryData = [
    {
      id: 1,
      name: "groceries",
      description: "",
      image: "",
    },
    {
      id: 2,
      name: "electronics",
      description: "",
      image: "",
    },
    {
      id: 3,
      name: "clothing",
      description: "",
      image: "",
    },
    {
      id: 4,
      name: "men",
      description: "",
      image: "",
    },
    {
      id: 5,
      name: "women",
      description: "",
      image: "",
    },
  ];
  return (
    <div className="w-full h-full">
      <Tabs defaultValue="product">
        <TabsList>
          <TabsTrigger value="product">Products</TabsTrigger>
          <TabsTrigger value="depot">Depot History</TabsTrigger>
        </TabsList>
        {/* product table */}
        <TabsContent value="product">
          <TableProduct productData={productData} categories={categoryData} />
        </TabsContent>
        {/* product depot table */}
        <TabsContent value="depot">
          <TableDepot depotData={depotData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageProduct;
