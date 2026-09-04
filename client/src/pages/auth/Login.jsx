import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight
} from "lucide-react";

import "./Auth.css";


function Login() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setLoading(true);


    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.message || "Login failed"
        );

      }


      // Save authentication information

    login(data.user, data.token);

      // Redirect according to role

      if (data.user.role === "admin") {

        navigate("/dashboard");

      } else if (data.user.role === "teacher") {

        navigate("/teacher/dashboard");

      } else {

        navigate("/student/dashboard");

      }


    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          <GraduationCap size={28} />
        </div>


        <h1>
          Welcome Back
        </h1>


        <p className="auth-subtitle">
          Sign in to your EduManage account
        </p>


        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}


        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >

          <label>
            Email
          </label>

          <div className="input-wrapper">

            <Mail size={18} />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <label>Password</label>

<div className="input-wrapper password-wrapper">
  <Lock size={18} />

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Enter your password"
    value={formData.password}
    onChange={handleChange}
    required
  />

  <button
    type="button"
    className="password-toggle"
    onClick={() => setShowPassword(!showPassword)}
    aria-label={showPassword ? "Hide password" : "Show password"}
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>


          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >

            {loading
              ? "Signing in..."
              : "Sign In"
            }

            {!loading && (
              <ArrowRight size={18} />
            )}

          </button>

        </form>


        <p className="auth-footer">

          Don't have an account?

          {" "}

          <Link to="/register">
            Create account
          </Link>

        </p>


        <Link
          to="/"
          className="back-home"
        >
          ← Back to Home
        </Link>

      </div>

    </div>

  );

}


export default Login;