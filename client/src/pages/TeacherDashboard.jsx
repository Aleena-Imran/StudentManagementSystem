const TeacherDashboard = () => {
  return (
    <div className="dashboard-container">

      <h1>Teacher Dashboard</h1>

      <p>
        Manage your classes, attendance and student performance.
      </p>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>My Students</h3>
          <h2>120</h2>
        </div>

        <div className="dashboard-card">
          <h3>Today's Attendance</h3>
          <h2>94%</h2>
        </div>

        <div className="dashboard-card">
          <h3>Upcoming Exams</h3>
          <h2>4</h2>
        </div>

        <div className="dashboard-card">
          <h3>Pending Tasks</h3>
          <h2>7</h2>
        </div>

      </div>

      <div className="dashboard-section">
        <h2>Teacher Actions</h2>

        <ul>
          <li>Mark Attendance</li>
          <li>View Students</li>
          <li>Enter Grades</li>
          <li>View Exams</li>
        </ul>
      </div>

    </div>
  );
};

export default TeacherDashboard;