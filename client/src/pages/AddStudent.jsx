import StudentForm from "../components/StudentForm";

function AddStudent({ students, setStudents }) {
  return (
    <div className="container">
      <h1>Add Student</h1>

      <StudentForm
        students={students}
        setStudents={setStudents}
      />
    </div>
  );
}

export default AddStudent;