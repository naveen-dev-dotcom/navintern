const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./model/registrationschema'); // Replace with the correct path to your schema
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

/* POST user registration with bcrypt */


router.post('/register', async (req, res) => {
  const { name, email, password, agreeToTerms, plan } = req.body;

  

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      agreeToTerms,
      plan
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

/* POST login route */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Normalize the email (remove spaces and convert to lowercase)
    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Log both the entered password and the stored hash to debug
    console.log("Entered Password:", password); // Log the entered password
    console.log("Stored Hash:", user.password); // Log the stored hash

    // Compare the plain-text password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Is Password Valid:", isPasswordValid); // Log the result of comparison

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Respond with success
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});


module.exports = router;
