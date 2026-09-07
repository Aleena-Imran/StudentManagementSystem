import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Users,
  Mail,
  GraduationCap,
  Pencil,
  X,
} from "lucide-react";

import "./Students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit student states
  const [editingStudent, setEditingStudent] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCourse, setEditCourse] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  // =========================
  // GET STUDENTS
  // =========================

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(response.data.students);
    } catch (err) {
      console.error("Students error:", err);
      setError("Unable to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // =========================
  // OPEN EDIT
  // =========================

  const handleEdit = (student) => {
    setEditingStudent(student);

    setEditName(student.name || "");
    setEditCourse(student.course || "");

    setEditError("");
  };

  // =========================
  // CLOSE EDIT
  // =========================

  const handleCloseEdit = () => {
    setEditingStudent(null);

    setEditName("");
    setEditCourse("");

    setEditError("");
  };

  // =========================
  // UPDATE STUDENT
  // =========================

  const handleUpdate = async (e) => {
    e.preventDefault();

    setEditError("");
    setEditLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/students/${editingStudent._id}`,
        {
          name: editName,
          course: editCourse,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the student in the table
      setStudents((currentStudents) =>
        currentStudents.map((student) =>
          student._id === editingStudent._id
            ? response.data.student
            : student
        )
      );

      handleCloseEdit();
    } catch (err) {
      console.error("Update student error:", err);

      setEditError(
        err.response?.data?.message ||
          "Unable to update student."
      );
    } finally {
      setEditLoading(false);
    }
  };


// =========================
// DELETE STUDENT
// =========================

const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this student?"
  );

  if (!confirmed) return;

  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/students/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Remove deleted student from the table
    setStudents((currentStudents) =>
      currentStudents.filter(
        (student) => student._id !== id
      )
    );
  } catch (err) {
    console.error("Delete student error:", err);

    alert(
      err.response?.data?.message ||
        "Unable to delete student."
    );
  }
};

  // =========================
  // SEARCH
  // =========================

  const filteredStudents = students.filter((student) => {
    const search = searchTerm.toLowerCase();

    return (
      student.name?.toLowerCase().includes(search) ||
      student.email?.toLowerCase().includes(search) ||
      student.course?.toLowerCase().includes(search)
    );
  });

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="students-page">
        <p>Loading students...</p>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="students-page">
        <p>{error}</p>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="students-page">

      {/* HEADER */}

      <div className="students-header">

        <div>
          <h1>Student Management</h1>

          <p>
            View and manage all registered students.
          </p>
        </div>

        <div className="students-count">
          <Users size={18} />

          <span>
            {students.length} Students
          </span>
        </div>

      </div>


      {/* SEARCH */}

      <div className="students-toolbar">

        <div className="student-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search by name, email or course..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>

      </div>


      {/* STUDENT TABLE */}

      <div className="students-table-card">

        {filteredStudents.length === 0 ? (

          <div className="students-empty">

            <Users size={40} />

            <h3>No students found</h3>

            <p>
              Try changing your search.
            </p>

          </div>

        ) : (

          <div className="students-table-wrapper">

            <table className="students-table">

              <thead>

                <tr>

                  <th>Student</th>

                  <th>Email</th>

                  <th>Course</th>

                  <th>Grade</th>

                  <th>Action</th>

                </tr>

              </thead>


              <tbody>

                {filteredStudents.map((student) => (

                  <tr key={student._id}>

                    {/* STUDENT */}

                    <td>

                      <div className="student-name-cell">

                        <div className="student-avatar">

                          {student.name
                            ?.charAt(0)
                            .toUpperCase()}

                        </div>

                        <strong>
                          {student.name}
                        </strong>

                      </div>

                    </td>


                    {/* EMAIL */}

                    <td>

                      <div className="student-email">

                        <Mail size={16} />

                        {student.email || "N/A"}

                      </div>

                    </td>


                    {/* COURSE */}

                    <td>

                      <div className="student-course">

                        <GraduationCap size={16} />

                        {student.course || "N/A"}

                      </div>

                    </td>


                    {/* GRADE */}

                    <td>

                      <span className="grade-badge">

                        {student.grade || "N/A"}

                      </span>

                    </td>


                    {/* EDIT */}

                    <td>
  <button
    className="edit-student-btn"
    onClick={() => handleEdit(student)}
  >
    <Pencil size={15} />
    Edit
  </button>

  <button
    className="delete-student-btn"
    onClick={() => handleDelete(student._id)}
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

      {editingStudent && (

        <div className="edit-modal-overlay">

          <div className="edit-modal">

            {/* MODAL HEADER */}

            <div className="edit-modal-header">

              <div>

                <h2>Edit Student</h2>

                <p>
                  Update student information.
                </p>

              </div>


              <button
                className="close-edit-btn"
                onClick={handleCloseEdit}
              >

                <X size={20} />

              </button>

            </div>


            {/* EDIT FORM */}

            <form onSubmit={handleUpdate}>

              <div className="edit-form-group">

                <label>
                  Student Name
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


              <div className="edit-form-group">

                <label>
                  Course
                </label>

                <input
                  type="text"
                  value={editCourse}
                  onChange={(e) =>
                    setEditCourse(e.target.value)
                  }
                  required
                />

              </div>


              {editError && (

                <p className="edit-error">
                  {editError}
                </p>

              )}


              <div className="edit-modal-actions">

                <button
                  type="button"
                  className="cancel-edit-btn"
                  onClick={handleCloseEdit}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="save-edit-btn"
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


export default Students;