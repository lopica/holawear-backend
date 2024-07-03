import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const colors = [
  { code: "#FF0000", name: "Red" },
  { code: "#008000", name: "Green" },
  { code: "#0000FF", name: "Blue" },
  { code: "#FFFF00", name: "Yellow" },
  { code: "#FFA500", name: "Orange" },
  { code: "#800080", name: "Purple" },
  { code: "#FFC0CB", name: "Pink" },
  { code: "#A52A2A", name: "Brown" },
  { code: "#808080", name: "Grey" },
  { code: "#000000", name: "Black" },
];

const FormAddDepot = ({ productDataById }) => {
  const [importPrice, setImportPrice] = useState("");
  const [stock, setStock] = useState("");
  const [stockDetails, setStockDetails] = useState([{ colorCode: colors[0].code, details: { S: 0, M: 0, L: 0, XL: 0, "2XL": 0 } }]);

  const handleColorChange = (index, newColor) => {
    const updatedStockDetails = [...stockDetails];
    updatedStockDetails[index].colorCode = newColor;
    setStockDetails(updatedStockDetails);
  };

  const handleSizeChange = (index, size, quantity) => {
    const updatedStockDetails = [...stockDetails];
    updatedStockDetails[index].details[size] = quantity;
    setStockDetails(updatedStockDetails);
  };

  const addColor = () => {
    if (stockDetails.length < 10) {
      setStockDetails([...stockDetails, { colorCode: colors[0].code, details: { S: 0, M: 0, L: 0, XL: 0, "2XL": 0 } }]);
    }
  };

  const removeColor = (index) => {
    if (stockDetails.length > 1) {
      const updatedStockDetails = stockDetails.filter((_, i) => i !== index);
      setStockDetails(updatedStockDetails);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (importPrice <= 0) {
      alert("Import price must be greater than 0");
      return;
    }
    const totalStock = stockDetails.reduce((acc, curr) => {
      return acc + Object.values(curr.details).reduce((sum, q) => sum + parseInt(q), 0);
    }, 0);
    if (totalStock !== parseInt(stock)) {
      alert("Total stock does not match the sum of stock details");
      return;
    }
    const colorCodes = stockDetails.map((detail) => detail.colorCode);
    if (new Set(colorCodes).size !== colorCodes.length) {
      alert("Color codes must be unique");
      return;
    }
    // Submit form data
    console.log({ importPrice, stock, stockDetails });
  };

  return (
    <>
      <div>
        <p>
          <b>Product</b> : <i>{productDataById.title}</i>
        </p>
        <p>
          <b>Stock available</b>: <i>{productDataById.stock}</i>
        </p>
        <p>
          <b>Price</b> : <i>{productDataById.price} vnd</i>
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <Label className="mb-2">Import Price:</Label>
          <Input type="number" className="p-2 border border-gray-300 rounded-md" value={importPrice} onChange={(e) => setImportPrice(e.target.value)} required />
        </div>
        <div className="flex flex-col">
          <Label className="mb-2">Total Stock:</Label>
          <Input type="number" className="p-2 border border-gray-300 rounded-md" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>
        <div className="space-y-4">
          {stockDetails.map((stockDetail, index) => (
            <div key={index} className="border border-gray-300 rounded-md p-4">
              <div className="flex justify-between items-center space-x-4">
                <div className="flex items-center space-x-2 justify-center">
                  {/* color ============== */}
                  <Label>Color:</Label>
                  <select
                    className="focus:outline-none bg-white hover:bg-gray-50 text-gray-800 py-1 px-2 border border-gray-200 rounded shadow w-1/2"
                    value={stockDetail.colorCode}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                  >
                    {colors.map((color) => (
                      <option key={color.code} value={color.code}>
                        {color.name}
                      </option>
                    ))}
                  </select>

                  {stockDetails.length > 1 && (
                    <Button variant="outline" type="button" onClick={() => removeColor(index)}>
                      Remove
                    </Button>
                  )}
                </div>
                <div className="flex space-x-2">
                  {["S", "M", "L", "XL", "2XL"].map((size) => (
                    <div key={size} className="flex flex-col items-center mb-4">
                      <Label>{size}</Label>
                      <Input
                        type="number"
                        className="p-2 border border-gray-300 rounded-md w-20"
                        value={stockDetail.details[size]}
                        onChange={(e) => handleSizeChange(index, size, e.target.value)}
                        min="0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {stockDetails.length < 10 && (
          <Button type="button" className=" bg-blue-500 text-white rounded-md" onClick={addColor}>
            Add Color
          </Button>
        )}
        <div className="flex justify-end">
          <Button type="submit" className=" bg-green-500 text-white rounded-md">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default FormAddDepot;
