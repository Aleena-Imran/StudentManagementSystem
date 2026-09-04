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


const attendanceData = [
  { month: "Jan", attendance: 88 },
  { month: "Feb", attendance: 91 },
  { month: "Mar", attendance: 86 },
  { month: "Apr", attendance: 93 },
  { month: "May", attendance: 90 },
  { month: "Jun", attendance: 95 },
];


const StudentDashboard = () => {

  return (
    <div className="student-dashboard">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>
          <h1>Student Dashboard</h1>

          <p>
            Welcome back! Here's your academic overview.
          </p>
        </div>

      </div>


      {/* STAT CARDS */}

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <div className="card-icon">
            <ClipboardCheck size={21} />
          </div>

          <div className="card-content">

            <span>Attendance</span>

            <h2>92%</h2>

            <small>
              <ArrowUpRight size={14} />
              Good standing
            </small>

          </div>

        </div>


        <div className="dashboard-card">

          <div className="card-icon">
            <GraduationCap size={21} />
          </div>

          <div className="card-content">

            <span>Average Grade</span>

            <h2>A</h2>

            <small>
              Excellent performance
            </small>

          </div>

        </div>


        <div className="dashboard-card">

          <div className="card-icon">
            <CalendarDays size={21} />
          </div>

          <div className="card-content">

            <span>Upcoming Exams</span>

            <h2>3</h2>

            <small>
              Next exam in 8 days
            </small>

          </div>

        </div>


        <div className="dashboard-card">

          <div className="card-icon">
            <FileText size={21} />
          </div>

          <div className="card-content">

            <span>Assignments</span>

            <h2>5</h2>

            <small>
              2 pending
            </small>

          </div>

        </div>

      </div>


      {/* CHART + EXAMS */}

      <div className="dashboard-grid">


        {/* ATTENDANCE CHART */}

        <div className="dashboard-panel attendance-panel">

          <div className="panel-header">

            <div>
              <h2>Attendance Trend</h2>

              <p>
                Your attendance over the last 6 months
              </p>
            </div>

            <span className="panel-badge">
              92% Overall
            </span>

          </div>


          <div className="chart-container">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={attendanceData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                />

                <YAxis
                  domain={[70, 100]}
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

          </div>

        </div>


        {/* UPCOMING EXAMS */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <h2>Upcoming Exams</h2>

              <p>
                Your upcoming examinations
              </p>
            </div>

            <button className="view-all-btn">
              View All
            </button>

          </div>


          <div className="exam-list">


            <div className="exam-item">

              <div className="exam-icon">
                <CalendarDays size={20} />
              </div>

              <div className="exam-info">

                <strong>
                  Mathematics
                </strong>

                <span>
                  September 12, 2026
                </span>

              </div>

              <span className="exam-days">
                8 days
              </span>

            </div>


            <div className="exam-item">

              <div className="exam-icon">
                <CalendarDays size={20} />
              </div>

              <div className="exam-info">

                <strong>
                  Science
                </strong>

                <span>
                  September 18, 2026
                </span>

              </div>

              <span className="exam-days">
                14 days
              </span>

            </div>


            <div className="exam-item">

              <div className="exam-icon">
                <CalendarDays size={20} />
              </div>

              <div className="exam-info">

                <strong>
                  English
                </strong>

                <span>
                  September 25, 2026
                </span>

              </div>

              <span className="exam-days">
                21 days
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* RECENT RESULTS */}

      <div className="dashboard-panel results-panel">

        <div className="panel-header">

          <div>

            <h2>Recent Results</h2>

            <p>
              Your latest examination performance
            </p>

          </div>

          <button className="view-all-btn">
            View All
          </button>

        </div>


        <div className="results-table">

          <div className="result-row result-header">

            <span>Subject</span>
            <span>Grade</span>
            <span>Score</span>
            <span>Status</span>

          </div>


          <div className="result-row">

            <span>Mathematics</span>

            <strong>A</strong>

            <span>92%</span>

            <span className="result-status">
              Excellent
            </span>

          </div>


          <div className="result-row">

            <span>Science</span>

            <strong>A-</strong>

            <span>88%</span>

            <span className="result-status">
              Excellent
            </span>

          </div>


          <div className="result-row">

            <span>English</span>

            <strong>B+</strong>

            <span>84%</span>

            <span className="result-status">
              Good
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};


export default StudentDashboard;