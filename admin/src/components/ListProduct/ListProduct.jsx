import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListProduct.css'

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/allproducts');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle product removal
  const handleRemove = async (id) => {
    try {
      await axios.post('http://localhost:4000/removeproduct', { id });
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  // Handle product edit (Here you can create a modal or a separate edit page)
  const handleEdit = (id) => {
    // Redirect to the edit page with the product ID
    window.location.href = `/editproduct/${id}`;
  };

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <div className="product-info">
                <p><strong>Name:</strong> {product.name}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Location:</strong> {product.location}</p>
              </div>
              <div className="product-actions">
                <button onClick={() => handleEdit(product.id)}>Edit</button>
                <button onClick={() => handleRemove(product.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListProduct;