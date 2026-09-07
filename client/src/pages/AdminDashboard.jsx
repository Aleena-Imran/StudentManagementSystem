import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  UserRoundCheck,
  ClipboardCheck,
  BookOpen,
  GraduationCap,
  UserPlus,
  CalendarPlus,
  FileText,
  ArrowUpRight,
  Mail,
} from "lucide-react";

import "./Dashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch dashboard statistics
        const statsResponse = await axios.get(
          "http://localhost:5000/api/dashboard/stats",
          {
            headers,
          }
        );

        // Fetch students
        const studentsResponse = await axios.get(
          "http://localhost:5000/api/students",
          {
            headers,
          }
        );

        setStats(statsResponse.data);

        // Show only the 5 most recent students
        setStudents(
          studentsResponse.data.students.slice(0, 5)
        );
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="dashboard-loading">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="dashboard-error">
          {error}
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Students",
      value: stats?.totalStudents ?? 0,
      icon: Users,
      description: "Registered students",
    },
    {
      title: "Total Teachers",
      value: stats?.totalTeachers ?? 0,
      icon: UserRoundCheck,
      description: "Active teachers",
    },
    {
      title: "Attendance",
      value: `${stats?.attendancePercentage ?? 0}%`,
      icon: ClipboardCheck,
      description: "Overall attendance",
    },
    {
      title: "Upcoming Exams",
      value: stats?.upcomingExams ?? 0,
      icon: BookOpen,
      description: "Scheduled exams",
    },
  ];

  return (
    <div className="admin-dashboard">

      {/* HEADER */}
      <div className="admin-dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>

          <p>
            Monitor and manage your institution from one place.
          </p>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="dashboard-cards">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              className="dashboard-card"
              key={card.title}
            >
              <div className="card-icon">
                <Icon size={24} />
              </div>

              <div className="card-content">
                <span>{card.title}</span>

                <h2>{card.value}</h2>

                <small>{card.description}</small>
              </div>
            </div>
          );
        })}
      </div>

      {/* MAIN GRID */}
      <div className="admin-dashboard-grid">

        {/* QUICK ACTIONS */}
        <div className="admin-panel">

          <div className="admin-panel-header">
            <div>
              <h2>Quick Actions</h2>

              <p>
                Frequently used administration tools.
              </p>
            </div>
          </div>

          <div className="quick-actions">

            {/* ADD STUDENT */}
            <div
              className="quick-action"
              onClick={() => navigate("/add-student")}
            >
              <div className="quick-action-icon">
                <UserPlus size={22} />
              </div>

              <div className="quick-action-content">
                <strong>Add Student</strong>

                <span>
                  Register a new student
                </span>
              </div>

              <ArrowUpRight
                size={18}
                className="quick-action-arrow"
              />
            </div>

            <button
  className="quick-action"
  onClick={() => navigate("/add-teacher")}
>
  <div className="quick-action-icon">
    <UserRoundCheck size={20} />
  </div>

  <div className="quick-action-content">
    <h3>Add Teacher</h3>
    <p>Create a new teacher account</p>
  </div>

  <ArrowUpRight
    size={18}
    className="quick-action-arrow"
  />
</button>

            {/* MANAGE STUDENTS */}
            <div
              className="quick-action"
              onClick={() => navigate("/students")}
            >
              <div className="quick-action-icon">
                <Users size={22} />
              </div>

              <div className="quick-action-content">
                <strong>Manage Students</strong>

                <span>
                  View and manage students
                </span>
              </div>

              <ArrowUpRight
                size={18}
                className="quick-action-arrow"
              />
            </div>

            {/* MANAGE EXAMS */}
            <div
              className="quick-action"
              onClick={() => navigate("/exams")}
            >
              <div className="quick-action-icon">
                <CalendarPlus size={22} />
              </div>

              <div className="quick-action-content">
                <strong>Manage Exams</strong>

                <span>
                  Create and manage exams
                </span>
              </div>

              <ArrowUpRight
                size={18}
                className="quick-action-arrow"
              />
            </div>

            {/* VIEW REPORTS */}
            <div
              className="quick-action"
              onClick={() => navigate("/reports")}
            >
              <div className="quick-action-icon">
                <FileText size={22} />
              </div>

              <div className="quick-action-content">
                <strong>View Reports</strong>

                <span>
                  Analyze academic data
                </span>
              </div>

              <ArrowUpRight
                size={18}
                className="quick-action-arrow"
              />
            </div>

          </div>
        </div>

        {/* SYSTEM OVERVIEW */}
        <div className="admin-panel">

          <div className="admin-panel-header">
            <div>
              <h2>System Overview</h2>

              <p>
                Current platform status.
              </p>
            </div>
          </div>

          <div className="system-overview">

            <div className="overview-item">

              <div className="overview-icon">
                <GraduationCap size={21} />
              </div>

              <div className="overview-content">

                <strong>
                  Student Management
                </strong>

                <span className="status-active">
                  Active
                </span>

              </div>
            </div>

            <div className="overview-item">

              <div className="overview-icon">
                <ClipboardCheck size={21} />
              </div>

              <div className="overview-content">

                <strong>
                  Attendance System
                </strong>

                <span className="status-active">
                  Active
                </span>

              </div>
            </div>

            <div className="overview-item">

              <div className="overview-icon">
                <BookOpen size={21} />
              </div>

              <div className="overview-content">

                <strong>
                  Exam Management
                </strong>

                <span className="status-active">
                  Active
                </span>

              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ATTENDANCE OVERVIEW */}
      <div className="admin-panel attendance-overview-panel">
        <div className="admin-panel-header">
          <div>
            <h2>Attendance Overview</h2>
            <p>Daily attendance performance across the institution.</p>
          </div>
        </div>

        <div className="attendance-chart-container">
          {stats?.attendanceOverview?.length === 0 ? (
            <div className="attendance-empty">
              <ClipboardCheck size={35} />
              <p>No attendance records available yet.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={stats?.attendanceOverview || []}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 10,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                />

                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => {
                    const date = new Date(value);

                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />

                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                />

                <Tooltip
                  formatter={(value) => [`${value}%`, "Attendance"]}
                  labelFormatter={(value) => {
                    const date = new Date(value);

                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div> 

      {/* RECENT STUDENTS */}
      <div className="admin-panel recent-students-panel">

        <div className="admin-panel-header recent-students-header">

          <div>
            <h2>Recent Students</h2>

            <p>
              Recently registered students.
            </p>
          </div>

          <button
            className="view-students-btn"
            onClick={() => navigate("/students")}
          >
            View All
            <ArrowUpRight size={16} />
          </button>

        </div>

        {students.length === 0 ? (

          <div className="recent-students-empty">
            <Users size={35} />

            <p>
              No students registered yet.
            </p>
          </div>

        ) : (

          <div className="recent-students-list">

            {students.map((student) => (

              <div
                className="recent-student-item"
                key={student._id}
              >

                <div className="recent-student-avatar">
                  {student.name
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <div className="recent-student-info">

                  <strong>
                    {student.name}
                  </strong>

                  <span>
                    <Mail size={14} />
                    {student.email || "No email provided"}
                  </span>

                </div>

                <div className="recent-student-course">
                  {student.course || "N/A"}
                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminDashboard;