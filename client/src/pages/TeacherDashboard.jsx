import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Users,
  ClipboardCheck,
  BookOpen,
  ListTodo,
  UserCheck,
  GraduationCap,
  FileText,
  ArrowUpRight,
} from "lucide-react";

import "./TeacherDashboard.css";

function TeacherDashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH TEACHER DASHBOARD DATA
  // ==========================================

  useEffect(() => {
    const fetchTeacherDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication token not found.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/dashboard/teacher",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDashboardData(response.data);
      } catch (err) {
        console.error(
          "Teacher dashboard error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load teacher dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherDashboard();
  }, []);

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (loading) {
    return (
      <div className="teacher-dashboard">
        <div className="teacher-dashboard-loading">
          <p>Loading teacher dashboard...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR STATE
  // ==========================================

  if (error) {
    return (
      <div className="teacher-dashboard">
        <div className="teacher-dashboard-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================

  return (
    <div className="teacher-dashboard">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="teacher-dashboard-header">
        <div>
          <h1>
            Welcome,{" "}
            {dashboardData?.teacher?.name || "Teacher"}
          </h1>

          <p>
            Manage your classes, attendance and
            student performance.
          </p>
        </div>

        <div className="teacher-profile-badge">
          <div className="teacher-profile-avatar">
            {dashboardData?.teacher?.name
              ?.charAt(0)
              .toUpperCase() || "T"}
          </div>

          <div>
            <strong>
              {dashboardData?.teacher?.name ||
                "Teacher"}
            </strong>

            <span>Teacher</span>
          </div>
        </div>
      </div>

      {/* ======================================
          STAT CARDS
      ====================================== */}

      <div className="teacher-dashboard-cards">

        {/* STUDENTS */}

        <div className="teacher-dashboard-card">
          <div className="teacher-card-icon students-icon">
            <Users size={22} />
          </div>

          <div className="teacher-card-content">
            <span>My Students</span>

            <h2>
              {dashboardData?.totalStudents ?? 0}
            </h2>

            <p>Total registered students</p>
          </div>
        </div>

        {/* ATTENDANCE */}

        <div className="teacher-dashboard-card">
          <div className="teacher-card-icon attendance-icon">
            <ClipboardCheck size={22} />
          </div>

          <div className="teacher-card-content">
            <span>Attendance</span>

            <h2>
              {dashboardData?.attendancePercentage ?? 0}%
            </h2>

            <p>Overall attendance</p>
          </div>
        </div>

        {/* EXAMS */}

        <div className="teacher-dashboard-card">
          <div className="teacher-card-icon exams-icon">
            <BookOpen size={22} />
          </div>

          <div className="teacher-card-content">
            <span>Upcoming Exams</span>

            <h2>
              {dashboardData?.upcomingExams ?? 0}
            </h2>

            <p>Exams scheduled</p>
          </div>
        </div>

        {/* ASSIGNMENTS */}

        <div className="teacher-dashboard-card">
          <div className="teacher-card-icon tasks-icon">
            <ListTodo size={22} />
          </div>

          <div className="teacher-card-content">
            <span>Pending Tasks</span>

            <h2>
              {dashboardData?.pendingAssignments ?? 0}
            </h2>

            <p>Assignments pending</p>
          </div>
        </div>

      </div>

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <div className="teacher-dashboard-grid">

        {/* QUICK ACTIONS */}

        <div className="teacher-dashboard-panel">

          <div className="teacher-panel-header">
            <div>
              <h2>Teacher Actions</h2>

              <p>
                Quickly access your teaching tools.
              </p>
            </div>
          </div>

          <div className="teacher-quick-actions">

            {/* MARK ATTENDANCE */}

            <button
              className="teacher-quick-action"
              onClick={() =>
                navigate("/attendance")
              }
            >
              <div className="teacher-action-icon">
                <UserCheck size={20} />
              </div>

              <div className="teacher-action-content">
                <h3>Mark Attendance</h3>

                <p>
                  Record student attendance
                </p>
              </div>

              <ArrowUpRight
                size={18}
                className="teacher-action-arrow"
              />
            </button>

            {/* VIEW STUDENTS */}

            <button
              className="teacher-quick-action"
              onClick={() =>
                navigate("/students")
              }
            >
              <div className="teacher-action-icon">
                <Users size={20} />
              </div>

              <div className="teacher-action-content">
                <h3>View Students</h3>

                <p>
                  View and manage students
                </p>
              </div>

              <ArrowUpRight
                size={18}
                className="teacher-action-arrow"
              />
            </button>

            {/* ENTER GRADES */}

            <button
  className="teacher-quick-action"
  onClick={() => navigate("/enter-results")}
>
  <div className="teacher-action-icon">
    <GraduationCap size={20} />
  </div>

  <div className="teacher-action-content">
    <h3>Enter Grades</h3>
    <p>Add student examination results</p>
  </div>

  <ArrowUpRight
    size={18}
    className="teacher-action-arrow"
  />
</button>

            {/* VIEW EXAMS */}

            <button
              className="teacher-quick-action"
              onClick={() =>
                navigate("/exams")
              }
            >
              <div className="teacher-action-icon">
                <FileText size={20} />
              </div>

              <div className="teacher-action-content">
                <h3>View Exams</h3>

                <p>
                  View upcoming examinations
                </p>
              </div>

              <ArrowUpRight
                size={18}
                className="teacher-action-arrow"
              />
            </button>

          </div>
        </div>

        {/* TEACHER INFORMATION */}

        <div className="teacher-dashboard-panel">

          <div className="teacher-panel-header">
            <div>
              <h2>Teacher Information</h2>

              <p>
                Your account information.
              </p>
            </div>
          </div>

          <div className="teacher-information">

            <div className="teacher-information-item">
              <span>Name</span>

              <strong>
                {dashboardData?.teacher?.name ||
                  "N/A"}
              </strong>
            </div>

            <div className="teacher-information-item">
              <span>Email</span>

              <strong>
                {dashboardData?.teacher?.email ||
                  "N/A"}
              </strong>
            </div>

            <div className="teacher-information-item">
              <span>Role</span>

              <strong className="teacher-role">
                Teacher
              </strong>
            </div>

            <div className="teacher-information-item">
              <span>Account Status</span>

              <strong className="teacher-status">
                Active
              </strong>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default TeacherDashboard;