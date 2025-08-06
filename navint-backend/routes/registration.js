var express = require('express');
var router = express.Router();
var registrationSchema = require('./model/registrationschema');

// Basic Test Route
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Plan Registration Route
router.post('/regplan', async function (req, res, next) {
  //   console.log("🟢 /regplan called with data:", req.body);
  // res.status(200).json({ message: "Plan saved" });
  try {
    const { name, email, password, plan ,agreeToTerms } = req.body;

    if (!name || !email || !password || !agreeToTerms || !plan) {
      return res.status(400).json({ status: 'error', message: 'All fields are required.' });
    }

    const planDurations = { free: 1, silver: 7, gold: 30 };
    const expiryDays = planDurations[plan];
    if (!expiryDays) {
      return res.status(400).json({ status: 'error', message: 'Invalid plan selected.' });
    }

    const payTime = new Date();
    const endDate = new Date(payTime.getTime() + expiryDays * 24 * 60 * 60 * 1000);

    const newData = new registrationSchema({
      name,
      email,
      password,
      agreeToTerms,
      payTime,
      endDate,
      plan,
      
    });
    await newData.save();

    res.status(200).json({
      status: 'success',
      expiry: endDate
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
