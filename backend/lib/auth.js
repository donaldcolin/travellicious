const jwt = require('jsonwebtoken');

// Auth middleware for serverless functions
// Returns user object if valid, null if not authenticated
function verifyAuth(req) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.user;
    } catch (err) {
        return null;
    }
}

// Middleware wrapper that requires authentication
function requireAuth(handler) {
    return async (req, res) => {
        const user = verifyAuth(req);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'No token, authorization denied'
            });
        }

        req.user = user;
        return handler(req, res);
    };
}

module.exports = { verifyAuth, requireAuth };
