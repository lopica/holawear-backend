import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Pencil, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react";

const TableProduct = ({ products, categories, onEdit }) => {
  const statuses = [
    { id: 1, name: "Active" },
    { id: 2, name: "Inactive" },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10); // Default to 10 products per page

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? product.category === selectedCategory : true) &&
      (selectedStatus ? product.status === selectedStatus : true),
  );

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePerPageChange = (e) => {
    setProductsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPagination = () => {
    const pagination = [];
    if (totalPages <= 5) {
      pagination.push(
        pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 border border-gray-300 rounded ${currentPage === number ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-white text-gray-700 hover:bg-gray-50"}`}
            >
              {number}
            </button>
          </li>
        )),
      );
    } else {
      pagination.push(
        <>
          <li key={1}>
            <button
              onClick={() => paginate(1)}
              className={`px-3 py-1 border border-gray-300 rounded ${currentPage === 1 ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-white text-gray-700 hover:bg-gray-50"}`}
            >
              1
            </button>
          </li>
          <li key={2}>
            <button
              onClick={() => paginate(2)}
              className={`px-3 py-1 border border-gray-300 rounded ${currentPage === 2 ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-white text-gray-700 hover:bg-gray-50"}`}
            >
              2
            </button>
          </li>
          <li key="ellipsis1">
            <span className="px-3 py-1">...</span>
          </li>
          <li key={totalPages - 1}>
            <button
              onClick={() => paginate(totalPages - 1)}
              className={`px-3 py-1 border border-gray-300 rounded ${currentPage === totalPages - 1 ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-white text-gray-700 hover:bg-gray-50"}`}
            >
              {totalPages - 1}
            </button>
          </li>
          <li key={totalPages}>
            <button
              onClick={() => paginate(totalPages)}
              className={`px-3 py-1 border border-gray-300 rounded ${currentPage === totalPages ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-white text-gray-700 hover:bg-gray-50"}`}
            >
              {totalPages}
            </button>
          </li>
        </>,
      );
    }
    return pagination;
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between space-x-4 mb-4">
        {/* Search input */}
        <input type="text" placeholder="Search by product name" value={searchTerm} onChange={handleSearchChange} className="px-4 py-2 border rounded-lg w-full sm:w-1/2 lg:w-1/3" />
        {/* Dropdowns for Category and Status */}
        <div className="flex space-x-4">
          {/* Category dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none bg-white hover:bg-gray-50 text-gray-800 py-1 px-2 border border-gray-200 rounded shadow">
              {selectedCategory || "Category"}
              <ChevronDown size={18} color="#c8c8cf" className="inline-block ml-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="flex items-center">Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleCategorySelect("")}>All</DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem key={category.id} onClick={() => handleCategorySelect(category.name)}>
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Status dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none bg-white hover:bg-gray-50 text-gray-800 py-1 px-2 border border-gray-200 rounded shadow">
              {selectedStatus || "Status"}
              <ChevronDown size={18} color="#c8c8cf" className="inline-block ml-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="flex items-center">Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleStatusSelect("")}>All</DropdownMenuItem>
              {statuses.map((status) => (
                <DropdownMenuItem key={status.id} onClick={() => handleStatusSelect(status.name)}>
                  {status.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          {/* Table headers */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{product.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${product.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="outline">{product.status}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{format(parseISO(product.meta.createdAt), "HH:mm:ss dd-MM-yyyy")}</div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button onClick={() => onEdit(product.id)} className="bg-white hover:bg-gray-50 text-[#7D4600] hover:text-indigo-900 py-1 px-2 border border-gray-200 rounded shadow">
                    <Eye className="h-5 w-5 hover:opacity-85" />
                  </button>
                  <button onClick={() => onEdit(product.id)} className="ml-4 bg-white hover:bg-gray-50 text-indigo-600 hover:text-indigo-900 py-1 px-2 border border-gray-200 rounded shadow">
                    <Pencil className="h-5 w-5 opacity-55 hover:opacity-85" />
                  </button>
                  {/* <button onClick={() => onDelete(product.id)} className="ml-4 bg-white hover:bg-gray-50 text-red-600 hover:text-red-900 py-1 px-2 border border-gray-200 rounded shadow">
                    <Trash2 className="h-5 w-5 opacity-55 hover:opacity-85" />
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination and rows per page dropdown */}
      <div className="flex justify-between items-center mt-4">
        {/* Rows per page dropdown */}
        <div className="flex items-center">
          <span className="mr-2">Rows per page:</span>
          <select value={productsPerPage} onChange={handlePerPageChange} className="focus:outline-none px-2 py-1 border border-gray-300 rounded">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        {/* Pagination controls */}
        <nav className="block">
          <ul className="flex pl-0 rounded list-none flex-wrap">
            <li>
              <button onClick={() => paginate(currentPage - 1)} className="mr-3 px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50" disabled={currentPage === 1}>
                <ChevronLeft color="#a8a5a5" />
              </button>
            </li>
            {renderPagination()}
            <li>
              <button onClick={() => paginate(currentPage + 1)} className="ml-3 px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50" disabled={currentPage === totalPages}>
                <ChevronRight color="#a8a5a5" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TableProduct;
