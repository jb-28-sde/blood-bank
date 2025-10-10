import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "../../services/API";
import { ArrowDownCircle, ArrowUpCircle, Droplet, Droplets } from "lucide-react";
import { gsap } from "gsap";
import moment from "moment";

export default function Analytics() {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const tableRefs = useRef([]);

  const bloodGroupColors = {
    "A+": "#FF4B2B",
    "A-": "#FF416C",
    "B+": "#2196F3",
    "B-": "#4CAF50",
    "O+": "#FFC107",
    "O-": "#9C27B0",
    "AB+": "#00BCD4",
    "AB-": "#E91E63",
  };

  // Fetch blood group analytics data
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) setData(data?.bloodGroupData);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch recent inventory data
  const getBloodRecords = async () => {
    try {
      const response = await API.get("/inventory/get-recent-inventory");
      if (response?.data?.success) {
        console.log(response.data.inventory); // Check structure
        setInventoryData(response.data.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodGroupData();
    getBloodRecords();
  }, []);

  // Animate blood group card numbers
  useEffect(() => {
    data.forEach((record, i) => {
      const elements = tableRefs.current[i];
      if (elements) {
        gsap.fromTo(
          elements.querySelectorAll(".count"),
          { innerText: 0 },
          {
            innerText: (i, el) => parseInt(el.innerText),
            duration: 1.5,
            ease: "power1.out",
            snap: { innerText: 1 },
            stagger: 0.2,
          }
        );
      }
    });
  }, [data]);

  // Animate table quantities
  useEffect(() => {
    gsap.fromTo(
      ".quantity",
      { innerText: 0 },
      {
        innerText: (i, el) => parseInt(el.innerText),
        duration: 1.5,
        ease: "power1.out",
        snap: { innerText: 1 },
        stagger: 0.1,
      }
    );
  }, [inventoryData]);

  return (
    <>
      <Header />
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          padding: "30px 0",
          color: "white",
        }}
      >
        <h2 className="text-center mb-5" style={{ fontWeight: "bold" }}>
          Blood Bank Analytics Dashboard
        </h2>

        {/* Cards Section */}
        <div className="d-flex flex-row flex-wrap justify-content-center p-3">
          {data?.map((record, idx) => {
            const color = bloodGroupColors[record.bloodGroup] || "#ffffff";
            return (
              <div
                key={record.bloodGroup}
                ref={(el) => (tableRefs.current[idx] = el)}
                className="m-3"
                style={{
                  width: "20rem",
                  borderRadius: "20px",
                  background: "rgba(255, 255, 255, 0.12)",
                  backdropFilter: "blur(14px)",
                  border: `1px solid ${color}33`,
                  boxShadow: `0 8px 22px ${color}55`,
                  transition: "all 0.35s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
                  e.currentTarget.style.boxShadow = `0 14px 30px ${color}88`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = `0 8px 22px ${color}55`;
                }}
              >
                {/* Card Header */}
                <div
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                    color: "white",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    padding: "12px",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    letterSpacing: "1px",
                  }}
                >
                  <Droplets size={22} /> {record.bloodGroup}
                </div>

                {/* Card Body */}
                <div className="p-4 text-center">
                  <p
                    className="d-flex align-items-center justify-content-between"
                    style={{
                      color: "#28a745",
                      fontSize: "1rem",
                      marginBottom: "14px",
                    }}
                  >
                    <span className="d-flex align-items-center gap-2">
                      <ArrowDownCircle size={22} /> Total In
                    </span>
                    <b className="count">{record.totalIn}</b> ML
                  </p>
                  <p
                    className="d-flex align-items-center justify-content-between"
                    style={{ color: "#dc3545", fontSize: "1rem" }}
                  >
                    <span className="d-flex align-items-center gap-2">
                      <ArrowUpCircle size={22} /> Total Out
                    </span>
                    <b className="count">{record.totalOut}</b> ML
                  </p>
                </div>

                {/* Card Footer */}
                <div
                  style={{
                    background: `linear-gradient(135deg, ${color}66, ${color}aa)`,
                    color: "white",
                    textAlign: "center",
                    padding: "12px",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Droplet size={20} /> Available: {record.availabeBlood} ML
                </div>
              </div>
            );
          })}
        </div>

        <hr className="my-5" />

        {/* Recent Blood Records Table */}
        <div className="container my-5">
          <h2 className="mb-4 text-center" style={{ fontWeight: "700", color: "#fff" }}>
            Recent Blood Records
          </h2>
          <div className="table-responsive shadow-lg rounded-4 overflow-hidden">
            <table className="table text-center align-middle mb-0">
              <thead
                className="text-white"
                style={{
                  background: "linear-gradient(90deg, #4facfe, #fe0000ff)",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                }}
              >
                <tr>
                  <th>Blood Group</th>
                  <th>Inventory Type</th>
                  <th>Quantity</th>
                  <th>Email</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData?.map((record, idx) => {
                  const isIn = record.inventoryType === "in";
                  const bloodColor = bloodGroupColors[record.bloodGroup] || "#888";

                  return (
                    <tr
                      key={record._id}
                      style={{
                        transition: "all 0.3s ease",
                        background: idx % 2 === 0 ? "rgba(255,255,255,0.05)" : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                        e.currentTarget.style.transform = "scale(1.02)";
                        e.currentTarget.style.boxShadow = `0 4px 15px rgba(0,0,0,0.2)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          idx % 2 === 0 ? "rgba(255,255,255,0.05)" : "transparent";
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <td>
                        <span
                          className="rounded-pill px-3 py-2"
                          style={{
                            backgroundColor: bloodColor,
                            color: "#fff",
                            fontWeight: "600",
                            fontSize: "0.9rem",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {record.bloodGroup}
                        </span>
                      </td>
                      <td>
                        <span
                          className="rounded-pill px-3 py-2"
                          style={{
                            backgroundColor: isIn ? "#28a745" : "#dc3545",
                            color: "#fff",
                            fontWeight: "600",
                            fontSize: "0.85rem",
                          }}
                        >
                          {record.inventoryType.toUpperCase()}
                        </span>
                      </td>
                      <td className="quantity" style={{ fontWeight: "700", color: "#00e0ff" }}>
                        {record.quantity} <span style={{ fontSize: "0.8rem", color: "#ccc" }}>ML</span>
                      </td>
                      <td
                        style={{
                          maxWidth: "180px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: "#fff",
                        }}
                      >
                        {record.email || record.user?.email || "N/A"}
                      </td>
                      <td style={{ color: "#aaa" }}>
                        {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
