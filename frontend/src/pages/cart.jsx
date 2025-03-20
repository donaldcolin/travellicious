import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowLeft, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      delay: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

const Cart = () => {
  // Placeholder for cart items (empty for now)
  const cartItems = [];
  const isCartEmpty = cartItems.length === 0;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white p-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-light tracking-tight text-gray-900">YOUR CART</h1>
          <p className="text-gray-500">Review and complete your purchase</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <Card className="border-none shadow-md bg-white/90 backdrop-blur-sm overflow-hidden">
              <CardHeader className="border-b pb-4">
                <CardTitle className="flex justify-between items-center">
                  <span className="text-xl font-medium">Items</span>
                  {!isCartEmpty && (
                    <span className="text-gray-500 text-sm">{cartItems.length} items</span>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                {isCartEmpty ? (
                  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative mb-6"
                    >
                      <ShoppingBag className="h-16 w-16 text-gray-300" strokeWidth={1} />
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [1, 0.8, 1]
                        }}
                        transition={{ 
                          repeat: Infinity,
                          duration: 2,
                          repeatType: "reverse" 
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <AlertCircle className="h-6 w-6 text-gray-400" />
                      </motion.div>
                    </motion.div>
                    <h2 className="text-xl font-medium text-gray-700 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-6 max-w-sm">
                      Looks like you haven't added any items to your cart yet. Explore our collection to find something you'll love.
                    </p>
                    <Link to="/home">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="bg-black hover:bg-gray-800 text-white font-medium">
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Explore Treks
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                ) : (
                  // This section would contain cart items when they exist
                  <div className="divide-y">
                    {/* Cart items would go here */}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Summary Section */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <Card className="border-none shadow-md bg-white/90 backdrop-blur-sm sticky top-6">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-xl font-medium">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="py-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes</span>
                    <span className="font-medium">₹0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">₹0.00</span>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹0.00</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-6">
                <motion.div 
                  className="w-full"
                  whileHover={!isCartEmpty ? { scale: 1.02 } : {}}
                  whileTap={!isCartEmpty ? { scale: 0.98 } : {}}
                >
                  <Button 
                    disabled={isCartEmpty}
                    className="w-full bg-black hover:bg-gray-800 text-white font-medium py-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Proceed to Checkout
                  </Button>
                </motion.div>
                <p className="text-xs text-center text-gray-500 mt-3">
                  Secure payment processing. All transactions encrypted.
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Cart;