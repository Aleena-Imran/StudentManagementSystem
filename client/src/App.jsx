import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import DashboardLayout from "./components/DashboardLayout";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";

import Results from "./pages/Results";
import AddStudent from "./pages/AddStudent";
import Students from "./pages/Students";
import MyAttendance from "./pages/MyAttendance";
import Unauthorized from "./pages/Unauthorized";
import Exams from "./pages/Exams";
import StudentProfile from "./pages/StudentProfile";
import Teachers from "./pages/Teachers";
import AddTeacher from "./pages/AddTeacher";
import Attendance from "./pages/Attendance";
import EnterResults from "./pages/EnterResults";
import Assignments from "./pages/Assignments";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ADMIN DASHBOARD */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />


        {/* TEACHER DASHBOARD */}

        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <DashboardLayout>
                <TeacherDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />


        {/* STUDENT DASHBOARD */}

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <DashboardLayout>
                <StudentDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />


        {/* STUDENT PROFILE */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentProfile />
            </ProtectedRoute>
          }
        />


        {/* STUDENT RESULTS */}

        <Route
          path="/student/results"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Results />
            </ProtectedRoute>
          }
        />


        {/* STUDENT ATTENDANCE */}

        <Route
          path="/my-attendance"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <MyAttendance />
            </ProtectedRoute>
          }
        />


        {/* EXAMS */}

        <Route
          path="/exams"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "teacher", "student"]}
            >
              <Exams />
            </ProtectedRoute>
          }
        />


        {/* ATTENDANCE */}

        <Route
          path="/attendance"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "teacher"]}
            >
              <Attendance />
            </ProtectedRoute>
          }
        />


        {/* ADMIN + TEACHER - STUDENTS */}

        <Route
          path="/students"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "teacher"]}
            >
              <Students />
            </ProtectedRoute>
          }
        />


        {/* ADMIN - ADD STUDENT */}

        <Route
          path="/add"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddStudent />
            </ProtectedRoute>
          }
        />


        {/* ADMIN - ADD TEACHER */}

        <Route
          path="/add-teacher"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddTeacher />
            </ProtectedRoute>
          }
        />


        {/* TEACHER - ENTER RESULTS */}

        <Route
          path="/enter-results"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <EnterResults />
            </ProtectedRoute>
          }
        />


        {/* ADMIN - TEACHERS */}

        <Route
          path="/teachers"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Teachers />
            </ProtectedRoute>
          }
        />

        {/* ASSIGNMENTS */}

        <Route
  path="/assignments"
  element={
    <ProtectedRoute
      allowedRoles={["admin", "teacher", "student"]}
    >
      <DashboardLayout>
        <Assignments />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

        {/* UNAUTHORIZED */}

        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;