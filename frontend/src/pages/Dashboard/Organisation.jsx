import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import { useSelector } from "react-redux";
import API from "../../services/API";

const OrganisationPage = () => {
  // get current user
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  //find org records
  const getOrg = async () => {
    try {
      if (user?.role === "donar") {
        const { data } = await API.get("/inventory/get-orgnaisation");
        //   console.log(data);
        if (data?.success) {
          setData(data?.organisations);
        }
      }
      if (user?.role === "hospital") {
        const { data } = await API.get(
          "/inventory/get-organisation-for-hospital"
        );
          console.log(data);
        if (data?.success) {
          setData(data?.organisations);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrg();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Layout>
      <div className="table-responsive shadow-lg rounded-4 overflow-hidden">
  <table className="table table-hover align-middle text-center mb-0">
    <thead
      className="text-white"
      style={{
        background: "linear-gradient(90deg, #1e3c72, #2a5298)",
        fontWeight: "600",
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        borderBottom: "none",
      }}
    >
      <tr>
        <th scope="col">Organisation Name</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
        <th scope="col">Address</th>
        <th scope="col">Date</th>
      </tr>
    </thead>
    <tbody>
      {data?.map((record) => (
        <tr
          key={record._id}
          className="fw-medium"
          style={{
            cursor: "pointer",
            transition:
              "transform 0.2s, background-color 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, {
              transform: "scale(1.02)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              backgroundColor: "#f2f7ff",
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
          <td className="text-start">
            <span
              className="px-3 py-2 rounded-pill"
              style={{
                backgroundColor: "#1e3c72",
                color: "#fff",
                fontWeight: "500",
              }}
            >
              {record.organisationName || record.name}
            </span>
          </td>
          <td>
              <span
              className="px-3 py-2 rounded-pill"
              style={{
                backgroundColor: "#dfe21aff",
                color: "#fff",
                fontWeight: "500",
              }}
            >
            {record.email}
            </span>
            </td>
          <td>{record.phone || "N/A"}</td>
          <td>{record.address || "N/A"}</td>
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
};

export default OrganisationPage;