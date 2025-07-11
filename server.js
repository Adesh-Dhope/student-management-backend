// server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes")
const subjectRoutes = require("./routes/SubjectRoute")
const teacherRoutes = require("./routes/teacherRoutes")
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/students/subjects', subjectRoutes);
app.use('/students/teacher', teacherRoutes);   // 👈 your requested route
app.use('/students', authRoutes);
app.use('/students', studentRoutes);


// Start server after DB connects
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
