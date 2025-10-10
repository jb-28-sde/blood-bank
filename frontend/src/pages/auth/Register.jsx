import React, { useState } from "react";
import API from "../../services/API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "donar",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
    idProof: "",
  });

  const [errors, setErrors] = useState({});

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await API.post("/auth/register", formData);
      console.log("Response =>", res.data);

      toast.success(res.data.message || "Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("Error =>", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="container-fluid register-page">
      <div className="row min-vh-100">
        <div className="col-md-6 d-none d-md-flex p-0">
          <img
            src="/banner-3.png"
            alt="Register Banner"
            className="img-fluid w-100 h-100"
            style={{
              objectFit: "contain",
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
            }}
          />
        </div>

        <div className="col-md-5 form-container d-flex flex-column justify-content-center align-items-center">
          <div className="form-box shadow-lg p-4 rounded">
            <h2 className="text-center mb-4 text-danger fw-bold">
              Register Page
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="admin">Admin</option>
                  <option value="organisation">Organisation</option>
                  <option value="donar">Donar</option>
                  <option value="hospital">Hospital</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <small className="text-danger">{errors.name}</small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <small className="text-danger">
                    {errors.confirmPassword}
                  </small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">ID Proof</label>
                <input
                  type="text"
                  name="idProof"
                  className="form-control"
                  value={formData.idProof}
                  onChange={handleChange}
                  placeholder="Enter ID proof (file upload later)"
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-danger">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
