const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dummy Database
const usersDB = [
    {
        id: "usr_101",
        username: "admin_user",
        passwordHash: "$2b$10$3K3rIH5OnjfStNSvQXq7MeCmuGSi4YmA812Jk5aU7c6AmAd/meEie"
    }
];

// Session Configuration
app.use(session({
    name: 'sid',
    secret: 'use-a-strong-32-byte-secret-key-here',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000
    }
}));

// Authentication Middleware
function requireAuth(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).json({
            error: "Unauthorized access. Please log in."
        });
    }

    // Prevent browser caching of sensitive data
    res.setHeader(
        'Cache-Control',
        'no-store, no-cache, must-revalidate, private'
    );
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    next();
}

// Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = usersDB.find(u => u.username === username);

    if (!user) {
        return res.status(401).json({
            error: "Invalid username or password"
        });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
        return res.status(401).json({
            error: "Invalid username or password"
        });
    }

    // Prevent Session Fixation
    req.session.regenerate((err) => {
        if (err) {
            return res.status(500).json({
                error: "Session creation error"
            });
        }

        req.session.user = {
            id: user.id,
            username: user.username
        };

        return res.status(200).json({
            message: "Login successful"
        });
    });
});

// Dashboard
app.get('/dashboard', requireAuth, (req, res) => {
    res.status(200).json({
        message: "Welcome to the secure dashboard",
        user: req.session.user
    });
});

// Logout
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                error: "Logout failed"
            });
        }

        res.clearCookie('__Host-sid');

        return res.status(200).json({
            message: "Logged out successfully"
        });
    });
});

	// Start Server
app.listen(3000, () => {
    console.log('Security Lab Server running on port 3000');
});
