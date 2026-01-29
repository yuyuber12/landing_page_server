const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

//
router.post("/api/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, interest } = req.body;

    // בדיקה אם המשתמש כבר רשום
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ firstName, lastName, email, phone, interest });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } 
  catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;