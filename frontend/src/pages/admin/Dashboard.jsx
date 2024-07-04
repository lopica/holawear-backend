import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import { ChevronDown } from "lucide-react";
import "chart.js/auto";
import { parseISO, startOfWeek, startOfDay, subDays, format } from "date-fns";
import { DollarSign, Users, Receipt } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import TopProductsSold from "../../components/admin/TopProductsSold";
import RecentTransactions from "../../components/admin/RecentTransactions";

const Dashboard = () => {
  const transactionsData = [
    { name: "John Doe", date: "04.01.2024", amount: 100, status: "pending" },
    { name: "Jane Smith", date: "05.02.2024", amount: 150, status: "pending" },
    { name: "Alice Johnson", date: "14.03.2024", amount: 200, status: "paid" },
    { name: "Bob Williams", date: "04.03.2024", amount: 120, status: "pending" },
    { name: "Eva Brown", date: "30.05.2024", amount: 180, status: "paid" },
  ];
  const usersData = [
    {
      email: "teacher@gmail.com",
      password: "$2a$10$UY4fxakOtR0zjFzMfUsHROPEzwwtNXTsgoTwSKNl38VtBmnfJuuOm",
      username: "chungdt3",
      confirmPassword: "111111",
      id: 1,
      role: "admin",
      phone: "0123456789",
      address: "Ha Noi",
      gender: "men",
      createdAt: "2024-05-28T07:30:50.451+00:00",
      updatedAt: "2024-05-28T07:31:50.451+00:00",
      loginType: "system",
    },
    {
      email: "admin@fpt.edu.vn",
      password: "$2a$10$Ov.4O5NCiJ2lxF0jUX81zekROkGViwZbVVkIq3sDwrGNiqEblTfNu",
      username: "chungdt",
      confirmPassword: "111111",
      id: 2,
      role: "customer",
      phone: "0123456798",
      address: "Ha Noi",
      gender: "women",
      createdAt: "2024-05-28T07:32:04.900+00:00",
      updatedAt: "2024-05-28T07:31:50.451+00:00",
      loginType: "facebook",
    },
    {
      email: "tmoore@hotmail.com",
      password: "$2a$10$UY4fxakOtR0zjFzMfUsHROPEzwwtNXTsgoTwSKNl38VtBmnfJuuOm",
      username: "zgray",
      confirmPassword: "111111",
      id: 2,
      role: "admin",
      phone: "304-405-4000x694",
      address: "39842 Steven Row Port Amyside, MS 72766",
      gender: "men",
      createdAt: "2023-08-16T21:06:34.611200",
      updatedAt: "2023-08-16T22:01:34.611200",
      loginType: "system",
    },
    {
      email: "ohill@lopez.biz",
      password: "$2a$10$UY4fxakOtR0zjFzMfUsHROPEzwwtNXTsgoTwSKNl38VtBmnfJuuOm",
      username: "smithjames",
      confirmPassword: "111111",
      id: 3,
      role: "user",
      phone: "+1-323-477-0504x6524",
      address: "894 Mark Squares Suite 574 North Davidshire, NV 43244",
      gender: "women",
      createdAt: "2023-12-17T06:59:10",
      updatedAt: "2023-12-17T07:04:10",
      loginType: "system",
    },
    {
      email: "jacksonbriana@hotmail.com",
      password: "$2a$10$UY4fxakOtR0zjFzMfUsHROPEzwwtNXTsgoTwSKNl38VtBmnfJuuOm",
      username: "john73",
      confirmPassword: "111111",
      id: 4,
      role: "admin",
      phone: "(039)024-5565x8951",
      address: "241 Marc Stream Suite 787 Amberhaven, UT 46349",
      gender: "women",
      createdAt: "2023-11-23T00:35:50",
      updatedAt: "2023-11-23T00:45:50",
      loginType: "oauth",
    },
    {
      email: "zpeterson@yahoo.com",
      password: "$2a$10$UY4fxakOtR0zjFzMfUsHROPEzwwtNXTsgoTwSKNl38VtBmnfJuuOm",
      username: "christinarobinson",
      confirmPassword: "111111",
      id: 5,
      role: "admin",
      phone: "3043968358",
      address: "9513 Thompson Ville Heathertown, NJ 12277",
      gender: "men",
      createdAt: "2023-10-15T21:06:34.611200",
      updatedAt: "2023-10-15T21:11:34.611200",
      loginType: "oauth",
    },
    {
      email: "ramirezdenise@yahoo.com",
      password: "$2a$10$UY4fxakOtR0zjFzMfUsHROPEzwwtNXTsgoTwSKNl38VtBmnfJuuOm",
      username: "johnsonkimberly",
      confirmPassword: "111111",
      id: 6,
      role: "admin",
      phone: "+1-736-273-0578x969",
      address: "PSC 0431, Box 2217 APO AP 61430",
      gender: "men",
      createdAt: "2024-01-14T21:06:34.611200",
      updatedAt: "2024-01-14T22:04:34.611200",
      loginType: "oauth",
    },
    {
      email: "jerry51@johnson.com",
      password: "$2a$10$UY4fxakOtR0zjFzMfUsHROPEzwwtNXTsgoTwSKNl38VtBmnfJuuOm",
      username: "fletcherjason",
      confirmPassword: "111111",
      id: 7,
      role: "user",
      phone: "002-994-0411x5463",
      address: "797 Cole Vista Apt. 729 Roblesville, MO 56475",
      gender: "women",
      createdAt: "2023-07-27T21:06:34.611200",
      updatedAt: "2023-07-27T21:11:34.611200",
      loginType: "system",
    },
    {
      email: "codybrown@rogers.com",
      password: "$2a$10$UY4fxakOtR0zjFzMfUsHROPEzwwtNXTsgoTwSKNl38VtBmnfJuuOm",
      username: "paigejackson",
      confirmPassword: "111111",
      id: 8,
      role: "user",
      phone: "(005)654-2463x084",
      address: "3622 Freeman Street Lake Amberg, OR 74961",
      gender: "women",
      createdAt: "2023-10-03T21:06:34.611200",
      updatedAt: "2023-10-03T21:49:34.611200",
      loginType: "oauth",
    },
    {
      email: "crosbyanthony@yahoo.com",
      password: "$2a$10$UY4fxakOtR0zjFzMfUsHROPEzwwtNXTsgoTwSKNl38VtBmnfJuuOm",
      username: "hayneskimberly",
      confirmPassword: "111111",
      id: 9,
      role: "seller",
      phone: "+1-152-418-2502",
      address: "6291 Jason Station South Danielborough, VT 26831",
      gender: "women",
      createdAt: "2024-05-14T21:06:34.611200",
      updatedAt: "2024-05-14T22:02:34.611200",
      loginType: "system",
    },
    {
      email: "brianna17@yahoo.com",
      password: "$2a$10$UY4fxakOtR0zjFzMfUsHROPEzwwtNXTsgoTwSKNl38VtBmnfJuuOm",
      username: "daniel61",
      confirmPassword: "111111",
      id: 10,
      role: "admin",
      phone: "016.673.0380",
      address: "321 Riley Centers East Dianeport, AR 18936",
      gender: "women",
      createdAt: "2023-09-26T21:06:34.611200",
      updatedAt: "2023-09-26T21:20:34.611200",
      loginType: "system",
    },
  ];

  const ordersData = [
    {
      id: 1,
      userId: 1,
      createdAt: "2024-07-23T09:56:21.618Z",
      completedAt: "2024-07-23T09:59:21.618Z",
      amount: 5000000,
      status: "paid",
      products: [
        {
          id: 1,
          title: "Essence Mascara Lash Princess",
          price: 9.99,
          quantity: 2,
          total: 19.98,
          discountPercentage: 0.63,
          discountedTotal: 19.85,
          thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
        },
        {
          id: 60,
          title: "Grater Black",
          price: 10.99,
          quantity: 3,
          total: 32.97,
          discountPercentage: 16.62,
          discountedTotal: 27.49,
          thumbnail: "https://cdn.dummyjson.com/products/images/kitchen-accessories/Grater%20Black/thumbnail.png",
        },
        {
          id: 74,
          title: "Spoon",
          price: 4.99,
          quantity: 4,
          total: 19.96,
          discountPercentage: 2.78,
          discountedTotal: 19.41,
          thumbnail: "https://cdn.dummyjson.com/products/images/kitchen-accessories/Spoon/thumbnail.png",
        },
        {
          id: 44,
          title: "Family Tree Photo Frame",
          price: 29.99,
          quantity: 4,
          total: 119.96,
          discountPercentage: 10.68,
          discountedTotal: 107.15,
          thumbnail: "https://cdn.dummyjson.com/products/images/home-decoration/Family%20Tree%20Photo%20Frame/thumbnail.png",
        },
      ],
    },
    {
      id: 2,
      userId: 2,
      createdAt: "2024-05-23T08:50:21.618Z",
      completedAt: "2024-07-23T09:52:19.618Z",
      amount: 5000000,
      status: "pending",
      products: [],
    },
  ];

  const productsData = [
    {
      name: "Men Grey Hoodie",
      price: 99.9,
      unitsSold: 5,
      size: "M",
      imageUrl: "https://cf.shopee.vn/file/2a4f82caa336f18c42447958f25c88cf",
    },
    {
      name: "Women Striped T-Shirt",
      price: 54.9,
      unitsSold: 5,
      size: "L",
      imageUrl: "https://mochanstore.com/wp-content/uploads/2023/08/mochanstore.com-AO-HOOODIE-NAM-NU-FORM-RONG-VAI-NI-BONG-IN-HINH-DAU-LAU-TP85-PHUONG-STORE.jpg",
    },
    {
      name: "Women White T-Shirt",
      price: 24.7,
      unitsSold: 5,
      size: "S",
      imageUrl: "https://product.hstatic.net/200000521439/product/1692802006_h_23_4_look_042_e09_gh.jpg_5e7adfb8cbde4ff4847cec4cbe08052c.jpg",
    },
    {
      name: "Men White T-Shirt",
      price: 44.4,
      unitsSold: 5,
      size: "M",
      imageUrl: "https://owen.cdn.vccloud.vn/media/catalog/product/cache/d52d7e242fac6dae82288d9a793c0676/t/s/tsn231431_12.jpg",
    },
    {
      name: "Men White T-Shirt",
      price: 44.4,
      unitsSold: 5,
      size: "M",
      imageUrl: "https://owen.cdn.vccloud.vn/media/catalog/product/cache/d52d7e242fac6dae82288d9a793c0676/t/s/tsn231431_12.jpg",
    },
    {
      name: "Men White T-Shirt",
      price: 44.4,
      unitsSold: 5,
      size: "M",
      imageUrl: "https://owen.cdn.vccloud.vn/media/catalog/product/cache/d52d7e242fac6dae82288d9a793c0676/t/s/tsn231431_12.jpg",
    },
    {
      name: "Men White T-Shirt",
      price: 44.4,
      unitsSold: 5,
      size: "M",
      imageUrl: "https://owen.cdn.vccloud.vn/media/catalog/product/cache/d52d7e242fac6dae82288d9a793c0676/t/s/tsn231431_12.jpg",
    },
    {
      name: "Men White T-Shirt",
      price: 44.4,
      unitsSold: 5,
      size: "M",
      imageUrl: "https://owen.cdn.vccloud.vn/media/catalog/product/cache/d52d7e242fac6dae82288d9a793c0676/t/s/tsn231431_12.jpg",
    },
  ];

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const countRoles = (users) => {
    const counts = { admin: 0, seller: 0, user: 0 };
    users.forEach((user) => {
      if (counts[user.role] !== undefined) {
        counts[user.role]++;
      }
    });
    return counts;
  };

  const roleCounts = countRoles(usersData);

  const roleData = {
    labels: ["Admin", "Seller", "User"],
    datasets: [
      {
        data: [roleCounts.admin, roleCounts.seller, roleCounts.user],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
        hoverOffset: 4,
      },
    ],
  };

  const countOrdersPerMonth = (orders) => {
    const counts = Array(12).fill(0);
    orders.forEach((order) => {
      const month = parseISO(order.completedAt).getMonth();
      counts[month]++;
    });
    return counts;
  };

  const ordersPerMonth = countOrdersPerMonth(ordersData);

  const ordersDataChart = {
    labels: labels,
    datasets: [
      {
        label: "Orders Completed",
        data: ordersPerMonth,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: "blue",
          font: {
            size: 13,
          },
        },
        grid: {
          display: false,
        },
        title: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2,
        },
      },
    },
  };

  const totalRevenue = ordersData.reduce((acc, order) => acc + order.amount, 0);
  const ordersCount = ordersData.length;
  const activeSessions = 56; // Example static value
  const totalSessions = 56; // Example static value

  return (
    <div className="p-4">
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Total Revenue */}
          <div className="bg-white shadow-sm rounded-lg p-4 flex flex-col justify-between">
            <div className="grid grid-cols-3">
              <div className="col-span-2">
                <div>
                  <p className="text-xl font-semibold">{totalRevenue}₫</p>
                  <h2 className="text-base font-normal mt-2">Total Revenue</h2>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500">22.45% ↑</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-[#ecf2ff] rounded-full w-16 h-16 flex items-center justify-center">
                  <DollarSign size={20} color="#CA5E5E" />
                </div>
              </div>
            </div>
          </div>
          {/* Orders */}
          <div className="bg-white shadow-sm rounded-lg p-4 flex flex-col justify-between">
            <div className="grid grid-cols-3">
              <div className="col-span-2">
                <div>
                  <p className="text-xl font-semibold">{ordersCount}</p>
                  <h2 className="text-base font-normal mt-2">Orders</h2>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500">22.45% ↑</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-[#ecf2ff] rounded-full w-16 h-16 flex items-center justify-center">
                  <Receipt size={20} color="#CA5E5E" />
                </div>
              </div>
            </div>
          </div>
          {/* Active Sessions */}
          <div className="bg-white shadow-sm rounded-lg p-4 flex flex-col justify-between">
            <div className="grid grid-cols-3">
              <div className="col-span-2">
                <div>
                  <p className="text-xl font-semibold">{activeSessions}</p>
                  <h2 className="text-base font-normal mt-2">Active Sessions</h2>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500">2.45% ↓</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-[#ecf2ff] rounded-full w-16 h-16 flex items-center justify-center">
                  <Users size={20} color="#CA5E5E" />
                </div>
              </div>
            </div>
          </div>
          {/* Total Sessions */}
          <div className="bg-white shadow-sm rounded-lg p-4 flex flex-col justify-between">
            <div className="grid grid-cols-3">
              <div className="col-span-2">
                <div>
                  <p className="text-xl font-semibold">{totalSessions}</p>
                  <h2 className="text-base font-normal mt-2">Total Sessions</h2>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500">0.45% ↓</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-[#ecf2ff] rounded-full w-16 h-16 flex items-center justify-center">
                  <DollarSign size={20} color="#CA5E5E" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-sm rounded-lg p-4 col-span-2">
          <h2 className="text-xl font-bold mb-4">Orders Over Time</h2>
          <Line data={ordersDataChart} options={options} />
        </div>
        <div className="bg-white shadow-sm rounded-lg p-4 col-span-1">
          <h2 className="text-xl font-bold mb-4">User Roles Distribution</h2>
          <Pie data={roleData} options={options} />
        </div>
      </div>

      {/* Recent Transactions and Top Products */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <RecentTransactions transactionsData={transactionsData} />
        <TopProductsSold productsData={productsData} />
      </div>
    </div>
  );
};

export default Dashboard;
