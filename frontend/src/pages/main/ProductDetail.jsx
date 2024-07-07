import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import Slider from "react-slick";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [filter, setFilter] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/api/product/get-detail-product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
  };

  const handleQuantityChange = (delta) => {
    const maxQuantity = selectedColor && selectedSize ? getStockForSelectedColorSize() : product.stock;
    setQuantity((prevQuantity) => Math.min(Math.max(1, prevQuantity + delta), maxQuantity));
  };

  const handleQuantityInputChange = (event) => {
    const value = Math.max(1, Math.min(Number(event.target.value), getStockForSelectedColorSize()));
    setQuantity(value);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
    setQuantity(1);
    setError("");
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setQuantity(1);
    setError("");
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      setError("Please select a color and a size.");
      return;
    }
    const cartItem = {
      productId: product._id,
      title: product.title,
      price: product.price,
      quantity,
      color: selectedColor,
      size: selectedSize,
      thumbnail: product.thumbnail,
      sku: product.sku,
      brand: product.brand.name,
    };
    console.log("Add to cart", cartItem);
    // Add to cart logic goes here
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      setError("Please select a color and a size.");
      return;
    }
    // Buy now logic goes here
    console.log("Buy now", { selectedColor, selectedSize, quantity });
  };

  const getStockForSelectedColorSize = () => {
    const colorDetails = product.stockDetails.find((detail) => detail.colorCode === selectedColor);
    const sizeDetail = colorDetails ? colorDetails.details.find((s) => s.size === selectedSize) : null;
    return sizeDetail ? sizeDetail.quantity : 0;
  };

  const filteredReviews = filter ? product.reviews.filter((review) => review.rating === filter) : product.reviews;
  const availableSizes = selectedColor
    ? product.stockDetails
        .find((detail) => detail.colorCode === selectedColor)
        ?.details.filter((d) => d.quantity > 0)
        .map((d) => d.size)
    : [];
  const availableStock = selectedColor && selectedSize ? getStockForSelectedColorSize() : product.stock;

  // Filter out colors that have no available stock in any size
  const availableColors = product.stockDetails.filter((detail) => detail.details.some((sizeDetail) => sizeDetail.quantity > 0));

  return (
    <>
      <div className="container mx-auto p-6 bg-white rounded shadow-md mt-10">
        {/* thông tin 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ảnh ọt */}
          <div className="flex justify-center">
            <div className="w-2/3">
              {product.images && product.images.length > 0 ? (
                <Slider {...settings}>
                  {product.images.map((image, index) => (
                    <div key={index}>
                      <div className="m-10">
                        <img src={image} alt={`${product.title} - Image ${index + 1}`} className=" h-auto rounded-lg" />
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                <img src={product.thumbnail} alt={product.title} className="w-3/4 h-auto rounded-lg" />
              )}
            </div>
          </div>
          {/* thông tin sản phẩm */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-xl text-gray-800 mb-4">${product.price.toFixed(2)}</p>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (product.rating > i ? <FaStar key={i} className="text-yellow-500" /> : <FaRegStar key={i} className="text-gray-300" />))}
              <span className="text-gray-600 ml-2">({product.rating} rating)</span>
            </div>
            <p className="text-gray-700 mb-4">{product.type?.name}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="flex items-center space-x-2 mb-4">
              <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">{product.tag?.name}</span>
            </div>
            <div className="flex space-x-2 mt-2">
              {availableColors.map((detail) => (
                <div
                  key={detail.colorCode}
                  className={`w-5 h-5 rounded-full cursor-pointer border-2 ${selectedColor === detail.colorCode ? `ring-2 ring-offset-2` : ""}`}
                  style={{ backgroundColor: detail.colorCode }}
                  onClick={() => handleColorSelect(detail.colorCode)}
                ></div>
              ))}
            </div>
            {selectedColor && (
              <div className="flex space-x-2 mt-4">
                {availableSizes.map((size) => (
                  <button key={size} className={`px-3 py-1 border rounded ${selectedSize === size ? "bg-black text-white" : "bg-white text-black"}`} onClick={() => handleSizeSelect(size)}>
                    {size}
                  </button>
                ))}
              </div>
            )}
            <div className="mt-6">
              <div className="flex items-center mb-4">
                <span className="text-gray-700">Quantity</span>
                <div className="flex items-center mx-4">
                  <button onClick={() => handleQuantityChange(-1)} className="px-2 py-1 border rounded-l">
                    -
                  </button>
                  <input type="number" value={quantity} onChange={handleQuantityInputChange} className="w-12 text-center border-t border-b" min="1" max={availableStock} />
                  <button onClick={() => handleQuantityChange(1)} className="px-2 py-1 border rounded-r">
                    +
                  </button>
                </div>
                <span className="text-gray-600">{availableStock} pieces available</span>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 border border-black text-black rounded" onClick={handleAddToCart}>
                  <CiShoppingCart size={24} />
                  <span>Add to Cart</span>
                </button>
                <button className="px-4 py-2 bg-black text-white rounded" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* thông tin sản phẩm  */}
        <div className="mt-10">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum ipsa nulla, sequi, aspernatur itaque voluptatum soluta cum esse, iure fugiat deleniti officia sunt doloremque rem nemo
            obcaecati vero distinctio accusantium!
          </p>
        </div>

        {/* thông tin 2 */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-2">Reviews</h2>
          <div className="flex space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setFilter(star)} className={`px-4 py-2 border ${filter === star ? "bg-yellow-500 text-white" : "bg-white text-gray-700"} rounded`}>
                {star} Star{star > 1 && "s"}
              </button>
            ))}
            <button onClick={() => setFilter(null)} className={`px-4 py-2 border ${filter === null ? "bg-yellow-500 text-white" : "bg-white text-gray-700"} rounded`}>
              All
            </button>
          </div>
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review, index) => (
              <div key={index} className="border-b py-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`${review.rating > i ? "text-yellow-500" : "text-gray-300"}`} />
                  ))}
                </div>
                <p className="text-gray-600 mt-2">{review.comment}</p>
                <p className="text-gray-400 text-sm">{review.reviewerName}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No reviews for this rating.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
