import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import Sidebar from "../../components/SideBar";
import axios from "axios";

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([0, 1000000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [sortOption, setSortOption] = useState("newest");
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:9999/api/category/get-all");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products when category or categories change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoryObj = categories.find((cat) => cat.name.toLowerCase() === category.toLowerCase());
        if (categoryObj) {
          const response = await axios.get(`http://localhost:9999/api/product/get-product-by-category-id/${categoryObj._id}`);
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (categories.length > 0) {
      fetchProducts();
    }
  }, [category, categories]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortProducts = (products) => {
    switch (sortOption) {
      case "price-high-low":
        return products.sort((a, b) => b.price - a.price);
      case "price-low-high":
        return products.sort((a, b) => a.price - b.price);
      case "newest":
        return products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return products;
    }
  };

  const filteredProducts = products.filter((product) => {
    console.log("Filtering product:", product); // Log từng product
    return (
      product.category?.name.toLowerCase() === category.toLowerCase() && // Check category
      (selectedColors.length === 0 || selectedColors.some((color) => product.stockDetails.some((detail) => detail.colorCode === color))) &&
      product.price >= selectedPrices[0] &&
      product.price <= selectedPrices[1] &&
      (selectedBrands.length === 0 || selectedBrands.includes(product.brand.name))
    );
  });

  const sortedProducts = sortProducts(filteredProducts);

  return (
    <div>
      <div className="container mx-auto p-6 flex">
        <div className={`transition-transform duration-300 ease-in-out ${showSidebar ? "w-64" : "w-0"} overflow-hidden`}>
          <Sidebar
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedPrices={selectedPrices}
            setSelectedPrices={setSelectedPrices}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            priceRange={selectedPrices}
            setPriceRange={setSelectedPrices}
          />
        </div>
        <div className="flex-1 ml-4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={toggleSidebar} className="bg-gray-200 p-2 rounded">
              {showSidebar ? "Hide Filters" : "Show Filters"}
            </button>
            <div className="relative">
              <select value={sortOption} onChange={handleSortChange} className="bg-gray-200 p-2 rounded">
                <option value="newest">Newest</option>
                <option value="price-high-low">Price: High-Low</option>
                <option value="price-low-high">Price: Low-High</option>
              </select>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">
            {category.charAt(0).toUpperCase() + category.slice(1)} Products ({filteredProducts.length})
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
