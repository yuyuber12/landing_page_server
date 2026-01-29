const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    interest: { type: String, required: true },
    role: { type: String, default: "user" },
    password: { type: String, required: false }, // סיסמה רק לadmin

  },
  { collection: "users" },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;