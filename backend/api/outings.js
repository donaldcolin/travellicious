const connectDB = require('../lib/db');
const allowCors = require('../lib/cors');
const Outing = require('../models/outing');

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
                    // Get single outing by ID
                    const outing = await Outing.findOne({ id: Number(id) });
                    if (!outing) {
                        return res.status(404).json({
                            success: false,
                            message: `Outing with ID ${id} not found`
                        });
                    }
                    return res.status(200).json(outing);
                } else {
                    // Get all outings
                    const outings = await Outing.find({});
                    return res.status(200).json(outings);
                }

            case 'POST':
                // Add new outing
                const lastOuting = await Outing.findOne().sort({ id: -1 }).limit(1);
                const newId = lastOuting ? lastOuting.id + 1 : 1;

                const newOuting = new Outing({
                    id: newId,
                    ...req.body,
                });

                await newOuting.save();

                return res.status(201).json({
                    success: true,
                    message: 'Outing saved successfully',
                    product: newOuting,
                });

            case 'PUT':
                // Update outing
                const { id: bodyId, ...updateData } = req.body;
                const updated = await Outing.findOneAndUpdate(
                    { id: bodyId },
                    { $set: updateData },
                    { new: true }
                );

                if (!updated) {
                    return res.status(404).json({
                        success: false,
                        message: 'Outing not found'
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: 'Outing updated successfully',
                    product: updated,
                });

            case 'DELETE':
                const outingToDelete = await Outing.findOneAndDelete({ id: req.body.id });

                if (!outingToDelete) {
                    return res.status(404).json({
                        success: false,
                        message: 'Outing not found'
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: 'Outing removed successfully'
                });

            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                return res.status(405).json({ message: `Method ${method} Not Allowed` });
        }
    } catch (error) {
        console.error('Outings API error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

module.exports = allowCors(handler);
