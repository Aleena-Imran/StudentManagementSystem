import { useEffect, useState } from "react";
import axios from "axios";

import {
  User,
  Mail,
  GraduationCap,
  ShieldCheck,
  Pencil,
  Save,
  X,
} from "lucide-react";

import "./StudentProfile.css";

function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

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
      setName(response.data?.user?.name || "");
    } catch (err) {
      console.error("Profile error:", err);
      setError("Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setName(profile?.user?.name || "");
    setSuccess("");
    setError("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setName(profile?.user?.name || "");
    setIsEditing(false);
    setError("");
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Name cannot be empty");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:5000/api/profile/me",
        {
          name: name.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile({
        user: response.data.user,
        student: response.data.student,
      });

      setName(response.data.user.name);
      setIsEditing(false);
      setSuccess("Profile updated successfully");
    } catch (err) {
      console.error("Update profile error:", err);

      setError(
        err.response?.data?.message || "Unable to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <p className="profile-loading">Loading profile...</p>
      </div>
    );
  }

  if (error && !profile) {
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

        {!isEditing && (
          <button
            className="profile-edit-btn"
            onClick={handleEdit}
            type="button"
          >
            <Pencil size={17} />
            Edit Profile
          </button>
        )}
      </div>

      {/* Success Message */}
      {success && (
        <div className="profile-success">
          ✓ {success}
        </div>
      )}

      {/* Error Message */}
      {error && profile && (
        <div className="profile-error">
          {error}
        </div>
      )}

      {/* Profile Card */}
      <div className="profile-card">

        {/* Profile Top */}
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

            {/* Full Name */}
            <div className="profile-info">
              <div className="profile-info-icon">
                <User size={19} />
              </div>

              <div className="profile-field">
                <span>Full Name</span>

                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="profile-input"
                    placeholder="Enter your name"
                  />
                ) : (
                  <strong>{user?.name || "N/A"}</strong>
                )}
              </div>
            </div>

            {/* Email */}
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

            {/* Course */}
            <div className="profile-info">
              <div className="profile-info-icon">
                <GraduationCap size={19} />
              </div>

              <div>
                <span>Course</span>
                <strong>
                  {student?.course || "Not available"}
                </strong>
              </div>
            </div>

            {/* Grade */}
            <div className="profile-info">
              <div className="profile-info-icon">
                <GraduationCap size={19} />
              </div>

              <div>
                <span>Grade</span>
                <strong>
                  {student?.grade || "Not available"}
                </strong>
              </div>
            </div>

          </div>
        </div>

        {/* Edit Actions */}
        {isEditing && (
          <div className="profile-actions">

            <button
              className="profile-cancel-btn"
              onClick={handleCancel}
              type="button"
              disabled={saving}
            >
              <X size={17} />
              Cancel
            </button>

            <button
              className="profile-save-btn"
              onClick={handleSave}
              type="button"
              disabled={saving}
            >
              <Save size={17} />
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default StudentProfile;