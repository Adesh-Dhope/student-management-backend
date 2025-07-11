const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URL_Cluster);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
