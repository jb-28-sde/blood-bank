import React, { useState, useEffect } from "react";
import "./Login.css";
import { userLogin } from "../../redux/features/auth/authActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    role: "donar",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!loading && user && token) {
      navigate("/");
    }
  }, [user, token, loading, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Form Data:", formData);
    dispatch(userLogin(formData));
  };

  return (
    <div className="container-fluid login-page">
      <div className="row">
        {/* Left Banner Section */}
        <div className="col-md-7 form-banner">
          <img
            src="/banner-2"
            alt="login banner"
            className="img-fluid banner-img"
          />
        </div>

        {/* Right Form Section */}
        <div className="col-md-5 form-container d-flex flex-column justify-content-center align-items-center">
          <div className="form-box shadow-lg p-4 rounded">
            <h2 className="text-center mb-4 text-danger fw-bold">Login Page</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Select Role</label>
                <select
                  className="form-select"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="donar">Donar</option>
                  <option value="admin">Admin</option>
                  <option value="hospital">Hospital</option>
                  <option value="organisation">Organisation</option>
                </select>
              </div>

              {/* Email & Password */}
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  name="password"
                  value={formData.password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
                <small
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                  className="text-primary"
                >
                  {showPassword ? "Hide" : "Show"}
                </small>
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-danger"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                {error && (
                  <p className="text-danger text-center mt-2">{error}</p>
                )}
              </div>

              <p className="text-center mt-3">
                Don’t have an account?
                <a
                  href="/register"
                  className="text-decoration-none text-primary"
                >
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
