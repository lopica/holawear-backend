import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const shippingRate = 35000; // Shipping rate in VND
  const initialProducts = [
    {
      productTitle: "Gucci Cotton Piquet Polo",
      productId: "6680487e6980cbef1d1b1fa4",
      thumbnail:
        "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/06/ao-polo-nam-gucci-cotton-piquet-737667-xjfgk-6429-mau-do-size-xs-6663d493a9568-08062024104835.jpg",
      color: "#FF0000",
      size: "S",
      quantity: 1,
      price: 5000000,
    },
    {
      productTitle: "Gucci Cotton Piquet Polo",
      productId: "6680487e6980cbef1d1b1fa4",
      thumbnail:
        "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/06/ao-polo-nam-gucci-cotton-piquet-737667-xjfgk-6429-mau-do-size-xs-6663d493a8d0c-08062024104835.jpg",
      color: "#FF0000",
      size: "L",
      quantity: 3,
      price: 5000000,
    },
    {
      productId: "6680487e6980cbef1d1b1fa4",
      thumbnail:
        "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/06/ao-polo-nam-gucci-cotton-piquet-737667-xjfgk-6429-mau-do-size-xs-6663d493a8d0c-08062024104835.jpg",
      color: "#FF0000",
      size: "XL",
      quantity: 13,
      price: 5000,
    },
    {
      productId: "6680487e6980cbef1d1b1fa4",
      thumbnail:
        "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/06/ao-polo-nam-gucci-cotton-piquet-737667-xjfgk-6429-mau-do-size-xs-6663d493a8d0c-08062024104835.jpg",
      color: "#FF0000",
      size: "M",
      quantity: 2,
      price: 1000,
    },
  ];

  const [products, setProducts] = useState(initialProducts);

  const updateQuantity = (productId, size, quantity) => {
    if (quantity < 1) quantity = 1;
    const updatedProducts = products.map((product) => (product.productId === productId && product.size === size ? { ...product, quantity: quantity } : product));
    setProducts(updatedProducts);
  };

  const handleQuantityChange = (productId, size, value) => {
    const quantity = value === "" ? 1 : parseInt(value, 10);
    updateQuantity(productId, size, quantity);
  };

  const removeItem = (productId, size) => {
    const updatedProducts = products.filter((product) => product.productId !== productId || product.size !== size);
    setProducts(updatedProducts);
  };

  const calculateSubtotal = () => {
    return products.reduce((acc, product) => acc + product.price * product.quantity, 0).toLocaleString("en-US");
  };

  const calculateTotal = (subtotal) => {
    const subtotalNumber = parseFloat(subtotal.replace(/,/g, ""));
    return (subtotalNumber + shippingRate).toLocaleString("en-US");
  };

  const subtotal = calculateSubtotal();
  const total = calculateTotal(subtotal);

  const handleCheckout = () => {
    const cartInfo = { productItems: products, subtotal: subtotal, shipping: shippingRate, total: total };
    console.log(cartInfo);
    navigate("/checkout", { state: { products, subtotal, shipping: shippingRate, total } });
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold">Shopping Cart</h1>
      <div className=" p-4 mt-6">
        <div className="grid grid-cols-12 gap-4 mb-4 border-b pb-2">
          <label className="col-span-2">Image</label>
          <label className="col-span-2">Product</label>
          <label className="col-span-1">Color</label>
          <label className="col-span-1">Size</label>
          <label className="col-span-2">Price</label>
          <label className="col-span-1">Quantity</label>
          <label className="col-span-2">Remove</label>
          <label className="col-span-1 text-right">Total</label>
        </div>

        {products.map((product) => (
          <div key={`${product.productId}-${product.size}`} className="grid grid-cols-12 gap-4 items-center mb-4 border-b pb-2">
            {/* Image */}
            <div className="col-span-2">
              <img src={product.thumbnail} alt={product.productTitle} className="w-16" />
            </div>
            {/* productTitle */}
            <div className="col-span-2">
              <div className="font-semibold">{product.productTitle || "Product Title"}</div>
            </div>
            {/* Color */}
            <div className="col-span-1">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: product.color }}></div>
            </div>
            {/* Size */}
            <div className="col-span-1">{product.size}</div>
            {/* Price */}
            <div className="col-span-2">{product.price.toLocaleString("en-US")}</div>
            {/* Quantity */}
            <div className="col-span-1">
              <input type="number" value={product.quantity} min="1" onChange={(e) => handleQuantityChange(product.productId, product.size, e.target.value)} className="w-16 border rounded p-1 " />
            </div>
            {/* Remove */}
            <div className="col-span-2">
              <Button className="" variant="outline" onClick={() => removeItem(product.productId, product.size)}>
                Remove
              </Button>
            </div>
            {/* Total */}
            <div className="col-span-1 text-right">{(product.price * product.quantity).toLocaleString("en-US")}</div>
          </div>
        ))}

        <div className="flex justify-end">
          <div className="mt-6 w-1/3  ">
            <div className="flex justify-between border-t pt-2">
              <span>Subtotal</span>
              <span>{subtotal}</span>
            </div>
            <div className="flex justify-between my-2">
              <span>Shipping</span>
              <span>{shippingRate.toLocaleString("en-US")}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-4">
              <span>Grand Total</span>
              <span>{total}</span>
            </div>
            <Button className="mt-8 w-full" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
