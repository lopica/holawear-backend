import React from "react";
import ProductTable from "../../components/admin/TableProduct";
const ManageProduct = ({ products, brands, categories }) => {
  const onDelete = (productId) => {
    // Implement delete functionality
    console.log("dele:" + productId);
  };
  const onEdit = (productId) => {
    // Implement edit functionality
    console.log("edit" + productId);
  };

  return <div>{/* <ProductTable products={products} brands={brands} categories={categories} onDelete={onDelete} onEdit={onEdit} /> */}</div>;
};

export default ManageProduct;
