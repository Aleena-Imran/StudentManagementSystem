import { useState } from "react";
import axios from "axios";

function StudentForm() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/students",
        {
          name,
          course,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);

      setName("");
      setCourse("");
    } catch (err) {
      console.error("Add student error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to add student."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Enter Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        required
      />

      <br />
      <br />

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Student"}
      </button>

      {message && (
        <p style={{ color: "green" }}>
          {message}
        </p>
      )}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}
    </form>
  );
}

export default StudentForm;