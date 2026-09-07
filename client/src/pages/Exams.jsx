import { useEffect, useState } from "react";
import axios from "axios";
import {
  BookOpen,
  CalendarDays,
  Clock,
  Plus,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Exams.css";

function Exams() {
  const { user } = useAuth();

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Create exam
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    examDate: "",
  });

  // Edit exam
  const [editingExam, setEditingExam] = useState(null);

  // Form states
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  // Delete loading
  const [deleteLoading, setDeleteLoading] = useState("");

  // Admin and Teacher can manage exams
  const canManageExam =
    user?.role === "admin" || user?.role === "teacher";

  // =========================
  // FETCH EXAMS
  // =========================
  const fetchExams = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/exams",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setExams(response.data.exams || []);
    } catch (err) {
      console.error("Exam error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load exams"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // =========================
  // HANDLE CREATE FORM
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // CREATE EXAM
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");
    setSuccess("");
    setFormLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/exams",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(
        response.data.message ||
          "Exam created successfully."
      );

      // Clear form
      setFormData({
        title: "",
        subject: "",
        examDate: "",
      });

      // Close form
      setShowForm(false);

      // Refresh exams
      await fetchExams();
    } catch (err) {
      console.error("Create exam error:", err);

      setFormError(
        err.response?.data?.message ||
          "Unable to create exam"
      );
    } finally {
      setFormLoading(false);
    }
  };

  // =========================
  // START EDITING
  // =========================
  const handleEdit = (exam) => {
    setShowForm(false);

    setEditingExam({
      ...exam,
      examDate: exam.examDate
        ? new Date(exam.examDate)
            .toISOString()
            .split("T")[0]
        : "",
    });

    setFormError("");
    setSuccess("");
  };

  // =========================
  // UPDATE EXAM
  // =========================
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingExam) {
      return;
    }

    setFormError("");
    setSuccess("");
    setFormLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/exams/${editingExam._id}`,
        {
          title: editingExam.title,
          subject: editingExam.subject,
          examDate: editingExam.examDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(
        response.data.message ||
          "Exam updated successfully."
      );

      // Close edit form
      setEditingExam(null);

      // Refresh list
      await fetchExams();
    } catch (err) {
      console.error("Update exam error:", err);

      setFormError(
        err.response?.data?.message ||
          "Unable to update exam"
      );
    } finally {
      setFormLoading(false);
    }
  };

  // =========================
  // DELETE EXAM
  // =========================
  const handleDelete = async (examId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this exam?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleteLoading(examId);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:5000/api/exams/${examId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(
        response.data.message ||
          "Exam deleted successfully."
      );

      // Refresh list
      await fetchExams();
    } catch (err) {
      console.error("Delete exam error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to delete exam"
      );
    } finally {
      setDeleteLoading("");
    }
  };

  // =========================
  // FORMAT DATE
  // =========================
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================
  // DAYS REMAINING
  // =========================
  const getDaysRemaining = (date) => {
    const today = new Date();
    const examDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    examDate.setHours(0, 0, 0, 0);

    const difference = examDate - today;

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="exams-page">
        <p className="exams-loading">
          Loading exams...
        </p>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error && exams.length === 0) {
    return (
      <div className="exams-page">
        <p className="exams-error">
          {error}
        </p>
      </div>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="exams-page">

      {/* ================= HEADER ================= */}
      <div className="exams-header">
        <div>
          <h1>Exams</h1>
          <p>
            View your upcoming examinations and
            important dates.
          </p>
        </div>

        {/* Create Exam */}
        {canManageExam && (
          <button
            type="button"
            className="create-exam-btn"
            onClick={() => {
              setShowForm(true);
              setEditingExam(null);
              setFormError("");
              setSuccess("");
            }}
          >
            <Plus size={18} />
            Create Exam
          </button>
        )}
      </div>

      {/* ================= SUCCESS ================= */}
      {success && (
        <div className="exam-success">
          {success}
        </div>
      )}

      {/* ================= ERROR ================= */}
      {error && exams.length > 0 && (
        <div className="exam-form-error">
          {error}
        </div>
      )}

      {/* ================= CREATE FORM ================= */}
      {showForm && (
        <div className="create-exam-card">

          <div className="create-exam-header">
            <div>
              <h2>Create Exam</h2>
              <p>
                Add a new examination to the schedule.
              </p>
            </div>

            <button
              type="button"
              className="close-exam-btn"
              onClick={() => {
                setShowForm(false);
                setFormError("");
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Error */}
          {formError && (
            <div className="exam-form-error">
              {formError}
            </div>
          )}

          <form
            className="exam-form"
            onSubmit={handleSubmit}
          >

            {/* Title */}
            <div className="exam-form-group">
              <label>Exam Title</label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Mid Term Examination"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Subject */}
            <div className="exam-form-group">
              <label>Subject</label>

              <input
                type="text"
                name="subject"
                placeholder="e.g. Mathematics"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            {/* Date */}
            <div className="exam-form-group">
              <label>Exam Date</label>

              <input
                type="date"
                name="examDate"
                value={formData.examDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Actions */}
            <div className="exam-form-actions">

              <button
                type="button"
                className="cancel-exam-btn"
                onClick={() => {
                  setShowForm(false);
                  setFormError("");
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-exam-btn"
                disabled={formLoading}
              >
                {formLoading
                  ? "Creating..."
                  : "Create Exam"}
              </button>

            </div>
          </form>
        </div>
      )}

      {/* ================= EDIT FORM ================= */}
      {editingExam && (
        <div className="edit-exam-card">

          <div className="create-exam-header">
            <div>
              <h2>Edit Exam</h2>
              <p>
                Update the examination details.
              </p>
            </div>

            <button
              type="button"
              className="close-exam-btn"
              onClick={() => {
                setEditingExam(null);
                setFormError("");
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Error */}
          {formError && (
            <div className="exam-form-error">
              {formError}
            </div>
          )}

          <form
            className="exam-form"
            onSubmit={handleUpdate}
          >

            {/* Title */}
            <div className="exam-form-group">
              <label>Exam Title</label>

              <input
                type="text"
                value={editingExam.title}
                onChange={(e) =>
                  setEditingExam({
                    ...editingExam,
                    title: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Subject */}
            <div className="exam-form-group">
              <label>Subject</label>

              <input
                type="text"
                value={editingExam.subject}
                onChange={(e) =>
                  setEditingExam({
                    ...editingExam,
                    subject: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Date */}
            <div className="exam-form-group">
              <label>Exam Date</label>

              <input
                type="date"
                value={editingExam.examDate}
                onChange={(e) =>
                  setEditingExam({
                    ...editingExam,
                    examDate: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Actions */}
            <div className="exam-form-actions">

              <button
                type="button"
                className="cancel-exam-btn"
                onClick={() => {
                  setEditingExam(null);
                  setFormError("");
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-exam-btn"
                disabled={formLoading}
              >
                {formLoading
                  ? "Updating..."
                  : "Update Exam"}
              </button>

            </div>
          </form>
        </div>
      )}

      {/* ================= SUMMARY ================= */}
      <div className="exam-summary">

        {/* Total */}
        <div className="exam-summary-card">
          <div className="exam-summary-icon">
            <BookOpen size={22} />
          </div>

          <div>
            <span>Total Exams</span>

            <h2>
              {exams.length}
            </h2>
          </div>
        </div>

        {/* Upcoming */}
        <div className="exam-summary-card">
          <div className="exam-summary-icon">
            <CalendarDays size={22} />
          </div>

          <div>
            <span>Upcoming Exams</span>

            <h2>
              {
                exams.filter(
                  (exam) =>
                    getDaysRemaining(
                      exam.examDate
                    ) >= 0
                ).length
              }
            </h2>
          </div>
        </div>

      </div>

      {/* ================= EXAMS SECTION ================= */}
      <div className="exams-section">

        <div className="exams-section-header">
          <div>
            <h2>
              Upcoming Examinations
            </h2>

            <p>
              Stay prepared for your upcoming exams.
            </p>
          </div>
        </div>

        {/* No Exams */}
        {exams.length === 0 ? (
          <div className="no-exams">
            <BookOpen size={40} />

            <h3>
              No exams scheduled
            </h3>

            <p>
              There are currently no examinations
              available.
            </p>
          </div>
        ) : (
          <div className="exam-list">

            {exams.map((exam) => {
              const daysRemaining =
                getDaysRemaining(
                  exam.examDate
                );

              const isCompleted =
                daysRemaining < 0;

              return (
                <div
                  className="exam-item"
                  key={exam._id}
                >

                  {/* Icon */}
                  <div className="exam-icon">
                    <BookOpen size={23} />
                  </div>

                  {/* Information */}
                  <div className="exam-info">

                    <h3>
                      {exam.title}
                    </h3>

                    <span className="exam-subject">
                      {exam.subject}
                    </span>

                    <div className="exam-date">
                      <CalendarDays size={15} />

                      <span>
                        {formatDate(
                          exam.examDate
                        )}
                      </span>
                    </div>

                  </div>

                  {/* Status + Actions */}
                  <div className="exam-status">

                    {isCompleted ? (
                      <span className="completed">
                        Completed
                      </span>
                    ) : (
                      <>
                        <span className="upcoming">
                          Upcoming
                        </span>

                        <div className="days-left">
                          <Clock size={14} />

                          {daysRemaining === 0
                            ? "Today"
                            : `${daysRemaining} days left`}
                        </div>
                      </>
                    )}

                    {/* Admin / Teacher Actions */}
                    {canManageExam && (
                      <div className="exam-actions">

                        <button
                          type="button"
                          className="edit-exam-btn"
                          onClick={() =>
                            handleEdit(exam)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-exam-btn"
                          onClick={() =>
                            handleDelete(
                              exam._id
                            )
                          }
                          disabled={
                            deleteLoading ===
                            exam._id
                          }
                        >
                          {deleteLoading ===
                          exam._id
                            ? "Deleting..."
                            : "Delete"}
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

export default Exams;