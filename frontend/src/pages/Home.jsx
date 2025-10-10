import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import { PiEyedropperSampleFill } from "react-icons/pi";
import API from "../services/API";
import moment from "moment";
import "./Home.css";

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // ✅ Role-based redirect
  useEffect(() => {
    if (!user) return;

    switch (user.role) {
      case "donar":
        navigate("/donation");
        break;
      case "hospital":
        navigate("/hospital");
        break;
      case "admin":
        navigate("/admin");
        break;
      default:
        break;
    }
  }, [user, navigate]);

  
  const getBloodRecords = async () => {
    try {
      const response = await API.get("/inventory/get-inventory");
      if (response?.data?.success) {
        setData(response.data.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.role === "organisation") {
      getBloodRecords();
    }
  }, [user]);


  if (!user || user.role !== "organisation") return null;

  return (
    <Layout>
      <div className="container">
        <h4
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          style={{ cursor: "pointer" }}
        >
          <PiEyedropperSampleFill color="red" />
          +Add Inventory
        </h4>

        <div className="table-responsive">
          <table className="table table-hover table-bordered text-center align-middle shadow-lg rounded-4 overflow-hidden">
            <thead
              className="bg-gradient text-white"
              style={{ background: "linear-gradient(90deg, #4facfe, #fe0000ff)" }}
            >
              <tr>
                <th>Blood Group</th>
                <th>Inventory Type</th>
                <th>Quantity</th>
                <th>Email</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {data.map((record) => (
                <tr
                  key={record._id}
                  className="fw-semibold"
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <td>
                    <span
                      className="rounded-pill fs-6 px-3 py-2"
                      style={{ backgroundColor: "#ff6b81", color: "#fff", fontWeight: 500 }}
                    >
                      {record.bloodGroup}
                    </span>
                  </td>
                  <td>
                    <span
                      className="rounded-pill fs-6 px-3 py-2"
                      style={{
                        backgroundColor: record.inventoryType === "in" ? "#28a745" : "#ffc107",
                        color: record.inventoryType === "in" ? "#fff" : "#000",
                        fontWeight: 500,
                      }}
                    >
                      {record.inventoryType.toUpperCase()}
                    </span>
                  </td>
                  <td className="text-primary fw-bold">
                    {record.quantity} <small className="text-muted">ML</small>
                  </td>
                  <td className="text-truncate" style={{ maxWidth: "180px" }}>
                    {record.email}
                  </td>
                  <td className="text-secondary">
                    {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal />
      </div>
    </Layout>
  );
}
