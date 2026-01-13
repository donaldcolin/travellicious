const connectDB = require('../lib/db');
const allowCors = require('../lib/cors');
const Contact = require('../models/Contact');

async function handler(req, res) {
    await connectDB();

    const { method } = req;

    try {
        switch (method) {
            case 'GET':
                // Get all contacts
                const contacts = await Contact.find({});
                return res.status(200).json(contacts);

            case 'POST':
                // Create new contact
                const { name, email, phone, date, status } = req.body;

                if (!name || !email || !phone) {
                    return res.status(400).json({
                        success: false,
                        message: 'Name, email, and phone are required fields.'
                    });
                }

                const newContact = new Contact({
                    name,
                    email,
                    phone,
                    date,
                    status
                });

                await newContact.save();

                return res.status(201).json({
                    success: true,
                    message: 'Contact saved successfully',
                    contact: newContact
                });

            case 'PUT':
                // Update contact
                const { _id } = req.body;
                const updateData = req.body;

                const updatedContact = await Contact.findByIdAndUpdate(_id, updateData, {
                    new: true
                });

                if (!updatedContact) {
                    return res.status(404).json({
                        success: false,
                        message: 'Contact not found'
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: 'Contact updated successfully',
                    contact: updatedContact
                });

            case 'DELETE':
                // Delete contact
                const { id } = req.body;
                const deletedContact = await Contact.findOneAndDelete({ _id: id });

                if (!deletedContact) {
                    return res.status(404).json({
                        success: false,
                        message: 'Contact not found'
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: 'Contact deleted successfully',
                    contact: deletedContact
                });

            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                return res.status(405).json({ message: `Method ${method} Not Allowed` });
        }
    } catch (error) {
        console.error('Contacts API error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

module.exports = allowCors(handler);
