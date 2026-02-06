import React from "react";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Header.css";

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // logout handler
   const handleLogout = () => {
    
    localStorage.clear();
    toast.success("Logout successfully");

    
    setTimeout(() => {
      navigate("/login", { replace: true });
      
      window.location.reload();
    }, 100);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <BiSolidDonateBlood className="logo-icon" />
        <span className="app-title">Blood Bank App</span>
      </div>

      
      <div className="navbar-right">
        <p className="user-info">
          <FaRegUserCircle /> Welcome{" "}
          {user?.name || user?.hospitalName || user?.organisationName}
          <span className="role-badge">{user?.role}</span>
        </p>

        {(location.pathname === "/" ||
          location.pathname === "/donation" ||
          location.pathname === "/organisation") ? (
          <Link to="/analytics" className="nav-link">
            Analytics
          </Link>
        ) : (
          <Link to="/" className="nav-link">
            Home
          </Link>
        )}

        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
