import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, DollarSign, Tag, Users } from 'lucide-react';

const Bought = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [recentPurchases, setRecentPurchases] = useState([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalCustomers: 0,
    topProduct: '',
    revenueThisMonth: 0
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/purchases`);
        if (!response.ok) {
          throw new Error('Failed to fetch purchases');
        }
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setPurchases(data);
          processPurchaseData(data);
        } else {
          setError("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching purchases:", error);
        // For demo purposes, generate mock data if API fails
        const mockData = generateMockData();
        setPurchases(mockData);
        processPurchaseData(mockData);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPurchases();
  }, [API_BASE_URL]);

  const generateMockData = () => {
    const products = [
      'Himalayan Expedition', 
      'Kashmir Valley Trek', 
      'Goa Beach Retreat', 
      'Kerala Backwaters Tour', 
      'Rajasthan Desert Safari',
      'Ladakh Adventure',
      'Andaman Islands Escape',
      'Varanasi Spiritual Tour'
    ];
    
    const locations = [
      'Himachal Pradesh', 
      'Kashmir', 
      'Goa', 
      'Kerala', 
      'Rajasthan',
      'Ladakh',
      'Andaman & Nicobar',
      'Uttar Pradesh'
    ];
    
    const customerNames = [
      'Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 
      'Joshi', 'Reddy', 'Iyer', 'Agarwal', 'Verma',
      'Nair', 'Mehta', 'Desai', 'Shah', 'Kapoor',
      'Malhotra', 'Chopra', 'Bose', 'Das', 'Banerjee'
    ];
    
    const mockData = [];
    
    // Generate 50 random purchase records
    for (let i = 0; i < 50; i++) {
      const productIndex = Math.floor(Math.random() * products.length);
      const dateOffset = Math.floor(Math.random() * 180); // past 6 months
      const date = new Date();
      date.setDate(date.getDate() - dateOffset);
      
      const customerIndex = Math.floor(Math.random() * customerNames.length);
      const customerName = customerNames[customerIndex];
      
      mockData.push({
        id: `order-${i+1000}`,
        product: products[productIndex],
        location: locations[productIndex],
        category: productIndex % 3 === 0 ? 'Trek' : (productIndex % 3 === 1 ? 'Tour' : 'Retreat'),
        customer: `${customerName} Family`,
        email: `${customerName.toLowerCase()}${Math.floor(Math.random() * 1000)}@gmail.com`,
        price: Math.floor(Math.random() * 40000) + 10000, // Prices in INR
        date: date.toISOString(),
        status: Math.random() > 0.2 ? 'Completed' : 'Processing',
        paymentMethod: Math.random() > 0.5 ? 'UPI' : (Math.random() > 0.5 ? 'Net Banking' : 'Credit Card')
      });
    }
    
    return mockData;
  };

  const processPurchaseData = (data) => {
    // Get product distribution for pie chart
    const productCount = {};
    const categoryRevenue = {};
    const monthlyRevenue = {};
    let totalSales = 0;
    let totalRevenue = 0;
    const uniqueCustomers = new Set();
    const productRevenue = {};
    
    // Current month
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    let currentMonthRevenue = 0;
    
    // Get the 10 most recent purchases
    const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    const recent = sorted.slice(0, 10);
    
    // Process each purchase
    data.forEach(purchase => {
      const { product, category, customer, price, date } = purchase;
      
      // Count product frequency
      productCount[product] = (productCount[product] || 0) + 1;
      
      // Sum revenue by category
      categoryRevenue[category] = (categoryRevenue[category] || 0) + price;
      
      // Track product revenue
      productRevenue[product] = (productRevenue[product] || 0) + price;
      
      // Track monthly revenue
      const purchaseDate = new Date(date);
      const monthKey = `${purchaseDate.getFullYear()}-${purchaseDate.getMonth()+1}`;
      monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + price;
      
      // Current month revenue
      if (purchaseDate.getMonth() === currentMonth && 
          purchaseDate.getFullYear() === currentYear) {
        currentMonthRevenue += price;
      }
      
      // Unique customers
      uniqueCustomers.add(customer);
      
      // Total sales and revenue
      totalSales++;
      totalRevenue += price;
    });
    
    // Create pie chart data
    const pieChartData = Object.entries(productCount).map(([name, value]) => ({
      name,
      value
    }));
    
    // Create bar chart data for category revenue
    const barChartData = Object.entries(categoryRevenue).map(([name, value]) => ({
      name,
      value
    }));
    
    // Find top selling product
    let topProduct = '';
    let topRevenue = 0;
    Object.entries(productRevenue).forEach(([product, revenue]) => {
      if (revenue > topRevenue) {
        topRevenue = revenue;
        topProduct = product;
      }
    });
    
    // Set state with processed data
    setPieData(pieChartData);
    setBarData(barChartData);
    setRecentPurchases(recent);
    setStats({
      totalSales,
      totalCustomers: uniqueCustomers.size,
      topProduct,
      revenueThisMonth: currentMonthRevenue
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return "N/A";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Colors for the charts - inspired by Indian flag and cultural colors
  const COLORS = ['#FF9933', '#138808', '#000080', '#800080', '#C51E3A', '#FFD700'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-2rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Package Bookings Dashboard</h1>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardDescription className="text-amber-800">Total Bookings</CardDescription>
              <CardTitle className="text-3xl text-amber-900">{stats.totalSales}</CardTitle>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-200 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-amber-700" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-amber-700">
              Packages purchased
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardDescription className="text-green-800">Total Guests</CardDescription>
              <CardTitle className="text-3xl text-green-900">{stats.totalCustomers}</CardTitle>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-200 flex items-center justify-center">
              <Users className="h-5 w-5 text-green-700" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700">
              Unique families
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardDescription className="text-blue-800">Most Popular</CardDescription>
              <CardTitle className="text-lg truncate max-w-[160px] text-blue-900">{stats.topProduct}</CardTitle>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center">
              <Tag className="h-5 w-5 text-blue-700" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-700">
              Top destination
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardDescription className="text-purple-800">Monthly Revenue</CardDescription>
              <CardTitle className="text-2xl text-purple-900">{formatCurrency(stats.revenueThisMonth)}</CardTitle>
            </div>
            <div className="h-10 w-10 rounded-full bg-purple-200 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-purple-700" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-purple-700">
              Current month
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="border-orange-200">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-white">
            <CardTitle className="text-lg text-orange-800">Destination Popularity</CardTitle>
            <CardDescription className="text-orange-600">
              Breakdown of packages booked by guests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} bookings`, 'Quantity']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-50 to-white">
            <CardTitle className="text-lg text-green-800">Revenue by Category</CardTitle>
            <CardDescription className="text-green-600">
              Total earnings per package type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                  <Legend />
                  <Bar dataKey="value" name="Revenue" fill="#138808" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Purchases Table */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
          <CardTitle className="text-lg text-blue-800">Recent Bookings</CardTitle>
          <CardDescription className="text-blue-600">
            Latest travel packages purchased
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-blue-50">
                <TableRow>
                  <TableHead>Package</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPurchases.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell className="font-medium">
                      <div>
                        {purchase.product}
                        <div className="text-xs text-muted-foreground">{purchase.location}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        {purchase.customer}
                        <div className="text-xs text-muted-foreground">{purchase.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(purchase.date)}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(purchase.price)}</TableCell>
                    <TableCell>
                      <span className="text-xs font-medium">
                        {purchase.paymentMethod || 'UPI'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        purchase.status === 'Completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {purchase.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bought;