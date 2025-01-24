import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const EditProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  // Fetch product data when component mounts
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/allproducts/${id}`)
        setProduct(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch product details')
        setLoading(false)
        console.error('Error fetching product:', err)
      }
    }

    fetchProductData()
  }, [id])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }))
    // Clear submit error when user starts editing
    setSubmitError('')
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    // Basic validation
    if (!product.name.trim()) {
      setSubmitError('Product name is required')
      return
    }

    if (!product.description.trim()) {
      setSubmitError('Product description is required')
      return
    }

    if (isNaN(parseFloat(product.price)) || parseFloat(product.price) < 0) {
      setSubmitError('Please enter a valid positive price')
      return
    }

    try {
      // Submit updated product
      const response = await axios.put(`http://localhost:4000/updateproduct/${id}`, product)
      
      // Navigate back to product list or product details page
      navigate('/listproduct')
    } catch (err) {
      setSubmitError('Failed to update product')
      console.error('Error updating product:', err)
    }
  }

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    )
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Edit Product: {product.name}
        </h2>
      </div>

      {submitError && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md mt-4">
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {submitError}
          </div>
        </div>
      )}

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={product.name}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <div className="mt-1">
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={product.price}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProduct