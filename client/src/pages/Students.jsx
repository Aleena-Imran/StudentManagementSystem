function Students({ students }) {
  return (
    <div className="container">
      <h1>Students List</h1>

      {students.length === 0 ? (
        <p>No Students Added</p>
      ) : (
        <ul>
          {students.map((student, index) => (
            <li key={student.id}>
              {index + 1}) {student.name} - {student.course}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Students;