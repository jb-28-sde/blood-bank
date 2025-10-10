import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import "./AdminHome.css";

export default function AdminHome() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      <div className="admin-home container py-5">
        <div className="welcome-section text-center mb-5">
          <h1 className="welcome-title">
            Welcome, <span className="admin-name">{user?.name || "Admin"}</span>
          </h1>
          <p className="subtitle">Manage and Monitor the Blood Bank Operations</p>
          <hr className="divider" />
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card admin-card shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-droplet-fill icon text-danger"></i>
                <h5 className="mt-3">Blood Inventory</h5>
                <p>Track and manage all available blood samples with live updates.</p>
                <button className="btn btn-outline-danger btn-sm">View Inventory</button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card admin-card shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-people-fill icon text-primary"></i>
                <h5 className="mt-3">Donor Management</h5>
                <p>View, verify, and manage registered blood donors efficiently.</p>
                <button className="btn btn-outline-primary btn-sm">Manage Donors</button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card admin-card shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-hospital-fill icon text-success"></i>
                <h5 className="mt-3">Organisation Requests</h5>
                <p>Monitor and respond to hospital and organisation blood requests.</p>
                <button className="btn btn-outline-success btn-sm">View Requests</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
