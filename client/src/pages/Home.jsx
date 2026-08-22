import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Student Management System</h1>
        <p>
          Manage students, teachers, attendance, grades, and exams from one
          dashboard.
        </p>

        <div className="hero-buttons">
          <Link to="/students" className="btn">
            View Students
          </Link>

          <Link to="/dashboard" className="btn secondary">
            Dashboard
          </Link>
        </div>
      </section>

      <section className="stats">
        <div className="card">
          <h2>500+</h2>
          <p>Students</p>
        </div>

        <div className="card">
          <h2>45</h2>
          <p>Teachers</p>
        </div>

        <div className="card">
          <h2>92%</h2>
          <p>Attendance</p>
        </div>

        <div className="card">
          <h2>8</h2>
          <p>Upcoming Exams</p>
        </div>
      </section>

      <section className="features">
        <h2>Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Student Records</h3>
            <p>Add, update and manage student information.</p>
          </div>

          <div className="feature-card">
            <h3>Attendance Tracking</h3>
            <p>Monitor daily attendance efficiently.</p>
          </div>

          <div className="feature-card">
            <h3>Exam Management</h3>
            <p>Schedule and manage examinations.</p>
          </div>

          <div className="feature-card">
            <h3>Performance Reports</h3>
            <p>Track grades and academic performance.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;