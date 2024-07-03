import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableDepot from "../../components/admin/TableDepot";
import TableProduct from "../../components/admin/TableProduct";
import axios from "axios";

const ManageProduct = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  //get data from api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCategory = await axios.get("http://localhost:9999/api/category/get-all");
        const resProduct = await axios.get("http://localhost:9999/api/product/get-all-product");
        const myProduct = resProduct.data.products;
        const myCategory = resCategory.data;
        setCategories(myCategory);
        setProducts(myProduct);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

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

  return (
    <div className="w-full h-full">
      <Tabs defaultValue="product">
        <TabsList>
          <TabsTrigger value="product">Products</TabsTrigger>
          <TabsTrigger value="depot">Depot History</TabsTrigger>
        </TabsList>
        {/* product table */}
        <TabsContent value="product">
          <TableProduct productData={products} categories={categories} />
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
