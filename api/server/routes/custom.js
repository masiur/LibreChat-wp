const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('~/models');
const { setAuthTokens } = require('~/server/services/AuthService');

// Custom login route
router.get('/login', async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    const jwtToken = process.env.JWT_SECRET;
    // Verify the token from WordPress
    const decoded = jwt.verify(token, jwtToken);

    // Check if the user exists in your MongoDB by email
    let user = await User.findOne({ email: decoded.email });

    if (user) {
      // User exists, manually handle login by generating your app's own JWT token
      const newToken = await setAuthTokens(user._id, res);

      // Destructure user object to exclude sensitive data
      const { password: _, __v, ...userWithoutSensitiveInfo } = user.toObject();
      userWithoutSensitiveInfo.id = user._id.toString();

      // Redirect the user to /c/new after successful login
      return res.redirect('/c/new');

    } else {
      // User does not exist, so create a new one
      const newUser = new User({
        email: decoded.email,
        username: decoded.username || decoded.name, // Set username, fallback to name if no username is provided
        name: decoded.name // Optional: Use this if you want to store name separately
      });

      // Save the new user in the database
      await newUser.save();

      // Generate a token for the newly created user
      const newToken = await setAuthTokens(newUser._id, res);

      // Destructure the new user object to exclude sensitive data
      const { password: _, __v, ...newUserWithoutSensitiveInfo } = newUser.toObject();
      newUserWithoutSensitiveInfo.id = newUser._id.toString();

      // Redirect the new user to /c/new after successful login
      return res.redirect('/c/new');
    }

  } catch (err) {
    // Handle invalid or expired tokens
    console.error('Token verification failed:', err.message);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
});

module.exports = router;
