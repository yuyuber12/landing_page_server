
// db.ts
const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://yonigames12_db_user:cluster0_0@cluster0.ob1zarj.mongodb.net/landingPageDB";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
    process.exit(1); 
  }
};

module.exports = { connectDB };
