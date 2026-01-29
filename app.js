// app.ts
const express = require("express");
const path = require("path");
const http = require("http");
require("./db/mongoConnect");
const cors = require("cors");
const { connectDB } = require("./db/mongoConnect"); // או בדוק איך מייצא את הפונקציה
const User = require("./models/userModel");
const signUpRouter = require("./routes/signUp");

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // מאפשר לקרוא JSON ב-body

// Routes
app.use(signUpRouter);


// Route לבדיקה אם המשתמש הוא admin
app.post("/api/check-admin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });


    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Only admins can login.", role: user.role });
    }

    // בדיקת סיסמה - חובה לכל admin
    if (!user.password) {
      return res.status(403).json({ message: "Admin account not configured with password" });
    }

    if (user.password !== password) {
      return res.status(403).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Admin verified", role: "admin" } , );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});





// Route לקבלת כל ה-users
app.get("/api/users" ,async  (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
