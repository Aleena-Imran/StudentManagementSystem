import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserPlus, ArrowLeft } from "lucide-react";

import "./AddTeacher.css";

function AddTeacher() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/teachers",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(
        response.data.message || "Teacher added successfully."
      );

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      // Redirect to teacher list after a short delay
      setTimeout(() => {
        navigate("/teachers");
      }, 1000);
    } catch (err) {
      console.error("Add teacher error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to add teacher. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-teacher-page">
      <div className="add-teacher-container">

        <button
          className="back-to-teachers-btn"
          onClick={() => navigate("/teachers")}
        >
          <ArrowLeft size={18} />
          Back to Teachers
        </button>

        <div className="add-teacher-header">
          <div className="add-teacher-icon">
            <UserPlus size={28} />
          </div>

          <div>
            <h1>Add Teacher</h1>
            <p>
              Create a new teacher account for the institution.
            </p>
          </div>
        </div>

        <div className="add-teacher-card">
          <form onSubmit={handleSubmit}>

            <div className="add-teacher-form-group">
              <label htmlFor="name">Teacher Name</label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter teacher name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-teacher-form-group">
              <label htmlFor="email">Email Address</label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter teacher email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-teacher-form-group">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                minLength={6}
                required
              />

              <span className="password-hint">
                Password must be at least 6 characters.
              </span>
            </div>

            {error && (
              <div className="add-teacher-error">
                {error}
              </div>
            )}

            {success && (
              <div className="add-teacher-success">
                {success}
              </div>
            )}

            <div className="add-teacher-actions">

              <button
                type="button"
                className="cancel-teacher-btn"
                onClick={() => navigate("/teachers")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-teacher-btn"
                disabled={loading}
              >
                <UserPlus size={18} />

                {loading ? "Adding Teacher..." : "Add Teacher"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTeacher;