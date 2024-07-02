import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FormAddDepot = ({ initialFormData, onSubmit }) => {
  const colors = [
    "#FF0000", // Red
    "#008000", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FFA500", // Orange
    "#800080", // Purple
    "#FFC0CB", // Pink
    "#A52A2A", // Brown
    "#808080", // Grey
    "#000000", // Black
  ];

  const initialColorsData = colors.map((color) => ({
    colorCode: color,
    details: { S: 0, M: 0, L: 0, XL: 0, "2XL": 0 },
  }));

  const [formData, setFormData] = useState({
    ...initialFormData,
    colors: initialColorsData,
  });

  const handleFormChange = (index, size, value) => {
    const newColors = [...formData.colors];
    newColors[index].details[size] = value === "" ? 0 : Math.max(parseInt(value, 10), 0);
    setFormData({ ...formData, colors: newColors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalStock = formData.colors.reduce((total, color) => total + Object.values(color.details).reduce((sum, qty) => sum + qty, 0), 0);
    if (totalStock !== formData.stock) {
      alert("Total sizes quantity must equal the total stock");
      return;
    }
    const outputData = {
      productId: formData.productId,
      importPrice: formData.importPrice,
      stock: formData.stock,
      stockDetails: formData.colors,
      importTotal: formData.importTotal,
      createdAt: formData.createdAt,
    };
    onSubmit(outputData);
  };

  return (
    <Card className="w-full max-w-lg mx-auto border-none">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stock: e.target.value === "" ? 0 : Math.max(parseInt(e.target.value, 10), 0),
                  })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="importPrice">Import Price</Label>
              <Input
                id="importPrice"
                type="number"
                min="0"
                value={formData.importPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    importPrice: e.target.value === "" ? 0 : Math.max(parseInt(e.target.value, 10), 0),
                  })
                }
              />
            </div>
            {formData.colors.map((color, index) => (
              <div key={index} className="flex flex-col space-y-1.5">
                <Label>Color: {color.colorCode}</Label>
                <div className="grid grid-cols-5 gap-4 mt-2">
                  {Object.keys(color.details).map((size) => (
                    <div key={size} className="flex flex-col space-y-1.5">
                      <Label htmlFor={`size-${index}-${size}`}>{size}</Label>
                      <Input id={`size-${index}-${size}`} type="number" min="0" value={color.details[size]} onChange={(e) => handleFormChange(index, size, e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <CardFooter className="flex justify-end space-x-4 mt-4">
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormAddDepot;
