import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

const brandData = [
  { _id: "6680361f6980cbef1d1b1f70", name: "Adidas" },
  { _id: "6680361f6980cbef1d1b1f71", name: "Calvin Klein" },
  { _id: "6680361f6980cbef1d1b1f72", name: "Gucci" },
  { _id: "6680361f6980cbef1d1b1f73", name: "Lacoste" },
  { _id: "6680361f6980cbef1d1b1f74", name: "Dior" },
  { _id: "6680361f6980cbef1d1b1f75", name: "Chloé" },
  { _id: "6680361f6980cbef1d1b1f76", name: "Balenciaga" },
];

const FormAddProduct = () => {
  // State for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [stock, setStock] = useState(0);
  const [availabilityStatus, setAvailabilityStatus] = useState("InActive");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [types, setTypes] = useState([]);

  const navigate = useNavigate();
  // Fetch categories, tags, and types
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get("http://localhost:9999/api/category/get-all");
        const tagsResponse = await axios.get("http://localhost:9999/api/tag/get-all");
        const typesResponse = await axios.get("http://localhost:9999/api/type/get-all");
        setCategories(categoriesResponse.data);
        setTags(tagsResponse.data);
        setTypes(typesResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      title,
      description,
      price,
      category,
      tag,
      type,
      brand,
      images,
      thumbnail,
      stock,
      availabilityStatus,
    };

    try {
      await axios.post("http://localhost:9999/api/product/create", productData);
      console.log(productData);
      toast.success("Product added successfully!");
      // Set time for reload page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="border-t-2 ">
      <div className=" mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4 mt-5">
          <div className="grid grid-cols-10 gap-4">
            <div className="col-span-5 grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <Label className="mb-2">Title</Label>
                <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="flex flex-col">
                <Label className="mb-2">Description</Label>
                <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>
              <div className="flex flex-col">
                <Label className="mb-2">Price</Label>
                <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} readOnly />
              </div>
              <div className="flex flex-col">
                <Label className="mb-2">Category</Label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} required className="p-2 border border-gray-300 rounded-md">
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <Label className="mb-2">Tag</Label>
                <select value={tag} onChange={(e) => setTag(e.target.value)} required className="p-2 border border-gray-300 rounded-md">
                  <option value="">Select a tag</option>
                  {tags.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <Label className="mb-2">Type</Label>
                <select value={type} onChange={(e) => setType(e.target.value)} required className="p-2 border border-gray-300 rounded-md">
                  <option value="">Select a type</option>
                  {types.map((ty) => (
                    <option key={ty._id} value={ty._id}>
                      {ty.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <Label className="mb-2">Brand</Label>
                <select value={brand} onChange={(e) => setBrand(e.target.value)} required className="p-2 border border-gray-300 rounded-md">
                  <option value="">Select a brand</option>
                  {brandData.map((br) => (
                    <option key={br._id} value={br._id}>
                      {br.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col col-span-2">
                <Label className="mb-2">Images</Label>
                <Input type="text" value={images} onChange={(e) => setImages(e.target.value.split(","))} placeholder="Ex: URL1, URL2, ..." />
              </div>
              <div className="flex flex-col col-span-2">
                <Label className="mb-2">Thumbnail</Label>
                <Input type="text" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} placeholder="Paste 1 image URL" required />
              </div>
              <div className="flex flex-col">
                <Label className="mb-2">Stock</Label>
                <Input type="number" value={stock} onChange={(e) => setStock(e.target.value)} readOnly />
              </div>
              <div className="flex flex-col">
                <Label className="mb-2">Availability Status</Label>
                <select value={availabilityStatus} onChange={(e) => setAvailabilityStatus(e.target.value)} required className="p-2 border border-gray-300 rounded-md">
                  <option value="InActive">InActive</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Sold Out">Sold Out</option>
                </select>
              </div>
            </div>
            <div className="col-start-6 col-span-5 flex flex-col items-center justify-center">
              <Label className="mb-5">Thumbnail Preview</Label>
              {thumbnail ? (
                <img src={thumbnail} alt="Thumbnail Preview" className="w-full h-auto border border-gray-300 rounded-md" />
              ) : (
                <div className="w-3/5 h-40 flex items-center justify-center border border-gray-300 rounded-md">
                  <span>No Image</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="submit">Add Product</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddProduct;
