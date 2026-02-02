const jwt = require('jsonwebtoken');
const User = require('../../models/Users');

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ 
                error: 'Access token required',
                message: 'Please provide a valid authentication token'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if user still exists
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ 
                error: 'Invalid token',
                message: 'User no longer exists'
            });
        }

        // Check if user account is active
        if (!user.isActive) {
            return res.status(401).json({ 
                error: 'Account deactivated',
                message: 'Your account has been deactivated'
            });
        }

        // Add user info to request
        req.userId = user._id;
        req.user = user;
        
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                error: 'Invalid token',
                message: 'Please provide a valid authentication token'
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                error: 'Token expired',
                message: 'Your session has expired. Please login again'
            });
        }

        console.error('Auth middleware error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: 'Authentication failed'
        });
    }
};

// Optional authentication - doesn't fail if no token
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId).select('-password');
            
            if (user && user.isActive) {
                req.userId = user._id;
                req.user = user;
            }
        }
        
        next();
    } catch (error) {
        // Continue without authentication for optional auth
        next();
    }
};

module.exports = {
    authenticateToken,
    optionalAuth
};