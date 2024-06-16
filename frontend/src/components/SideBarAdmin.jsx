import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { FaGithub, FaBox, FaRegFileAlt, FaRegUser } from "react-icons/fa";
import { SlLayers } from "react-icons/sl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"; // Adjust this import according to your project structure

const SideBarAdmin = () => {
  const isCollapsed = false; // Set to false since collapse functionality is removed

  return (
    <div className="h-screen w-64 p-4 shadow-lg transition-all duration-300">
      <div className="text-center mb-4">
        <img src="https://via.placeholder.com/150" alt="Profile" className="w-12 h-12 rounded-full mx-auto mb-2" />
        <div>
          <p className="text-sm font-semibold">Hi Chung</p>
          <p className="text-xs text-gray-500">@admin</p>
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="dashboard">
          <Link to="/dashboard" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded font-medium">
            <AiOutlineDashboard className="mr-3" />
            {!isCollapsed && "Dashboard"}
          </Link>
        </AccordionItem>
        <AccordionItem value="crud">
          <AccordionTrigger className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded">
            <SlLayers className="mr-3" />
            {!isCollapsed && "Manage"}
          </AccordionTrigger>
          <AccordionContent>
            <ul className="pl-8 space-y-2">
              <li>
                <Link to="/users" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded">
                  <FaRegUser className="mr-3" />
                  {!isCollapsed && "Users"}
                </Link>
              </li>
              <li>
                <Link to="/products" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded">
                  <FaBox className="mr-3" />
                  {!isCollapsed && "Products"}
                </Link>
              </li>
              <li>
                <Link to="/types" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded">
                  <FaBox className="mr-3" />
                  {!isCollapsed && "Types"}
                </Link>
              </li>
              <li>
                <Link to="/brands" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded">
                  <FaBox className="mr-3" />
                  {!isCollapsed && "Brands"}
                </Link>
              </li>
              <li>
                <Link to="/categories" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded">
                  <FaBox className="mr-3" />
                  {!isCollapsed && "Categories"}
                </Link>
              </li>
              <li>
                <Link to="/colors" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded">
                  <FaBox className="mr-3" />
                  {!isCollapsed && "Colors"}
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="settings">
          <Link to="/settings" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded font-medium">
            <HiOutlineCog6Tooth className="mr-3" />
            {!isCollapsed && "Settings"}
          </Link>
        </AccordionItem>
        <AccordionItem value="pages">
          <AccordionTrigger className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded">
            <FaRegFileAlt className="mr-3" />
            {!isCollapsed && "Pages"}
          </AccordionTrigger>
          <AccordionContent>
            <ul className="pl-8 space-y-2">
              <li>
                <Link to="/about" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded">
                  {!isCollapsed && "About"}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded">
                  {!isCollapsed && "Contact"}
                </Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="github">
          <Link to="/github" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded">
            <FaGithub className="mr-3" />
            {!isCollapsed && "GitHub Repository"}
          </Link>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SideBarAdmin;
