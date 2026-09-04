const AdminDashboard = () => {
  return (
    <div className="dashboard-container">

      <h1>Admin Dashboard</h1>

      <p>
        Manage students, teachers, attendance and exams.
      </p>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Total Students</h3>
          <h2>500</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Teachers</h3>
          <h2>45</h2>
        </div>

        <div className="dashboard-card">
          <h3>Attendance</h3>
          <h2>92%</h2>
        </div>

        <div className="dashboard-card">
          <h3>Upcoming Exams</h3>
          <h2>8</h2>
        </div>

      </div>

      <div className="dashboard-section">
        <h2>Admin Controls</h2>

        <ul>
          <li>Manage Students</li>
          <li>Manage Teachers</li>
          <li>Manage Attendance</li>
          <li>Manage Exams</li>
          <li>View Reports</li>
        </ul>
      </div>

    </div>
  );
};

export default AdminDashboard;