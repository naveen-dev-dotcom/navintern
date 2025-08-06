const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String
      
    },
    email: {
      type: String
      
    },
    password: {
      type: String
      
    },
    agreeToTerms: {
      type: Boolean
    
    },
    plan: {
      type: String
     
    },
    payTime: {
      type: String
    },
    endDate: {
      type: String
    }
   
    

  },
);

// Hash password before saving
registrationSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
