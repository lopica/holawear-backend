import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FormAddDepot = ({ initialFormData, onSubmit }) => {
  const [formData, setFormData] = useState(initialFormData);

  // Handle form change for size quantities
  const handleFormChange = (index, size, value) => {
    const newColors = [...formData.colors];
    newColors[index].sizes[size] = value === "" ? 0 : Math.max(parseInt(value, 10), 0);
    setFormData({ ...formData, colors: newColors });
  };

  // Handle color input change
  const handleColorChange = (index, value) => {
    const newColors = [...formData.colors];
    newColors[index].color = value;
    setFormData({ ...formData, colors: newColors });
  };

  // Add a new color field
  const addColorField = () => {
    setFormData({
      ...formData,
      colors: [...formData.colors, { color: "", sizes: { S: 0, M: 0, L: 0, XL: 0, "2XL": 0 } }],
    });
  };

  // Remove a color field
  const removeColorField = (index) => {
    const newColors = formData.colors.filter((_, i) => i !== index);
    setFormData({ ...formData, colors: newColors });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for any color where all sizes are 0 or color is empty
    for (let i = 0; i < formData.colors.length; i++) {
      const colorSizes = formData.colors[i].sizes;
      const totalSize = Object.values(colorSizes).reduce((sum, qty) => sum + qty, 0);
      if (formData.colors[i].color.trim() === "") {
        // alert("Please enter a color for all entries.");
        return;
      }
      if (totalSize === 0) {
        alert("A color has all sizes set to 0. Please provide at least one size quantity for each color.");
        return;
      }
    }

    const totalStock = formData.colors.reduce((total, color) => total + Object.values(color.sizes).reduce((sum, qty) => sum + qty, 0), 0);

    if (totalStock !== formData.stock) {
      alert("Total sizes quantity must equal the total stock");
      return;
    }

    onSubmit(formData);
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
                <div className="flex justify-between items-center">
                  <Label htmlFor={`color-${index}`}>Color</Label>
                  {formData.colors.length > 1 && (
                    <Button variant="outline" onClick={() => removeColorField(index)}>
                      Delete Color
                    </Button>
                  )}
                </div>
                <Input id={`color-${index}`} type="text" value={color.color} onChange={(e) => handleColorChange(index, e.target.value)} />
                <div className="grid grid-cols-5 gap-4 mt-2">
                  {Object.keys(color.sizes).map((size) => (
                    <div key={size} className="flex flex-col space-y-1.5">
                      <Label htmlFor={`size-${index}-${size}`}>{size}</Label>
                      <Input id={`size-${index}-${size}`} type="number" min="0" value={color.sizes[size]} onChange={(e) => handleFormChange(index, size, e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addColorField}>
              Add Color
            </Button>
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
