import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import {
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  FileText,
  ArrowUpRight,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StudentDashboard = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/dashboard/student",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load dashboard"
          );
        }

        setDashboardData(data);
      } catch (error) {
        console.error("Dashboard error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboard();
    }
  }, [token]);

  // -----------------------------
  // LOADING
  // -----------------------------

  if (loading) {
    return (
      <div className="student-dashboard">
        <h1>Loading dashboard...</h1>
      </div>
    );
  }

  // -----------------------------
  // ERROR
  // -----------------------------

  if (error) {
    return (
      <div className="student-dashboard">
        <h1>Unable to load dashboard</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  // -----------------------------
  // SAFE DATA
  // -----------------------------

  const attendance = dashboardData.attendance ?? 0;

  const averageGrade =
    dashboardData.averageGrade ?? "N/A";

  const upcomingExams =
    dashboardData.upcomingExams ?? [];

  const assignments =
  dashboardData.assignments ?? [];

  const attendanceTrend =
    dashboardData.attendanceTrend ?? [];

  return (
    <div className="student-dashboard">

      {/* =========================
          HEADER
      ========================= */}

      <div className="dashboard-header">
        <div>
          <h1>Student Dashboard</h1>

          <p>
            Welcome back! Here's your academic overview.
          </p>
        </div>
      </div>


      {/* =========================
          STAT CARDS
      ========================= */}

      <div className="dashboard-cards">

        {/* Attendance */}

        <div className="dashboard-card">

          <div className="card-icon">
            <ClipboardCheck size={21} />
          </div>

          <div className="card-content">

            <span>Attendance</span>

            <h2>{attendance}%</h2>

            <small>
              <ArrowUpRight size={14} />
              {attendance >= 75
                ? "Good standing"
                : "Needs improvement"}
            </small>

          </div>

        </div>


        {/* Average Grade */}

        <div className="dashboard-card">

          <div className="card-icon">
            <GraduationCap size={21} />
          </div>

          <div className="card-content">

            <span>Average Grade</span>

            <h2>{averageGrade}</h2>

            <small>
              Academic performance
            </small>

          </div>

        </div>


        {/* Upcoming Exams */}

        <div className="dashboard-card">

          <div className="card-icon">
            <CalendarDays size={21} />
          </div>

          <div className="card-content">

            <span>Upcoming Exams</span>

            <h2>{upcomingExams.length}</h2>

            <small>
              Scheduled examinations
            </small>

          </div>

        </div>


        {/* Assignments */}

        <div className="dashboard-card">

          <div className="card-icon">
            <FileText size={21} />
          </div>

          <div className="card-content">

            <span>Assignments</span>

            <h2>{assignments.length}</h2>

<small>
  {assignments.filter(
    (assignment) => assignment.status === "Pending"
  ).length}{" "}
  pending
</small>

          </div>

        </div>

      </div>


      {/* =========================
          CHART + EXAMS
      ========================= */}

      <div className="dashboard-grid">


        {/* =========================
            ATTENDANCE CHART
        ========================= */}

        <div className="dashboard-panel attendance-panel">

          <div className="panel-header">

            <div>

              <h2>Attendance Trend</h2>

              <p>
                Your attendance records
              </p>

            </div>

            <span className="panel-badge">
              {attendance}% Overall
            </span>

          </div>


          <div className="chart-container">

            {attendanceTrend.length > 0 ? (

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart
                  data={attendanceTrend}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  {/* IMPORTANT:
                      Backend sends "date"
                  */}

                  <XAxis
                    dataKey="date"
                  />

                  <YAxis
                    domain={[0, 100]}
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="attendance"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />

                </LineChart>

              </ResponsiveContainer>

            ) : (

              <div className="empty-state">
                <p>
                  No attendance records available.
                </p>
              </div>

            )}

          </div>

        </div>


        {/* =========================
            UPCOMING EXAMS
        ========================= */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <h2>Upcoming Exams</h2>

              <p>
                Your upcoming examinations
              </p>

            </div>

            <button
  className="view-all-btn"
  onClick={() => navigate("/exams")}
>
  View All
</button>

          </div>


          <div className="exam-list">

            {upcomingExams.length > 0 ? (

              upcomingExams.map((exam) => (

                <div
                  className="exam-item"
                  key={exam._id}
                >

                  <div className="exam-icon">
                    <CalendarDays size={20} />
                  </div>


                  <div className="exam-info">

                    <strong>
                      {exam.subject || exam.title}
                    </strong>

                    <span>
                      {new Date(
                        exam.examDate
                      ).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>

                  </div>

                </div>

              ))

            ) : (

              <div className="empty-state">

                <p>
                  No upcoming exams.
                </p>

              </div>

            )}

          </div>

        </div>

      </div>

{/* =========================
    ASSIGNMENTS
========================= */}

<div className="dashboard-panel assignments-panel">

  <div className="panel-header">

    <div>
      <h2>My Assignments</h2>

      <p>
        Your assigned academic work
      </p>
    </div>

  </div>

  <div className="assignment-list">

    {assignments.length > 0 ? (

      assignments.map((assignment) => (

        <div
          className="assignment-item"
          key={assignment._id}
        >

          <div className="assignment-info">

            <strong>
              {assignment.title}
            </strong>

            <span>
              {assignment.subject}
            </span>

            <small>
              Due:{" "}
              {new Date(
                assignment.dueDate
              ).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </small>

          </div>

          <span
            className={`assignment-status ${assignment.status.toLowerCase()}`}
          >
            {assignment.status}
          </span>

        </div>

      ))

    ) : (

      <div className="empty-state">
        <p>No assignments available.</p>
      </div>

    )}

  </div>

</div>
      

    </div>
  );
};

export default StudentDashboard;