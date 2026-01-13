const connectDB = require('../../lib/db');
const allowCors = require('../../lib/cors');
const { verifyAuth } = require('../../lib/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

async function handler(req, res) {
    await connectDB();

    const { method } = req;

    // Parse the action from the URL
    const urlParts = req.url.split('/').filter(Boolean);
    const action = urlParts[urlParts.length - 1];

    try {
        switch (method) {
            case 'POST':
                if (action === 'register') {
                    return await handleRegister(req, res);
                } else if (action === 'login') {
                    return await handleLogin(req, res);
                }
                break;

            case 'GET':
                if (action === 'me') {
                    return await handleGetMe(req, res);
                }
                break;

            case 'PUT':
                if (action === 'update-profile') {
                    return await handleUpdateProfile(req, res);
                } else if (!isNaN(action)) {
                    // Admin update user by ID
                    return await handleAdminUpdateUser(req, res, action);
                }
                break;

            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT']);
                return res.status(405).json({ message: `Method ${method} Not Allowed` });
        }

        return res.status(404).json({ message: 'Endpoint not found' });
    } catch (error) {
        console.error('Users API error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

async function handleRegister(req, res) {
    const { name, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({
            success: false,
            message: 'User already exists'
        });
    }

    user = new User({ name, email, password, role });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({
        success: true,
        message: 'Registration successful! Welcome aboard!',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
}

async function handleLogin(req, res) {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select('+password');
    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'Invalid credentials'
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: 'Invalid credentials'
        });
    }

    const payload = { user: { id: user.id } };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
        success: true,
        message: 'Login successful! Welcome back!',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
}

async function handleGetMe(req, res) {
    const authUser = verifyAuth(req);
    if (!authUser) {
        return res.status(401).json({
            success: false,
            message: 'No token, authorization denied'
        });
    }

    const user = await User.findById(authUser.id).select('-password');
    return res.status(200).json({
        success: true,
        message: 'User data retrieved successfully',
        user
    });
}

async function handleUpdateProfile(req, res) {
    const authUser = verifyAuth(req);
    if (!authUser) {
        return res.status(401).json({
            success: false,
            message: 'No token, authorization denied'
        });
    }

    const { name, email, password } = req.body;
    const user = await User.findById(authUser.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    if (name) user.name = name;
    if (email && email !== user.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: 'Email already in use'
            });
        }
        user.email = email;
    }

    if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
}

async function handleAdminUpdateUser(req, res, userId) {
    const authUser = verifyAuth(req);
    if (!authUser) {
        return res.status(401).json({
            success: false,
            message: 'No token, authorization denied'
        });
    }

    const requester = await User.findById(authUser.id);
    if (!requester || requester.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges required.'
        });
    }

    const { name, email, password, role } = req.body;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    if (name) user.name = name;
    if (role) user.role = role;

    if (email && email !== user.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: 'Email already in use'
            });
        }
        user.email = email;
    }

    if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    return res.status(200).json({
        success: true,
        message: 'User updated successfully',
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
}

module.exports = allowCors(handler);
