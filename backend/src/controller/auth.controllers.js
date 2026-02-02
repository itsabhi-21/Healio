const User = require('../../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function signup(req, res) {
    const { firstName, lastName, email, password } = req.body;
    
    try {
        console.log('Signup attempt:', { firstName, lastName, email, passwordLength: password?.length });
        
        // Validate input
        if (!firstName || !lastName || !email || !password) {
            console.log('Validation failed: Missing required fields');
            return res.status(400).json({ 
                error: 'All fields are required',
                details: 'firstName, lastName, email, and password are required'
            });
        }

        // Check if user already exists
        console.log('Checking if user exists with email:', email);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        // Hash password
        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Create new user
        console.log('Creating new user...');
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        
        console.log('Saving user to database...');
        await newUser.save();
        console.log('User saved successfully');

        // Generate JWT token
        console.log('Generating JWT token...');
        const token = jwt.sign(
            { userId: newUser._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );

        console.log('Signup successful for user:', newUser._id);
        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                fullName: newUser.fullName
            }
        });
    } catch (error) {
        console.error('Error in Signup:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ 
            error: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    
    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ 
                error: 'Email and password are required' 
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                fullName: user.fullName,
                lastLogin: user.lastLogin
            }
        });
    } catch (error) {
        console.error('Error in Login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get current user profile
async function getProfile(req, res) {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                dateOfBirth: user.dateOfBirth,
                gender: user.gender,
                location: user.location,
                fullName: user.fullName,
                age: user.age,
                preferences: user.preferences,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin
            }
        });
    } catch (error) {
        console.error('Error in getProfile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Update user profile
async function updateProfile(req, res) {
    try {
        const updates = req.body;
        const allowedUpdates = [
            'firstName', 'lastName', 'phone', 'dateOfBirth', 
            'gender', 'location', 'preferences'
        ];
        
        // Filter only allowed updates
        const filteredUpdates = {};
        Object.keys(updates).forEach(key => {
            if (allowedUpdates.includes(key)) {
                filteredUpdates[key] = updates[key];
            }
        });

        const user = await User.findByIdAndUpdate(
            req.userId, 
            filteredUpdates, 
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                dateOfBirth: user.dateOfBirth,
                gender: user.gender,
                location: user.location,
                fullName: user.fullName,
                age: user.age,
                preferences: user.preferences
            }
        });
    } catch (error) {
        console.error('Error in updateProfile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    signup,
    login,
    getProfile,
    updateProfile
};