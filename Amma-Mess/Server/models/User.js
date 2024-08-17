const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cluster: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cluster',
    required: true
  },
  // mealPlan: { type: String, enum: ['Weekly Plan', 'Monthly Plan'], default: '' },
  // paymentStatus: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
  // role: { type: String, enum: ['admin', 'user'], required: true }  // Add role field
});

const User = mongoose.model('User', userSchema);

module.exports = User;
