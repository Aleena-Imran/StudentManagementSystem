import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardLayout from "./components/DashboardLayout";
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

<Route
  path="/profile"
  element={
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentProfile />
    </ProtectedRoute>
  }
/>

{/* Student Results */}
<Route
  path="/student/results"
  element={
    <ProtectedRoute allowedRoles={["student"]}>
      <Results />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-attendance"
  element={
    <ProtectedRoute allowedRoles={["student"]}>
      <MyAttendance />
    </ProtectedRoute>
  }
/>

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

        {/* ADMIN + TEACHER */}

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


        {/* ADMIN ONLY */}

        <Route
          path="/add"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddStudent />
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