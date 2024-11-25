// src/pages/Analytics.tsx
import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp,
  TrendingDown,
  Package,
  AlertTriangle,
  DollarSign,
  Users
} from 'lucide-react';

interface SalesData {
  month: string;
  sales: number;
  orders: number;
}

interface ProductData {
  name: string;
  value: number;
}

interface VerificationData {
  name: string;
  value: number;
}

const Analytics = () => {
  // Sample Data
  const salesData: SalesData[] = [
    { month: 'Jan', sales: 25000, orders: 120 },
    { month: 'Feb', sales: 35000, orders: 150 },
    { month: 'Mar', sales: 32000, orders: 140 },
    { month: 'Apr', sales: 40000, orders: 180 },
    { month: 'May', sales: 38000, orders: 170 },
    { month: 'Jun', sales: 45000, orders: 200 }
  ];

  const topProducts: ProductData[] = [
    { name: 'Biogesic', value: 35 },
    { name: 'Neozep', value: 25 },
    { name: 'Alaxan', value: 20 },
    { name: 'Decolgen', value: 15 },
    { name: 'Others', value: 5 }
  ];

  const verificationStats: VerificationData[] = [
    { name: 'Authentic', value: 85 },
    { name: 'Suspicious', value: 10 },
    { name: 'Counterfeit', value: 5 }
  ];

  const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9E9E9E'];
  const VERIFICATION_COLORS = ['#4CAF50', '#FFC107', '#F44336'];

  // Calculate metrics
  const currentMonthSales = salesData[salesData.length - 1].sales;
  const previousMonthSales = salesData[salesData.length - 2].sales;
  const salesGrowth = ((currentMonthSales - previousMonthSales) / previousMonthSales * 100).toFixed(1);

  const currentMonthOrders = salesData[salesData.length - 1].orders;
  const previousMonthOrders = salesData[salesData.length - 2].orders;
  const ordersGrowth = ((currentMonthOrders - previousMonthOrders) / previousMonthOrders * 100).toFixed(1);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-500">Track key metrics and business performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Sales */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Sales</p>
              <h3 className="text-2xl font-bold">${currentMonthSales.toLocaleString()}</h3>
            </div>
            <div className={`flex items-center ${Number(salesGrowth) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {Number(salesGrowth) >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
            </div>
          </div>
          <p className={`text-sm mt-2 ${Number(salesGrowth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {salesGrowth}% vs last month
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <h3 className="text-2xl font-bold">{currentMonthOrders}</h3>
            </div>
            <div className={`flex items-center ${Number(ordersGrowth) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {Number(ordersGrowth) >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
            </div>
          </div>
          <p className={`text-sm mt-2 ${Number(ordersGrowth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {ordersGrowth}% vs last month
          </p>
        </div>

        {/* Active Products */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Products</p>
              <h3 className="text-2xl font-bold">248</h3>
            </div>
            <Package size={24} className="text-blue-500" />
          </div>
          <p className="text-sm mt-2 text-gray-500">12 new this month</p>
        </div>

        {/* Verification Rate */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Verification Rate</p>
              <h3 className="text-2xl font-bold">95.2%</h3>
            </div>
            <AlertTriangle size={24} className="text-yellow-500" />
          </div>
          <p className="text-sm mt-2 text-gray-500">+2.1% vs last month</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Trend */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Sales Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#2196F3" 
                name="Sales ($)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Order Trend */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Order Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="orders" 
                fill="#4CAF50" 
                name="Orders"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topProducts}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {topProducts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Verification Statistics */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Verification Statistics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={verificationStats}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {verificationStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={VERIFICATION_COLORS[index % VERIFICATION_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;