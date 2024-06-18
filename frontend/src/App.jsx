import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import "./App.scss";

import HomePage from "./pages/main/HomePage";
import AboutPage from "./pages/main/AboutPage";
import NotFoundPage from "./pages/error/NotFoundPage";
import ProductDetail from "./pages/main/ProductDetail";
import ShoppingCart from "./pages/main/ShoppingCart";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UserProfile from "./pages/auth/UserProfile";
import LayoutUser from "./pages/auth/LayoutUser";

import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";
import ProductList from "./pages/main/ProductList";
import Layout from "./pages/admin/Layout";
import UserTable from "./components/UserTable";
import ManageUser from "./pages/admin/ManageUser";
import ManageOrder from "./pages/admin/ManageOrder";
import ManageProduct from "./pages/admin/ManageProduct";
import ManageType from "./pages/admin/ManageType";
import ManageCategory from "./pages/admin/ManageCategory";
import ManageBrand from "./pages/admin/ManageBrand";
import ManageColor from "./pages/admin/ManageColor";

import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import instance from "./axios/index";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loginTypes, setLoginTypes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [carts, setCarts] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const isAdminRoute = location.pathname.includes("/admin1");
  const isUserRoute = location.pathname.includes("/user1");

  useEffect(() => {
    (async () => {
      try {
        const productsData = (await instance.get("/products")).data;
        const categoriesData = (await instance.get("/categories")).data;
        const brandsData = (await instance.get("/brands")).data;
        const userData = (await instance.get("/users")).data;
        const roleData = (await instance.get("/roles")).data;
        const loginTypeData = (await instance.get("/loginTypes")).data;
        const ordersData = (await instance.get("/orders")).data;
        const cartsData = (await instance.get("/carts")).data;
        setProducts(productsData);
        setCategories(categoriesData);
        setBrands(brandsData);
        setUsers(userData);
        setRoles(roleData);
        setLoginTypes(loginTypeData);
        setOrders(ordersData);
        setCarts(cartsData);
        // console.log(carts);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {!isAdminRoute && <Header />}
      {/* <Header /> */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage products={products} categories={categories} brands={brands} />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/men" element={<ProductList products={products} category="men" />} />
          <Route path="/women" element={<ProductList products={products} category="women" />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/cart" element={<ShoppingCart cartsData={carts} />} />

          <Route path="/user1" element={<LayoutUser />}>
            <Route path="/user1/profile" element={<UserProfile />} />
          </Route>

          <Route path="/admin1" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route
              path="/admin1/dashboard"
              element={<Dashboard usersData={users} productsData={products} ordersData={orders} />}
            />
            <Route path="/admin1/add-product" element={<AddProduct />} />
            <Route path="/admin1/users" element={<ManageUser users={users} roles={roles} loginTypes={loginTypes} />} />
            <Route
              path="/admin1/products"
              element={<ManageProduct products={products} categories={categories} brands={brands} />}
            />
            <Route path="/admin1/types" element={<ManageType isType />} />
            <Route path="/admin1/brands" element={<ManageBrand isBrand />} />
            <Route path="/admin1/categories" element={<ManageCategory isCategory />} />
            <Route path="/admin1/colors" element={<ManageColor isColor />} />

            <Route
              path="/admin1/orders"
              element={<ManageOrder usersData={users} productsData={products} ordersData={orders} />}
            />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && !isUserRoute && <Footer />}
    </>
  );
}

export default App;
