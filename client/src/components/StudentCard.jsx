import StudentForm from "./StudentForm";

function AddStudent({ students, setStudents }) {
  return (
    <div>
      <h1>Add Student</h1>

      <StudentForm
        students={students}
        setStudents={setStudents}
      />
    </div>
  );
}

export default AddStudent;