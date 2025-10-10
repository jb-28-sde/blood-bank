import React, { useEffect, useState } from "react";

import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

export default function Donar() {
  const [data, setdata] = useState([]);
  //find donar records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/inventory/get-donar");
      // console.log(data);
       if(data?.success){
        setdata(data?.donars)
       }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDonars();
  }, []);
  return (
    <Layout>
      <h1>Donar Page</h1>
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
        <th scope="col">Donar Name</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
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
          <td>
            <span
              className="fs-6 px-3 py-2 rounded-pill"
              style={{
                backgroundColor: "#12b3a6",
                color: "#fff",
                fontWeight: "500",
              }}
            >
              {record.name || record.organisationName + " (ORG)"}
            </span>
          </td>
          <td>
            <span
              className="fs-6 px-3 py-2 rounded-pill"
              style={{
                backgroundColor:
                  record.inventoryType === "in" ? "#52c41a" : "#fa8c16",
                color: "#fff",
                fontWeight: "500",
              }}
            >
              {record.email}
            </span>
          </td>
          <td className="text-truncate" style={{ maxWidth: "180px" }}>
            {record.phone}
          </td>
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
