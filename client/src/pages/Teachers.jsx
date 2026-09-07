import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Search,
  Users,
  Mail,
  Pencil,
  X,
  UserRoundCheck,
  UserPlus,
} from "lucide-react";

import "./Teachers.css";

function Teachers() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit teacher states
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  // ==========================================
  // GET TEACHERS
  // ==========================================

  const fetchTeachers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/teachers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTeachers(response.data.teachers);
    } catch (err) {
      console.error("Teachers error:", err);
      setError("Unable to load teachers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // ==========================================
  // OPEN EDIT
  // ==========================================

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setEditName(teacher.name || "");
    setEditEmail(teacher.email || "");
    setEditError("");
  };

  // ==========================================
  // CLOSE EDIT
  // ==========================================

  const handleCloseEdit = () => {
    setEditingTeacher(null);
    setEditName("");
    setEditEmail("");
    setEditError("");
  };

  // ==========================================
  // UPDATE TEACHER
  // ==========================================

  const handleUpdate = async (e) => {
    e.preventDefault();

    setEditError("");
    setEditLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/teachers/${editingTeacher._id}`,
        {
          name: editName,
          email: editEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTeachers((currentTeachers) =>
        currentTeachers.map((teacher) =>
          teacher._id === editingTeacher._id
            ? response.data.teacher
            : teacher
        )
      );

      handleCloseEdit();
    } catch (err) {
      console.error("Update teacher error:", err);

      setEditError(
        err.response?.data?.message ||
          "Unable to update teacher."
      );
    } finally {
      setEditLoading(false);
    }
  };

  // ==========================================
  // DELETE TEACHER
  // ==========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/teachers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTeachers((currentTeachers) =>
        currentTeachers.filter(
          (teacher) => teacher._id !== id
        )
      );
    } catch (err) {
      console.error("Delete teacher error:", err);

      alert(
        err.response?.data?.message ||
          "Unable to delete teacher."
      );
    }
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredTeachers = teachers.filter((teacher) => {
    const search = searchTerm.toLowerCase();

    return (
      teacher.name?.toLowerCase().includes(search) ||
      teacher.email?.toLowerCase().includes(search)
    );
  });

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="teachers-page">
        <p>Loading teachers...</p>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="teachers-page">
        <p>{error}</p>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="teachers-page">

      {/* HEADER */}

  <div className="teachers-header">
  <div>
    <h1>Teacher Management</h1>
    <p>View and manage all registered teachers.</p>
  </div>

  <div className="teachers-header-actions">
    <div className="teachers-count">
      <UserRoundCheck size={18} />
      <span>{teachers.length} Teachers</span>
    </div>

    <button
      className="add-teacher-btn"
      onClick={() => navigate("/add-teacher")}
    >
      <UserPlus size={18} />
      Add Teacher
    </button>
  </div>
</div>

      {/* SEARCH */}

      <div className="teachers-toolbar">
        <div className="teacher-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>
      </div>

      {/* TEACHER TABLE */}

      <div className="teachers-table-card">

        {filteredTeachers.length === 0 ? (
          <div className="teachers-empty">
            <Users size={40} />

            <h3>No teachers found</h3>

            <p>
              Try changing your search.
            </p>
          </div>
        ) : (
          <div className="teachers-table-wrapper">

            <table className="teachers-table">

              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher._id}>

                    {/* TEACHER */}

                    <td>
                      <div className="teacher-name-cell">

                        <div className="teacher-avatar">
                          {teacher.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <strong>
                          {teacher.name}
                        </strong>

                      </div>
                    </td>

                    {/* EMAIL */}

                    <td>
                      <div className="teacher-email">
                        <Mail size={16} />
                        {teacher.email || "N/A"}
                      </div>
                    </td>

                    {/* ROLE */}

                    <td>
                      <span className="teacher-role-badge">
                        Teacher
                      </span>
                    </td>

                    {/* ACTION */}

                    <td>
                      <button
                        className="edit-teacher-btn"
                        onClick={() =>
                          handleEdit(teacher)
                        }
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        className="delete-teacher-btn"
                        onClick={() =>
                          handleDelete(teacher._id)
                        }
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* =========================
          EDIT MODAL
      ========================= */}

      {editingTeacher && (
        <div className="teacher-edit-modal-overlay">

          <div className="teacher-edit-modal">

            {/* MODAL HEADER */}

            <div className="teacher-edit-modal-header">

              <div>
                <h2>Edit Teacher</h2>

                <p>
                  Update teacher information.
                </p>
              </div>

              <button
                className="teacher-close-edit-btn"
                onClick={handleCloseEdit}
              >
                <X size={20} />
              </button>

            </div>

            {/* EDIT FORM */}

            <form onSubmit={handleUpdate}>

              <div className="teacher-edit-form-group">
                <label>
                  Teacher Name
                </label>

                <input
                  type="text"
                  value={editName}
                  onChange={(e) =>
                    setEditName(e.target.value)
                  }
                  required
                />
              </div>

              <div className="teacher-edit-form-group">
                <label>
                  Email
                </label>

                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) =>
                    setEditEmail(e.target.value)
                  }
                  required
                />
              </div>

              {editError && (
                <p className="teacher-edit-error">
                  {editError}
                </p>
              )}

              <div className="teacher-edit-modal-actions">

                <button
                  type="button"
                  className="teacher-cancel-edit-btn"
                  onClick={handleCloseEdit}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="teacher-save-edit-btn"
                  disabled={editLoading}
                >
                  {editLoading
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Teachers;