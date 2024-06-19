import React, { useState } from "react";
import { Input } from "@/components/ui/input";

const FormAddDepot = ({ initialFormData, onSubmit, onCancel }) => {
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
    const totalStock = formData.colors.reduce((total, color) => total + Object.values(color.sizes).reduce((sum, qty) => sum + qty, 0), 0);

    if (totalStock !== formData.stock) {
      alert("Total sizes quantity must equal the total stock");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Stock</label>
        <Input type="number" min="0" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value === "" ? 0 : Math.max(parseInt(e.target.value, 10), 0) })} />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Import Price</label>
        <Input type="number" min="0" value={formData.importPrice} onChange={(e) => setFormData({ ...formData, importPrice: e.target.value === "" ? 0 : Math.max(parseInt(e.target.value, 10), 0) })} />
      </div>
      {formData.colors.map((color, index) => (
        <div key={index} className="mt-4">
          <div className="flex justify-between">
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <button type="button" onClick={() => removeColorField(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
              Delete Color
            </button>
          </div>
          <Input type="text" value={color.color} onChange={(e) => handleColorChange(index, e.target.value)} />
          <div className="mt-4 grid grid-cols-5 gap-4">
            {Object.keys(color.sizes).map((size) => (
              <div key={size}>
                <label className="block text-sm font-medium text-gray-700">{size}</label>
                <Input type="number" min="0" value={color.sizes[size]} onChange={(e) => handleFormChange(index, size, e.target.value)} />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button type="button" onClick={addColorField} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Color
      </button>
      <div className="mt-4 flex justify-end space-x-4">
        <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Cancel
        </button>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormAddDepot;
