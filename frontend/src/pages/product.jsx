import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ProductDisplay } from "../component/productdisplay/ProductDisplay";

export const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Modify the URL to match your exact backend endpoint
        const response = await axios.get(`http://localhost:4000/allproducts/${productId}`);
        
        // Log the response to understand the data structure
        console.log('Product Data:', response.data);
        
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        
        // More detailed error handling
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError({
            message: error.response.data.message || 'Failed to fetch product',
            status: error.response.status
          });
        } else if (error.request) {
          // The request was made but no response was received
          setError({
            message: 'No response received from server',
            status: null
          });
        } else {
          // Something happened in setting up the request that triggered an Error
          setError({
            message: 'Error setting up the request',
            status: null
          });
        }
        
        setLoading(false);
      }
    };

    // Only fetch if productId is available
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Fetching Product</h2>
        <p className="text-gray-700 mb-2">Status: {error.status || 'Unknown'}</p>
        <p className="text-gray-600">{error.message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  // No product found
  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-600">Product Not Found</h2>
      </div>
    );
  }

  // Render product display
  return <ProductDisplay product={product} />;
};

export default ProductPage;