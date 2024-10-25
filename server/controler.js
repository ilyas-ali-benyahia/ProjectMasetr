// controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./modele');

// Register a new user
const registerUser = async (req, res) => {
    const { username,email, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({token});
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
