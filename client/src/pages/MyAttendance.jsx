import { useEffect, useState } from "react";
import axios from "axios";
import {
  CalendarCheck,
  CheckCircle,
  XCircle,
  Percent,
} from "lucide-react";
import "./MyAttendance.css";

function MyAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [statistics, setStatistics] = useState({
    totalDays: 0,
    presentDays: 0,
    absentDays: 0,
    attendancePercentage: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/attendance/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAttendance(response.data.attendance || []);
        setStatistics(
          response.data.statistics || {
            totalDays: 0,
            presentDays: 0,
            absentDays: 0,
            attendancePercentage: 0,
          }
        );
      } catch (err) {
        console.error("Attendance error:", err);
        setError("Unable to load attendance");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="attendance-page">
        <p className="attendance-loading">Loading attendance...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="attendance-page">
        <p className="attendance-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="attendance-page">

      {/* Header */}
      <div className="attendance-header">
        <div>
          <h1>My Attendance</h1>
          <p>
            Track your attendance and view your attendance history.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="attendance-summary">

        <div className="attendance-card">
          <div className="attendance-icon">
            <Percent size={22} />
          </div>

          <div>
            <span>Attendance</span>
            <h2>{statistics.attendancePercentage}%</h2>
          </div>
        </div>

        <div className="attendance-card">
          <div className="attendance-icon">
            <CheckCircle size={22} />
          </div>

          <div>
            <span>Present Days</span>
            <h2>{statistics.presentDays}</h2>
          </div>
        </div>

        <div className="attendance-card">
          <div className="attendance-icon">
            <XCircle size={22} />
          </div>

          <div>
            <span>Absent Days</span>
            <h2>{statistics.absentDays}</h2>
          </div>
        </div>

        <div className="attendance-card">
          <div className="attendance-icon">
            <CalendarCheck size={22} />
          </div>

          <div>
            <span>Total Days</span>
            <h2>{statistics.totalDays}</h2>
          </div>
        </div>

      </div>

      {/* Attendance History */}
      <div className="attendance-table-card">

        <div className="attendance-table-heading">
          <div>
            <h2>Attendance History</h2>
            <p>Your daily attendance records</p>
          </div>
        </div>

        {attendance.length === 0 ? (
          <div className="no-attendance">
            <p>No attendance records available.</p>
          </div>
        ) : (
          <div className="attendance-table-container">

            <table>

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {attendance.map((record) => (
                  <tr key={record._id}>

                    <td>
                      {formatDate(record.date)}
                    </td>

                    <td>
                      {record.status === "Present" ? (
                        <span className="attendance-status present">
                          <CheckCircle size={15} />
                          Present
                        </span>
                      ) : (
                        <span className="attendance-status absent">
                          <XCircle size={15} />
                          Absent
                        </span>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default MyAttendance;