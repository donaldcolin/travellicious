import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Loader2 } from 'lucide-react';

export const Growth = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [stats, setStats] = useState({
    totalThisYear: 0,
    growthPercentage: 0,
    monthlyAverage: 0
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/allcontact`);
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setContacts(data);
          processContactData(data);
        } else {
          setError("Invalid data format received");
        }
      } catch (error) {
        setError("Failed to fetch contacts");
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchContacts();
  }, [API_BASE_URL]);

  const processContactData = (contactData) => {
    // Group contacts by day, month and year
    const contactsByDay = {};
    const contactsByMonth = {};
    const contactsByYear = {};
    
    // Current date for comparisons
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    // Create counters for this year
    let thisYearContacts = 0;
    let lastYearContacts = 0;
    
    // Month names for display
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Process each contact
    contactData.forEach(contact => {
      // Use createdAt date or fallback to date field
      const contactDate = new Date(contact.createdAt || contact.date);
      if (!contactDate || isNaN(contactDate)) return; // Skip invalid dates
      
      const year = contactDate.getFullYear();
      const month = contactDate.getMonth();
      const day = contactDate.getDate();
      
      // Count for yearly stats
      if (year === currentYear) {
        thisYearContacts++;
      } else if (year === currentYear - 1) {
        lastYearContacts++;
      }
      
      // Group by day within current month and year
      if (year === currentYear && month === currentMonth) {
        const dayKey = day.toString();
        contactsByDay[dayKey] = (contactsByDay[dayKey] || 0) + 1;
      }
      
      // Group by month within current year
      if (year === currentYear) {
        const monthKey = monthNames[month];
        contactsByMonth[monthKey] = (contactsByMonth[monthKey] || 0) + 1;
      }
      
      // Group by year
      const yearKey = year.toString();
      contactsByYear[yearKey] = (contactsByYear[yearKey] || 0) + 1;
    });
    
    // Create days array for current month (1 to last day of month)
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const dailyChartData = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      return {
        name: day.toString(),
        contacts: contactsByDay[day.toString()] || 0
      };
    });
    
    // Convert to chart data format for months
    const monthlyChartData = monthNames.map(month => ({
      name: month,
      contacts: contactsByMonth[month] || 0
    }));
    
    // Sort years and create yearly chart data
    const sortedYears = Object.keys(contactsByYear).sort();
    const yearlyChartData = sortedYears.map(year => ({
      name: year,
      contacts: contactsByYear[year] || 0
    }));
    
    // Calculate growth percentage
    let growthPercentage = 0;
    if (lastYearContacts > 0) {
      growthPercentage = ((thisYearContacts - lastYearContacts) / lastYearContacts) * 100;
    }
    
    // Calculate monthly average
    const monthlyAverage = thisYearContacts / Math.max(
      currentDate.getMonth() + 1, // Use current month + 1 to get number of months so far this year
      1 // Ensure we don't divide by zero
    );
    
    setDailyData(dailyChartData);
    setMonthlyData(monthlyChartData);
    setYearlyData(yearlyChartData);
    
    setStats({
      totalThisYear: thisYearContacts,
      growthPercentage: growthPercentage.toFixed(1),
      monthlyAverage: Math.round(monthlyAverage)
    });
  };

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

  const currentMonthName = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Growth & Analytics</h1>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Contacts</CardDescription>
            <CardTitle className="text-3xl">{stats.totalThisYear}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This year
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Growth Rate</CardDescription>
            <CardTitle className="text-3xl">
              {stats.growthPercentage > 0 ? '+' : ''}{stats.growthPercentage}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Compared to last year
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly Average</CardDescription>
            <CardTitle className="text-3xl">{stats.monthlyAverage}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Contacts per month
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Contact Trends</CardTitle>
          <CardDescription>
            Number of people who have contacted our company over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="contacts" 
                      stroke="#4f46e5" 
                      strokeWidth={2}
                      name="Customer Contacts" 
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center text-sm text-gray-500">
                Daily data for {currentMonthName} {new Date().getFullYear()}
              </div>
            </TabsContent>
            
            <TabsContent value="monthly">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="contacts" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      name="Customer Contacts" 
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center text-sm text-gray-500">
                Monthly data for {new Date().getFullYear()}
              </div>
            </TabsContent>
            
            <TabsContent value="yearly">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={yearlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="contacts" 
                      stroke="#ff7300" 
                      strokeWidth={2}
                      name="Customer Contacts" 
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center text-sm text-gray-500">
                Yearly trends
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Growth;