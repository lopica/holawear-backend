import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

const FormAddProduct = () => {
  //useEffect to get category, tag, type , brand
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const categoriesData = (await axios.get("http://localhost:9999/api/category/get-all")).data;
        const brandsData = (await axios.get("/brands")).data;
        const tagsData = (await axios.get("http://localhost:9999/api/tag/get-all")).data;
        const typesData = (await axios.get("/types")).data;

        setCategory(categoriesData);
        setBrand(brandsData);
        setTag(tagsData);
        setType(typesData);

        console.log(categoriesData);
        console.log(brandsData);
        console.log(tagsData);
        console.log(typesData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  //availabilityStatus : In Stock, Sold Out , InActive
  //title, description, price(default = 0, can't change), category, tag, images(array), thumbnail(1 image), stock, price(default = 0), stockDetails(default = null), availabilityStatus(default = InActive)
  return <div>FormAddProduct</div>;
};

export default FormAddProduct;
