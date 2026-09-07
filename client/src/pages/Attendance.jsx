import { useEffect, useState } from "react";
import axios from "axios";
import { CalendarDays, Save } from "lucide-react";
import "./Attendance.css";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/attendance/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const formatted = res.data.map((student) => ({
        ...student,
        status: "Present",
      }));

      setStudents(formatted);
    } catch (err) {
      console.error(err);
      setMessage("Unable to load students");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = (id, status) => {
    setStudents((prev) =>
      prev.map((student) =>
        student._id === id
          ? { ...student, status }
          : student
      )
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/attendance",
        {
          date,
          attendance: students.map((student) => ({
            studentId: student._id,
            status: student.status,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Attendance saved successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to save attendance");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="teacher-attendance-page">
        <p>Loading students...</p>
      </div>
    );
  }

  return (
    <div className="teacher-attendance-page">

      <div className="teacher-attendance-header">
        <div>
          <h1>Mark Attendance</h1>
          <p>
            Select attendance for each student.
          </p>
        </div>

        <div className="attendance-date">
          <CalendarDays size={18} />
          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />
        </div>
      </div>

      {message && (
        <div className="attendance-message">
          {message}
        </div>
      )}

      <div className="teacher-attendance-card">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.course}</td>

                <td>
                  <div className="status-buttons">

                    <button
                      className={
                        student.status === "Present"
                          ? "present active"
                          : "present"
                      }
                      onClick={() =>
                        updateStatus(
                          student._id,
                          "Present"
                        )
                      }
                    >
                      Present
                    </button>

                    <button
                      className={
                        student.status === "Absent"
                          ? "absent active"
                          : "absent"
                      }
                      onClick={() =>
                        updateStatus(
                          student._id,
                          "Absent"
                        )
                      }
                    >
                      Absent
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="attendance-save">
          <button
            onClick={handleSave}
            disabled={saving}
          >
            <Save size={18} />
            {saving
              ? "Saving..."
              : "Save Attendance"}
          </button>
        </div>
      </div>

    </div>
  );
}

export default Attendance;