var express = require('express');
var router = express.Router();
var registrationSchema = require('./model/registrationschema');
var bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");

router.post('/userlogin', async function (req, res, next) {
  const { email, password } = req.body;

  try {
    console.log('Received login request for:', email);

    // Check if the email exists in the database
    const userDetails = await registrationSchema.findOne({ email });

    if (!userDetails) {
      return res.status(404).json({
        message: "No user found",
      });
    }

    // Compare the provided password with the saved hashed password
    const savedPwd = userDetails.password;
    const isPwdValid = await bcrypt.compare(password, savedPwd);

    if (!isPwdValid) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    // Check if the user's plan has expired
    const curTime = new Date();
    const expiryTime = new Date(userDetails.endDate); // Ensure endDate is a valid date object

    if (curTime > expiryTime) {
      return res.status(403).json({
        message: "Plan expired. Please upgrade!",
        expiredUserId: userDetails._id, // Include the user ID here
      });
    }

    // Generate JWT token
    const SECRET = process.env.JWT_SECRET;
    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });

    // Successful login
    return res.status(200).json({
      message: "Login successful",
      userDetails: {
        email: userDetails.email,
        // name: userDetails.name, // Adjust fields as needed
      },
      token,
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});


module.exports = router;
