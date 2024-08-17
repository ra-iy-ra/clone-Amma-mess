const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Cluster = require('../models/Cluster');
const router = express.Router();

// Register 
router.post('/register', async (req, res) => {
  const { name, email, password, cluster } = req.body;

  if (!name || !email || !password || !cluster) {
      return res.status(400).json({ msg: 'Please fill in all fields' });
  }

  try {
      let user = await User.findOne({ email });
      if (user) {
          return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
          name,
          email,
          password,
          cluster
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // add  user
      await Cluster.findByIdAndUpdate(cluster, {
          $push: { users: user._id }
      });

      res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
        // Admin login
        if (email === 'admin@gmail.com') {
            const adminPassword = 'admin123'; // Store this securely, not hardcoded
            if (password === adminPassword) {
                return res.status(200).json({ role: "admin" });
            } else {
                return res.status(400).json("Invalid credentials");
            }
        }
  
        // User login
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json("Invalid credentials");
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json("Invalid credentials");
        }
  
        res.status(200).json({ role: "user" });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json("Server error");
    }
  });
  






  // Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('cluster', 'name'); 
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



// // Get user profile
// router.get('/user-profile', async (req, res) => {
//     try {
//       const user = await User.findById(req.user.id).populate('cluster');
//       res.json(user);
//     } catch (err) {
//       res.status(500).send('Server Error');
//     }
//   });




// // Update meal plan and payment status
// router.post('/make-payment', async (req, res) => {
//     const { mealPlan, amount } = req.body;
  
//     try {
//       const user = await User.findById(req.user.id);
  
//       // Assuming payment process is successful
//       user.mealPlan = mealPlan;
//       user.paymentStatus = 'Paid';
  
//       await user.save();
  
//       res.json({ msg: 'Payment successful and updated!' });
//     } catch (err) {
//       res.status(500).send('Server Error');
//     }
//   });




// Fetch all users for admin dashboard
// router.get('/users', async (req, res) => {
//     try {
//         const users = await User.find().populate('cluster');
//         res.json(users);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });



// // Get all customers (for admin)
// router.get('/customers', async (req, res) => {
//     try {
//       const customers = await User.find().populate('cluster');
//       res.json(customers);
//     } catch (err) {
//       res.status(500).send('Server Error');
//     }
//   });

module.exports = router;
