const connectDB = require('../lib/db');
const allowCors = require('../lib/cors');
const Product = require('../models/Product');

async function handler(req, res) {
    await connectDB();

    const { method } = req;

    // Handle dynamic route parameter
    const urlParts = req.url.split('/');
    const id = urlParts[urlParts.length - 1];
    const isIdRoute = id && !isNaN(id);

    try {
        switch (method) {
            case 'GET':
                if (isIdRoute) {
                    // Get single product by ID
                    const product = await Product.findOne({ id: Number(id) });
                    if (!product) {
                        return res.status(404).json({
                            success: false,
                            message: `Product with ID ${id} not found`
                        });
                    }
                    return res.status(200).json(product);
                } else {
                    // Get all products
                    const products = await Product.find({});
                    return res.status(200).json(products);
                }

            case 'POST':
                // Add new product
                const lastProduct = await Product.findOne().sort({ id: -1 }).limit(1);
                const newId = lastProduct ? lastProduct.id + 1 : 1;

                const newProduct = new Product({
                    id: newId,
                    ...req.body,
                });

                await newProduct.save();

                return res.status(201).json({
                    success: true,
                    message: 'Product saved successfully',
                    product: newProduct,
                });

            case 'PUT':
                if (isIdRoute) {
                    // Update product by URL parameter ID
                    const updatedProduct = await Product.findOneAndUpdate(
                        { id: Number(id) },
                        { $set: req.body },
                        { new: true }
                    );

                    if (!updatedProduct) {
                        return res.status(404).json({
                            success: false,
                            message: 'Product not found'
                        });
                    }

                    return res.status(200).json({
                        success: true,
                        message: 'Product updated successfully',
                        product: updatedProduct,
                    });
                } else {
                    // Update product by body ID
                    const { id: bodyId, ...updateData } = req.body;
                    const updated = await Product.findOneAndUpdate(
                        { id: bodyId },
                        { $set: updateData },
                        { new: true }
                    );

                    if (!updated) {
                        return res.status(404).json({
                            success: false,
                            message: 'Product not found'
                        });
                    }

                    return res.status(200).json({
                        success: true,
                        message: 'Product updated successfully',
                        product: updated,
                    });
                }

            case 'DELETE':
                const productToDelete = await Product.findOneAndDelete({ id: req.body.id });

                if (!productToDelete) {
                    return res.status(404).json({
                        success: false,
                        message: 'Product not found'
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: 'Product removed successfully'
                });

            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                return res.status(405).json({ message: `Method ${method} Not Allowed` });
        }
    } catch (error) {
        console.error('Products API error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

module.exports = allowCors(handler);
