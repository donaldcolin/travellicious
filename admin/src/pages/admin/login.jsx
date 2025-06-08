import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LoginPage = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      // Validate token with the server
      fetch(`${API_BASE_URL}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        // Clear invalid tokens
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        return null;
      })
      .then(data => {
        if (data && data.user) {
          // Only allow admin users to access
          if (data.user.role !== 'admin') {
            setError('Access denied. Admin privileges required.');
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            return;
          }
          
          // Auto-login if we have a valid token
          if (onLoginSuccess) {
            onLoginSuccess(data.user, token);
          } else {
            window.location.href = '/admin';
          }
        }
      })
      .catch(err => {
        console.error('Auth check failed:', err);
      });
    }
  }, [onLoginSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData(prev => ({
      ...prev,
      remember: checked
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Check if user has admin role
        if (data.user.role !== 'admin') {
          setError('Access denied. Only administrators can log in to this panel.');
          setIsLoading(false);
          return;
        }
        
        // Store token based on remember me preference
        if (formData.remember) {
          localStorage.setItem('token', data.token);
        } else {
          sessionStorage.setItem('token', data.token);
        }
        
        // Pass user data to parent component if provided
        if (onLoginSuccess) {
          onLoginSuccess(data.user, data.token);
        } else {
          // Redirect to admin dashboard
          window.location.href = '/listproduct';
        }
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-black rounded-lg flex items-center justify-center mb-3">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <CardTitle className="text-2xl font-bold">Travellicious</CardTitle>
          <CardDescription className="text-base">Admin Portal | Sign In</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 pt-2">
            {/* Error Message */}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@travellicious.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 py-6"
                  required
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 py-6"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            {/* Remember Me */}
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="remember" 
                checked={formData.remember}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                Remember me
              </Label>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col pt-2">
            <Button 
              type="submit" 
              className="w-full bg-black hover:bg-gray-800 text-white py-6"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
            
            <p className="text-xs text-gray-500 text-center mt-6">
              © {new Date().getFullYear()} Travellicious. All rights reserved.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;