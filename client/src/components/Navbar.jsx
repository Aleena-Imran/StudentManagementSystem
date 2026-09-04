import { Link, useNavigate } from "react-router-dom";

import {
  GraduationCap,
  LogIn,
  ArrowRight,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Decide dashboard according to role
  const getDashboardPath = () => {
    if (user?.role === "admin") {
      return "/admin/dashboard";
    }

    if (user?.role === "teacher") {
      return "/teacher/dashboard";
    }

    return "/student/dashboard";
  };

  return (
    <nav className="main-navbar">

      {/* BRAND */}
      <Link to="/" className="brand">

        <div className="brand-icon">
          <GraduationCap size={28} />
        </div>

        <div className="brand-text">
          <span className="brand-name">
            Edu<span>Manage</span>
          </span>

          <small>Student Management System</small>
        </div>

      </Link>


      {/* NAVIGATION */}
      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        {!isAuthenticated ? (
          <>
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#modules">Modules</a>
            <a href="#contact">Contact</a>
          </>
        ) : (
          <>
            {user?.role === "admin" && (
              <>
                <Link to="/students">Students</Link>
                <Link to="/add">Add Student</Link>
              </>
            )}

            {user?.role === "teacher" && (
              <Link to="/students">
                Students
              </Link>
            )}

            {user?.role === "student" && (
              <Link to="/student/dashboard">
                My Dashboard
              </Link>
            )}
          </>
        )}

      </div>


      {/* ACTION BUTTONS */}
      <div className="nav-actions">

        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="login-btn"
            >
              <LogIn size={17} />
              <span>Login</span>
            </Link>

            <Link
              to="/login"
              className="get-started-btn"
            >
              <span>Get Started</span>
              <ArrowRight size={17} />
            </Link>
          </>
        ) : (
          <>
            <Link
              to={getDashboardPath()}
              className="login-btn"
            >
              <LayoutDashboard size={17} />
              <span>Dashboard</span>
            </Link>

            <button
              onClick={handleLogout}
              className="get-started-btn"
            >
              <span>Logout</span>
              <LogOut size={17} />
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;