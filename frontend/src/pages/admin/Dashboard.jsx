import React from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import { parseISO } from "date-fns";
import { DollarSign, Users, Receipt } from "lucide-react";
import TopProductsSold from "../../components/admin/TopProductsSold";
import RecentTransactions from "../../components/admin/RecentTransactions";

const Dashboard = ({ usersData, ordersData }) => {
  const transactionsData = [
    { name: "John Doe", date: "04.01.2024", amount: 100, status: "pending" },
    { name: "Jane Smith", date: "05.02.2024", amount: 150, status: "pending" },
    { name: "Alice Johnson", date: "14.03.2024", amount: 200, status: "paid" },
    { name: "Bob Williams", date: "04.03.2024", amount: 120, status: "pending" },
    { name: "Eva Brown", date: "30.05.2024", amount: 180, status: "paid" },
    // Add more data if needed
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
      imageUrl:
        "https://mochanstore.com/wp-content/uploads/2023/08/mochanstore.com-AO-HOOODIE-NAM-NU-FORM-RONG-VAI-NI-BONG-IN-HINH-DAU-LAU-TP85-PHUONG-STORE.jpg",
    },
    {
      name: "Women White T-Shirt",
      price: 24.7,
      unitsSold: 5,
      size: "S",
      imageUrl:
        "https://product.hstatic.net/200000521439/product/1692802006_h_23_4_look_042_e09_gh.jpg_5e7adfb8cbde4ff4847cec4cbe08052c.jpg",
    },
    {
      name: "Men White T-Shirt",
      price: 44.4,
      unitsSold: 5,
      size: "M",
      imageUrl:
        "https://owen.cdn.vccloud.vn/media/catalog/product/cache/d52d7e242fac6dae82288d9a793c0676/t/s/tsn231431_12.jpg",
    },
    {
      name: "Men White T-Shirt",
      price: 44.4,
      unitsSold: 5,
      size: "M",
      imageUrl:
        "https://owen.cdn.vccloud.vn/media/catalog/product/cache/d52d7e242fac6dae82288d9a793c0676/t/s/tsn231431_12.jpg",
    },
    {
      name: "Men White T-Shirt",
      price: 44.4,
      unitsSold: 5,
      size: "M",
      imageUrl:
        "https://owen.cdn.vccloud.vn/media/catalog/product/cache/d52d7e242fac6dae82288d9a793c0676/t/s/tsn231431_12.jpg",
    },
    {
      name: "Men White T-Shirt",
      price: 44.4,
      unitsSold: 5,
      size: "M",
      imageUrl:
        "https://owen.cdn.vccloud.vn/media/catalog/product/cache/d52d7e242fac6dae82288d9a793c0676/t/s/tsn231431_12.jpg",
    },
    {
      name: "Men White T-Shirt",
      price: 44.4,
      unitsSold: 5,
      size: "M",
      imageUrl:
        "https://owen.cdn.vccloud.vn/media/catalog/product/cache/d52d7e242fac6dae82288d9a793c0676/t/s/tsn231431_12.jpg",
    },
  ];

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const countUsersPerMonth = (users) => {
    const counts = Array(12).fill(0);
    users.forEach((user) => {
      const month = parseISO(user.createdAt).getMonth();
      counts[month]++;
    });
    return counts;
  };

  const countOrdersPerMonth = (orders) => {
    const counts = Array(12).fill(0);
    orders.forEach((order) => {
      const month = parseISO(order.completedAt).getMonth();
      counts[month]++;
    });
    return counts;
  };

  const usersPerMonth = countUsersPerMonth(usersData);
  const ordersPerMonth = countOrdersPerMonth(ordersData);

  const usersDataChart = {
    labels: labels,
    datasets: [
      {
        label: "Users Created",
        data: usersPerMonth,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

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
          font: { size: 13 },
        },
        grid: { display: false },
        title: { display: false },
      },
      y: {
        beginAtZero: true,
        max: 10,
        ticks: { stepSize: 2 },
      },
    },
  };
  const totalRevenue = ordersData.reduce((acc, order) => acc + order.amount, 0);
  const ordersCount = ordersData.length;
  const activeSessions = 56; // Example static value
  const totalSessions = 56; // Example static value

  return (
    <div className="p-4">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-3xl">{usersData.length}</p>
            <h2 className="text-xl font-normal">Total Accounts</h2>
          </div>
          <div className="bg-[#ecf2ff] rounded-full w-12 h-12 flex items-center justify-center">
            <Users size={20} color="#CA5E5E" />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-3xl">{ordersData.length}</p>
            <h2 className="text-xl font-normal">Orders</h2>
          </div>
          <div className="bg-[#ecf2ff] rounded-full w-12 h-12 flex items-center justify-center">
            <Receipt size={20} color="#CA5E5E" />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="text-3xl">${ordersData.reduce((acc, order) => acc + order.amount, 0)}</p>
            <h2 className="text-xl font-normal">Total Revenue</h2>
          </div>
          <div className="bg-[#ecf2ff] rounded-full w-12 h-12 flex items-center justify-center">
            <DollarSign size={20} color="#CA5E5E" />
          </div>
        </div>
      </div> */}
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

        <div className="bg-white shadow-sm rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Users Created Over Time</h2>
          <Bar data={usersDataChart} options={options} />
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
