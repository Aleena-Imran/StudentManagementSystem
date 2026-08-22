import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";

const attendanceData = [
  { day: "Mon", attendance: 90 },
  { day: "Tue", attendance: 85 },
  { day: "Wed", attendance: 95 },
  { day: "Thu", attendance: 88 },
  { day: "Fri", attendance: 92 },
];

const gradeData = [
  { name: "A", value: 40 },
  { name: "B", value: 30 },
  { name: "C", value: 20 },
  { name: "D", value: 10 },
];

const enrollmentData = [
  { month: "Jan", students: 20 },
  { month: "Feb", students: 35 },
  { month: "Mar", students: 50 },
  { month: "Apr", students: 45 },
  { month: "May", students: 60 },
];

const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042"];

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    attendancePercentage: 0,
    upcomingExams: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard/stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{stats.totalStudents}</h2>
          <p>Total Students</p>
        </div>

        <div className="stat-card">
          <h2>{stats.totalTeachers}</h2>
          <p>Total Teachers</p>
        </div>

        <div className="stat-card">
          <h2>{stats.attendancePercentage}%</h2>
          <p>Attendance</p>
        </div>

        <div className="stat-card">
          <h2>{stats.upcomingExams}</h2>
          <p>Upcoming Exams</p>
        </div>
      </div>

      <div className="charts-grid">

        <div className="chart-card">
          <h3>Attendance Trends</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#3b82f6"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Grade Distribution</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gradeData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {gradeData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Monthly Enrollment</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;



// function Dashboard({ students }) {
//   const totalStudents = students.length;

//   const totalTeachers = 12;

//   const attendancePercentage = 92;

//   const upcomingExams = 4;

//   return (
//     <div className="dashboard">
//       <h1>Dashboard</h1>

//       <div className="dashboard-cards">

//         <div className="card">
//           <h3>Total Students</h3>
//           <p>{totalStudents}</p>
//         </div>

//         <div className="card">
//           <h3>Total Teachers</h3>
//           <p>{totalTeachers}</p>
//         </div>

//         <div className="card">
//           <h3>Attendance %</h3>
//           <p>{attendancePercentage}%</p>
//         </div>

//         <div className="card">
//           <h3>Upcoming Exams</h3>
//           <p>{upcomingExams}</p>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Dashboard;