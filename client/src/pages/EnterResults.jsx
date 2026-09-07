import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GraduationCap, ArrowLeft, Save } from "lucide-react";

import "./EnterResults.css";

function EnterResults() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    subject: "",
    assessment: "",
    marksObtained: "",
    maxMarks: "",
    grade: "",
    semester: "",
    examDate: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/results/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(response.data || []);
    } catch (err) {
      console.error("Fetch students error:", err);
      setError("Unable to load students.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (
      Number(formData.marksObtained) >
      Number(formData.maxMarks)
    ) {
      setError(
        "Marks obtained cannot exceed maximum marks."
      );
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/results",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        response.data.message ||
          "Result added successfully."
      );

      setFormData({
        studentId: "",
        subject: "",
        assessment: "",
        marksObtained: "",
        maxMarks: "",
        grade: "",
        semester: "",
        examDate: "",
      });
    } catch (err) {
      console.error("Add result error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to add result."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="enter-results-page">
        <p>Loading students...</p>
      </div>
    );
  }

  return (
    <div className="enter-results-page">
      <div className="enter-results-container">

        <button
          className="back-results-btn"
          onClick={() => navigate("/teacher/dashboard")}
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="enter-results-header">
          <div className="enter-results-icon">
            <GraduationCap size={28} />
          </div>

          <div>
            <h1>Enter Grades</h1>
            <p>
              Add examination results for your students.
            </p>
          </div>
        </div>

        <div className="enter-results-card">
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Student</label>

              <select
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Student
                </option>

                {students.map((student) => (
                  <option
                    key={student._id}
                    value={student._id}
                  >
                    {student.name} - {student.course}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Subject</label>

                <input
                  type="text"
                  name="subject"
                  placeholder="e.g. Database Management"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Assessment</label>

                <input
                  type="text"
                  name="assessment"
                  placeholder="e.g. Mid Term"
                  value={formData.assessment}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Marks Obtained</label>

                <input
                  type="number"
                  name="marksObtained"
                  min="0"
                  placeholder="e.g. 85"
                  value={formData.marksObtained}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Maximum Marks</label>

                <input
                  type="number"
                  name="maxMarks"
                  min="1"
                  placeholder="e.g. 100"
                  value={formData.maxMarks}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Grade</label>

                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Grade
                  </option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
              </div>

              <div className="form-group">
                <label>Semester</label>

                <input
                  type="text"
                  name="semester"
                  placeholder="e.g. Semester 4"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label>Exam Date</label>

              <input
                type="date"
                name="examDate"
                value={formData.examDate}
                onChange={handleChange}
              />
            </div>

            {error && (
              <div className="result-form-error">
                {error}
              </div>
            )}

            {message && (
              <div className="result-form-success">
                {message}
              </div>
            )}

            <div className="enter-results-actions">
              <button
                type="button"
                className="cancel-result-btn"
                onClick={() =>
                  navigate("/teacher/dashboard")
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-result-btn"
                disabled={saving}
              >
                <Save size={18} />

                {saving
                  ? "Saving..."
                  : "Save Result"}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}

export default EnterResults;