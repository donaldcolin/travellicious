import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster, toast } from "react-hot-toast";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [category, setCategory] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/gallery`);
      setImages(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Failed to fetch images');
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleUpload = async () => {
    if (!category || !categoryDescription || selectedFiles.length === 0) {
      toast.error('Please fill in all fields and select at least one image');
      return;
    }

    setUploading(true);
    const uploadPromises = selectedFiles.map(async (file) => {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('category', category);
      formData.append('categoryDescription', categoryDescription);

      try {
        await axios.post(`${API_BASE_URL}/gallery`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
      }
    });

    try {
      await Promise.all(uploadPromises);
      toast.success('Images uploaded successfully');
      setSelectedFiles([]);
      setCategory('');
      setCategoryDescription('');
      fetchImages();
    } catch (error) {
      toast.error('Failed to upload some images');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/gallery/${id}`);
      toast.success('Image deleted successfully');
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    }
  };

  const removeSelectedFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Group images by category
  const groupedImages = images.reduce((acc, image) => {
    if (!acc[image.category]) {
      acc[image.category] = {
        images: [],
        description: image.categoryDescription
      };
    }
    acc[image.category].images.push(image);
    return acc;
  }, {});

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-6">Gallery Management</h1>

      {/* Upload Section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Upload New Images</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category Description</label>
              <Textarea
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                placeholder="Enter category description"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Select Images</label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="mb-2"
              />
              {selectedFiles.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium mb-2">Selected Files:</p>
                  <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{file.name}</span>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeSelectedFile(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Button
              onClick={handleUpload}
              disabled={uploading || selectedFiles.length === 0}
              className="w-full"
            >
              {uploading ? 'Uploading...' : 'Upload Images'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Gallery Display */}
      <div className="space-y-8">
        {Object.entries(groupedImages).map(([category, { images: categoryImages, description }]) => (
          <div key={category} className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{category}</h2>
              <p className="text-gray-600">{description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryImages.map((image) => (
                <Card key={image._id} className="relative group">
                  <CardContent className="p-0">
                    <img
                      src={image.imageUrl}
                      alt={category}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => handleDelete(image._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
