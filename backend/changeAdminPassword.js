const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

const emailToUpdate = "adhithyapasupuleti8055@gmail.com"; // admin email
const newPassword = "india@143";       // new password

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected ✅');

    const user = await User.findOne({ email: emailToUpdate });
    if (!user) {
      console.log("Admin not found!");
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    console.log("Password updated successfully ✅");
    process.exit();
  })
  .catch(err => console.error(err));