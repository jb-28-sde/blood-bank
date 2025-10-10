import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

export default function Hospital() {
  const [data, setData] = useState([]);

  // Fetch hospital records
  const getHospitals = async () => {
    try {
      const { data } = await API.get("/inventory/get-hospital");
      console.log("Hospital API response:", data);
      if (data?.success) {
        setData(data?.hospitals);
      }
    } catch (error) {
      console.log("Error fetching hospitals:", error);
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);

  return (
    <Layout>
      <h1>Hospital</h1>
      <div className="table-responsive">
        <table className="table table-hover table-bordered text-center align-middle shadow-lg rounded-4 overflow-hidden">
          <thead
            className="text-white"
            style={{
              background: "linear-gradient(90deg, #12b3a6, #52c41a)",
              fontWeight: "600",
              letterSpacing: "0.5px",
            }}
          >
            <tr>
              <th scope="col">Hospital Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {data?.map((record) => (
              <tr
                key={record._id}
                className="fw-semibold"
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s, background-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) =>
                  Object.assign(e.currentTarget.style, {
                    transform: "scale(1.02)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                    backgroundColor: "#f0f9f9",
                  })
                }
                onMouseLeave={(e) =>
                  Object.assign(e.currentTarget.style, {
                    transform: "scale(1)",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  })
                }
              >
                {/* Hospital Name */}
                <td>
                  <span
                    className="fs-6 px-3 py-2 rounded-pill"
                    style={{
                      backgroundColor: "#3f0c52ff",
                      color: "#fff",
                      fontWeight: "500",
                    }}
                  >
                    {record.name}
                  </span>
                </td>

                {/* Email */}
                <td>
                  <span
                    className="fs-6 px-3 py-2 rounded-pill"
                    style={{
                      backgroundColor: "#0debd9c1",
                      color: "#fff",
                      fontWeight: "500",
                    }}
                  >
                    {record.email}
                  </span>
                </td>

                {/* Phone */}
                <td className="text-truncate" style={{ maxWidth: "180px" }}>
                  {record.phone}
                </td>

                {/* Address */}
                <td className="text-truncate" style={{ maxWidth: "180px" }}>
                  {record.address}
                </td>

                {/* Date */}
                <td className="text-secondary">
                  {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
