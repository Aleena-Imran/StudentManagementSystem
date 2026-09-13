import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBookOpen,
} from "react-icons/fa";
import "./Assignments.css";

function Assignments() {
  const { user } = useAuth();

  // ==========================================
  // STATES
  // ==========================================

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    description: "",
    dueDate: "",
    course: "",
  });

  // ==========================================
  // HANDLE INPUT CHANGES
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear old messages when user starts typing
    setError("");
    setMessage("");
  };

  // ==========================================
  // FETCH ASSIGNMENTS
  // ==========================================

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      setError("");

      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
        setError("You are not logged in. Please login again.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/assignments",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        }
      );

      const data = await response.json();

      console.log("Assignments response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch assignments"
        );
      }

      setAssignments(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(
        "Fetch assignments error:",
        err
      );

      setError(
        err.message || "Failed to fetch assignments"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD ASSIGNMENTS WHEN PAGE OPENS
  // ==========================================

  useEffect(() => {
    fetchAssignments();
  }, []);

  // ==========================================
  // CREATE / UPDATE ASSIGNMENT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      setError(
        "You are not logged in. Please login again."
      );
      return;
    }

    try {
      const url = editingId
        ? `http://localhost:5000/api/assignments/${editingId}`
        : "http://localhost:5000/api/assignments";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${savedToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log("Create/Update response:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
            (editingId
              ? "Failed to update assignment"
              : "Failed to create assignment")
        );
      }

      // Success message
      setMessage(
        editingId
          ? "Assignment updated successfully!"
          : "Assignment created successfully!"
      );

      // Reset form
      setFormData({
        title: "",
        subject: "",
        description: "",
        dueDate: "",
        course: "",
      });

      setEditingId(null);

      // Refresh assignments
      await fetchAssignments();
    } catch (err) {
      console.error(
        "Assignment submit error:",
        err
      );

      setError(
        err.message ||
          "Failed to create assignment"
      );
    }
  };

  // ==========================================
  // EDIT ASSIGNMENT
  // ==========================================

  const handleEdit = (assignment) => {
    setEditingId(assignment._id);

    setFormData({
      title: assignment.title || "",
      subject: assignment.subject || "",
      description: assignment.description || "",
      dueDate: assignment.dueDate
        ? new Date(assignment.dueDate)
            .toISOString()
            .split("T")[0]
        : "",
      course: assignment.course || "",
    });

    setError("");
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // DELETE ASSIGNMENT
  // ==========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
        setError(
          "You are not logged in. Please login again."
        );
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/assignments/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        }
      );

      const data = await response.json();

      console.log("Delete response:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete assignment"
        );
      }

      setMessage(
        "Assignment deleted successfully!"
      );

      await fetchAssignments();
    } catch (err) {
      console.error(
        "Delete assignment error:",
        err
      );

      setError(
        err.message ||
          "Failed to delete assignment"
      );
    }
  };

  // ==========================================
  // CANCEL EDITING
  // ==========================================

  const handleCancel = () => {
    setEditingId(null);

    setFormData({
      title: "",
      subject: "",
      description: "",
      dueDate: "",
      course: "",
    });

    setError("");
    setMessage("");
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="assignments-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="assignments-header">
        <div>
          <h1>Assignment Management</h1>

          <p>
            Create and manage assignments for
            students
          </p>
        </div>

        <div className="assignment-count">
          <FaBookOpen />

          <span>
            {assignments.length} Assignments
          </span>
        </div>
      </div>

      {/* ======================================
          SUCCESS MESSAGE
      ====================================== */}

      {message && (
        <div className="mb-5 bg-green-100 text-green-700 px-4 py-3 rounded-lg">
          {message}
        </div>
      )}

      {/* ======================================
          ERROR MESSAGE
      ====================================== */}

      {error && (
        <div className="mb-5 bg-red-100 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* ======================================
          CREATE / EDIT FORM
      ====================================== */}

      {(user?.role === "admin" ||
        user?.role === "teacher") && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">

          {/* Form Header */}

          <div className="assignment-form-header">

        <div className="assignment-form-title-row">
          {editingId ? <FaEdit /> : <FaPlus />}

    <h2>
      {editingId
        ? "Edit Assignment"
        : "Create Assignment"}
    </h2>
  </div>

  <p>
    {editingId
      ? "Update assignment details"
      : "Add a new assignment for students"}
  </p>

</div>

          {/* Form */}

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* =================================
                  TITLE
              ================================= */}

              <div className="assignment-field">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assignment Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. React Assignment"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* =================================
                  SUBJECT
              ================================= */}

              <div className="assignment-field">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Web Development"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* =================================
                  COURSE
              ================================= */}

              <div className="assignment-field">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course
                </label>

                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="e.g. MCA"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <p className="text-xs text-gray-500 mt-1">
                  Enter the same course as the
                  student's profile.
                </p>

              </div>

              {/* =================================
                  DUE DATE
              ================================= */}

              <div className="assignment-field">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>

                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* =================================
                  DESCRIPTION
              ================================= */}

              <div className="assignment-field md:col-span-2">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter assignment instructions..."
                  rows="5"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />

              </div>

            </div>

            {/* =================================
                BUTTONS
            ================================= */}

            <div className="flex gap-3 mt-6">

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                {editingId
                  ? "Update Assignment"
                  : "Create Assignment"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>
      )}

      {/* ======================================
          ASSIGNMENT LIST
      ====================================== */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          All Assignments
        </h2>

        {/* LOADING */}

        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading assignments...
          </div>

        ) : assignments.length === 0 ? (

          /* NO ASSIGNMENTS */

          <div className="text-center py-10">

            <FaBookOpen className="mx-auto text-4xl text-gray-300 mb-3" />

            <p className="text-gray-500">
              No assignments created yet.
            </p>

          </div>

        ) : (

          /* ASSIGNMENTS */

          <div className="space-y-4">

            {assignments.map((assignment) => {

              const overdue =
                assignment.dueDate &&
                new Date(assignment.dueDate) <
                  new Date();

              return (
                <div
  key={assignment._id}
  className="assignment-card"
>

  <div className="assignment-card-content">

    <div className="assignment-details">

                      <div className="flex items-center gap-3 mb-2">

                        <h3 className="text-lg font-semibold text-gray-800">
                          {assignment.title}
                        </h3>

                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                          {assignment.course}
                        </span>

                      </div>

                      <p className="text-sm font-medium text-blue-600 mb-2">
                        {assignment.subject}
                      </p>

                      <p className="text-gray-600 text-sm mb-4">
                        {assignment.description}
                      </p>

                      <div className="text-sm">

                        <span className="text-gray-500">
                          Due Date:{" "}
                        </span>

                        <span
                          className={
                            overdue
                              ? "text-red-600 font-medium"
                              : "text-gray-700 font-medium"
                          }
                        >
                          {assignment.dueDate
                            ? new Date(
                                assignment.dueDate
                              ).toLocaleDateString()
                            : "Not specified"}
                        </span>

                      </div>

                    </div>

                    {/* =================================
                        ADMIN / TEACHER ACTIONS
                    ================================= */}

                    {(user?.role === "admin" ||
  user?.role === "teacher") && (

  <div className="assignment-actions">

    <button
      type="button"
      onClick={() =>
        handleEdit(assignment)
      }
      className="edit-assignment-btn"
      title="Edit Assignment"
    >
      <FaEdit />
    </button>

    <button
      type="button"
      onClick={() =>
        handleDelete(assignment._id)
      }
      className="delete-assignment-btn"
      title="Delete Assignment"
    >
      <FaTrash />
    </button>

  </div>

)}

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

    </div>
  );
}

export default Assignments;