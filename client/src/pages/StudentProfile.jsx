import { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import "./StudentProfile.css";

function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/profile/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile(response.data);
      } catch (err) {
        console.error("Profile error:", err);
        setError("Unable to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="profile-page">
        <p className="profile-loading">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <p className="profile-error">{error}</p>
      </div>
    );
  }

  const user = profile?.user;
  const student = profile?.student;

  return (
    <div className="profile-page">

      {/* Header */}
      <div className="profile-header">
        <div>
          <h1>My Profile</h1>
          <p>
            View your account and academic information.
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="profile-card">

        <div className="profile-top">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="profile-name">
            <h2>{user?.name}</h2>
            <span>
              <ShieldCheck size={15} />
              {user?.role}
            </span>
          </div>
        </div>

        {/* Account Information */}
        <div className="profile-section">
          <h3>Account Information</h3>

          <div className="profile-grid">

            <div className="profile-info">
              <div className="profile-info-icon">
                <User size={19} />
              </div>

              <div>
                <span>Full Name</span>
                <strong>{user?.name || "N/A"}</strong>
              </div>
            </div>

            <div className="profile-info">
              <div className="profile-info-icon">
                <Mail size={19} />
              </div>

              <div>
                <span>Email Address</span>
                <strong>{user?.email || "N/A"}</strong>
              </div>
            </div>

          </div>
        </div>

        {/* Academic Information */}
        <div className="profile-section">
          <h3>Academic Information</h3>

          <div className="profile-grid">

            <div className="profile-info">
              <div className="profile-info-icon">
                <GraduationCap size={19} />
              </div>

              <div>
                <span>Course</span>
                <strong>{student?.course || "Not available"}</strong>
              </div>
            </div>

            <div className="profile-info">
              <div className="profile-info-icon">
                <GraduationCap size={19} />
              </div>

              <div>
                <span>Grade</span>
                <strong>{student?.grade || "Not available"}</strong>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default StudentProfile;