const allowCors = require('../lib/cors');

async function handler(req, res) {
    return res.status(200).json({
        success: true,
        message: 'Travelicious API is running',
        version: '1.0.0',
        endpoints: [
            '/api/products',
            '/api/outings',
            '/api/reviews',
            '/api/contacts',
            '/api/gallery',
            '/api/users',
            '/api/upload'
        ]
    });
}

module.exports = allowCors(handler);
