import { NavLink, useNavigate, Link} from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  UserPlus,
  UserRound,
  ClipboardCheck,
  BookOpen,
  BarChart3,
  UserCircle,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
    <aside className="sidebar">

      {/* Logo */}

      <div className="sidebar-brand">

        <div className="sidebar-brand-icon">
          <LayoutDashboard size={22} />
        </div>

        <div className="sidebar-brand-text">
          <div className="sidebar-brand-name">
            Edu<span>Manage</span>
          </div>

          <small>
            Student Management
          </small>
        </div>

      </div>


      {/* User */}

      <div className="sidebar-user">

        <div className="user-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <div className="user-info">

          <strong>
            {user?.name}
          </strong>

          <span>
            {user?.role}
          </span>

        </div>

      </div>


      {/* Menu */}

      <div className="sidebar-menu">

        <p className="menu-title">
          MAIN MENU
        </p>

        <NavLink
          to={getDashboardPath()}
          className="sidebar-link"
        >
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>


        {/* ADMIN */}

        {user?.role === "admin" && (
          <>
            <NavLink
              to="/students"
              className="sidebar-link"
            >
              <Users size={19} />
              <span>Students</span>
            </NavLink>

            <NavLink
              to="/add"
              className="sidebar-link"
            >
              <UserPlus size={19} />
              <span>Add Student</span>
            </NavLink>

            <NavLink
              to="/teachers"
              className="sidebar-link"
            >
              <UserRound size={19} />
              <span>Teachers</span>
            </NavLink>

            <NavLink
              to="/attendance"
              className="sidebar-link"
            >
              <ClipboardCheck size={19} />
              <span>Attendance</span>
            </NavLink>
<NavLink to="/assignments" className="sidebar-link">
<ClipboardCheck size={19} />
<span>
  Assignments
</span>
</NavLink>
            <NavLink
              to="/exams"
              className="sidebar-link"
            >
              <BookOpen size={19} />
              <span>Exams</span>
            </NavLink>

            <NavLink
              to="/reports"
              className="sidebar-link"
            >
              <BarChart3 size={19} />
              <span>Reports</span>
            </NavLink>
          </>
        )}


        {/* TEACHER */}

        {user?.role === "teacher" && (
          <>
            <NavLink
              to="/students"
              className="sidebar-link"
            >
              <Users size={19} />
              <span>Students</span>
            </NavLink>

            <NavLink
              to="/attendance"
              className="sidebar-link"
            >
              <ClipboardCheck size={19} />
              <span>Attendance</span>
            </NavLink>
            <NavLink to="/assignments" className="sidebar-link">
<ClipboardCheck size={19} />
<span>
  Assignments
</span>
</NavLink>
            <NavLink
              to="/exams"
              className="sidebar-link"
            >
              <BookOpen size={19} />
              <span>Exams</span>
            </NavLink>
          </>
        )}


        {/* STUDENT */}

        {user?.role === "student" && (
          <>
            <NavLink
              to="/profile"
              className="sidebar-link"
            >
              <UserCircle size={19} />
              <span>My Profile</span>
            </NavLink>

            <NavLink
              to="/my-attendance"
              className="sidebar-link"
            >
              <ClipboardCheck size={19} />
              <span>My Attendance</span>
            </NavLink>

            <NavLink
              to="/student/results"
              className="sidebar-link"
            >
              <BarChart3 size={19} />
              <span>My Results</span>
            </NavLink>

            <NavLink
              to="/exams"
              className="sidebar-link"
            >
              <BookOpen size={19} />
              <span>Exams</span>
            </NavLink>
          </>
        )}

      </div>


      {/* Logout */}

      <div className="sidebar-bottom">

        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;