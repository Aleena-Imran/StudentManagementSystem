import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import connectDB from "./config/db.js";
import resultRoutes from "./routes/resultRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";

dotenv.config();

const app = express();

// ==============================
// Middleware
// ==============================

app.use(cors());

app.use(express.json());


// ==============================
// Routes
// ==============================

app.use("/api/auth", authRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/results", resultRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/exams", examRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/teachers", teacherRoutes);

app.use("/api/assignments", assignmentRoutes);

// ==============================
// Test Route
// ==============================

app.get("/", (req, res) => {
  res.json({
    message: "Student Management System API is running",
  });
});


// ==============================
// Database
// ==============================

connectDB();


// ==============================
// Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});