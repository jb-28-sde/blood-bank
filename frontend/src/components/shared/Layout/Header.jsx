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
  //logout handler
  const handlelogout = () => {
    localStorage.clear();
    toast.success("logout Succesfully");
    navigate("/login");
  };
  return (
    <>
      <h1>
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-brand">
              <BiSolidDonateBlood style={{ fontSize: "40px", color: "red" }} />
              Blood Bank App
            </div>
            <ul className="navbar-nav flex-row">
              <li className="nav-item mx-3">
                <p className="nav-link">
                  <FaRegUserCircle /> welcome{" "}
                  {user?.name || user?.hospitalName || user?.organisationName}
                  &nbsp;
                  <span className="badge text-bg-secondary">{user?.role}</span>
                </p>
              </li>
              {(location.pathname === "/" || location.pathname === "/donation" || location.pathname === '/organisation')? (
                <li className="nav-item mx-3">
                  <Link to="/analytics" className="nav-link">
                    Analytics
                  </Link>
                </li>
              ) : (
                <li className="nav-item mx-3">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
              )}
              <li className="nav-item mx-3">
                <button className="btn btn-danger" onClick={handlelogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </h1>
    </>
  );
}
