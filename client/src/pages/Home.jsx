import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Clock3,
  BarChart3,
  Users,
  BookOpen,
  ClipboardCheck,
  CreditCard,
  UserRoundCheck,
  Bell,
} from "lucide-react";

import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="hero-section" id="home">

        <div className="hero-content">

          <div className="hero-badge">
            ✦ Smart • Simple • Secure
          </div>

          <h1>
            Manage Students.
            <br />
            <span>Empower Education.</span>
            <br />
            <strong>Build the Future.</strong>
          </h1>

          <p>
            EduManage is a complete Student Management System that
            helps institutions manage students, teachers, attendance,
            results, fees and much more — all in one place.
          </p>

          <div className="hero-buttons">

            <Link to="/login" className="primary-btn">
              Get Started
              <ArrowRight size={19} />
            </Link>

            <a href="#features" className="secondary-btn">
              <BookOpen size={18} />
              Explore Features
            </a>

          </div>

          <div className="hero-benefits">

            <div className="benefit">
              <ShieldCheck />
              <div>
                <strong>Secure & Reliable</strong>
                <span>Your data is safe with us</span>
              </div>
            </div>

            <div className="benefit">
              <Clock3 />
              <div>
                <strong>Save Time</strong>
                <span>Automate daily tasks</span>
              </div>
            </div>

            <div className="benefit">
              <BarChart3 />
              <div>
                <strong>Smart Analytics</strong>
                <span>Get insights at a glance</span>
              </div>
            </div>

          </div>

        </div>


        {/* DASHBOARD PREVIEW */}

        <div className="dashboard-preview">

          <div className="preview-sidebar">

            <div className="preview-logo">
              🎓 EduManage
            </div>

            <div className="preview-menu active">
              <BarChart3 size={17} />
              Dashboard
            </div>

            <div className="preview-menu">
              <Users size={17} />
              Students
            </div>

            <div className="preview-menu">
              <Users size={17} />
              Teachers
            </div>

            <div className="preview-menu">
              <BookOpen size={17} />
              Courses
            </div>

            <div className="preview-menu">
              <ClipboardCheck size={17} />
              Attendance
            </div>

            <div className="preview-menu">
              <CreditCard size={17} />
              Fees
            </div>

          </div>


          <div className="preview-main">

            <div className="preview-header">
              <strong>Dashboard</strong>

              <div className="preview-search">
                Search...
              </div>
            </div>


            <div className="preview-stats">

              <PreviewStat
                title="Total Students"
                value="1,250"
                icon={<Users />}
              />

              <PreviewStat
                title="Total Teachers"
                value="85"
                icon={<Users />}
              />

              <PreviewStat
                title="Attendance Rate"
                value="91.4%"
                icon={<ClipboardCheck />}
              />

              <PreviewStat
                title="Total Revenue"
                value="₹12.45L"
                icon={<CreditCard />}
              />

            </div>


            <div className="preview-charts">

              <div className="preview-chart large">

                <div className="preview-title">
                  Student Enrollment
                </div>

                <div className="fake-line-chart">

                  <div className="line-point p1"></div>
                  <div className="line-point p2"></div>
                  <div className="line-point p3"></div>
                  <div className="line-point p4"></div>
                  <div className="line-point p5"></div>
                  <div className="line-point p6"></div>

                </div>

              </div>


              <div className="preview-chart">

                <div className="preview-title">
                  Attendance Overview
                </div>

                <div className="fake-donut">
                  <span>91.4%</span>
                </div>

              </div>

            </div>


            <div className="preview-bottom">

              <div className="preview-list">

                <div className="preview-title">
                  Recent Students
                </div>

                <p>Rahul Sharma</p>
                <p>Priya Patel</p>
                <p>Aman Verma</p>
                <p>Sneha Singh</p>

              </div>


              <div className="preview-list">

                <div className="preview-title">
                  Upcoming Events
                </div>

                <p>Mid Term Exams</p>
                <p>Parent Teacher Meeting</p>
                <p>Fee Submission</p>
                <p>Summer Break</p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section className="features-section" id="features">

        <div className="section-badge">
          FEATURES
        </div>

        <h2>
          Everything You Need to
          <br />
          Manage Your Institution
        </h2>

        <p className="section-description">
          Powerful features designed for administrators,
          teachers and students.
        </p>


        <div className="feature-grid">

          <FeatureCard
            icon={<Users />}
            title="Student Management"
            text="Add, update and manage student information effortlessly."
          />

          <FeatureCard
            icon={<ClipboardCheck />}
            title="Attendance Tracking"
            text="Mark attendance and generate reports in just a few clicks."
          />

          <FeatureCard
            icon={<BarChart3 />}
            title="Results & Analytics"
            text="Record results and visualize academic performance."
          />

          <FeatureCard
            icon={<CreditCard />}
            title="Fee Management"
            text="Track fee payments, dues and financial information."
          />

          <FeatureCard
            icon={<UserRoundCheck />}
            title="Role Based Access"
            text="Secure access for Admins, Teachers and Students."
          />

          <FeatureCard
            icon={<Bell />}
            title="Notifications"
            text="Send important updates and announcements instantly."
          />

        </div>

      </section>


      {/* ABOUT */}

      <section className="about-section" id="about">

        <div>

          <div className="section-badge">
            ABOUT EDUMANAGE
          </div>

          <h2>
            One Platform.
            <br />
            Complete Control.
          </h2>

          <p>
            EduManage brings student records, attendance,
            academic results and administrative operations
            together in one centralized platform.
          </p>

          <p>
            With role-based access, administrators,
            teachers and students get exactly the tools
            they need.
          </p>

        </div>

      </section>

    </div>
  );
}


/* Preview statistic card */

function PreviewStat({ title, value, icon }) {
  return (
    <div className="preview-stat">

      <div className="preview-stat-icon">
        {icon}
      </div>

      <div>
        <small>{title}</small>
        <strong>{value}</strong>
      </div>

    </div>
  );
}


/* Feature card */

function FeatureCard({ icon, title, text }) {
  return (
    <div className="feature-card">

      <div className="feature-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

    </div>
  );
}


export default Home;