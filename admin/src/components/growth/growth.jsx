import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const Growth = () => {
  // Sample data for contacts over time
  const monthlyData = [
    { name: 'Jan', contacts: 45 },
    { name: 'Feb', contacts: 52 },
    { name: 'Mar', contacts: 61 },
    { name: 'Apr', contacts: 58 },
    { name: 'May', contacts: 63 },
    { name: 'Jun', contacts: 72 },
    { name: 'Jul', contacts: 88 },
    { name: 'Aug', contacts: 95 },
    { name: 'Sep', contacts: 102 },
    { name: 'Oct', contacts: 120 },
    { name: 'Nov', contacts: 125 },
    { name: 'Dec', contacts: 140 },
  ];

  const quarterlyData = [
    { name: 'Q1', contacts: 158 },
    { name: 'Q2', contacts: 193 },
    { name: 'Q3', contacts: 285 },
    { name: 'Q4', contacts: 385 },
  ];

  const yearlyData = [
    { name: '2021', contacts: 540 },
    { name: '2022', contacts: 720 },
    { name: '2023', contacts: 890 },
    { name: '2024', contacts: 1021 },
  ];

  return (
    <div className="pl-64 w-full bg-gray-50 min-h-screen">
      <div className="p-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Growth</CardTitle>
            <CardDescription>
              Number of people who have contacted our company over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="monthly" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
              
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
                  Monthly data for the current year
                </div>
              </TabsContent>
              
              <TabsContent value="quarterly">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={quarterlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="contacts" 
                        stroke="#82ca9d" 
                        strokeWidth={2}
                        name="Customer Contacts" 
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-center text-sm text-gray-500">
                  Quarterly data for the current year
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
                  Yearly growth over the past 4 years
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">1,021</div>
                  <p className="text-sm text-gray-500">Total Contacts This Year</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">+14.7%</div>
                  <p className="text-sm text-gray-500">Growth from Last Year</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">85</div>
                  <p className="text-sm text-gray-500">Average Monthly Contacts</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Growth;