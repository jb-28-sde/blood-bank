import React from 'react'
import Layout from '../../components/shared/Layout/Layout'
import moment from 'moment';
import API from '../../services/API';
import { useEffect } from 'react';
import { useState } from 'react';

export default function OrganisationList() {
 const [data, setdata] = useState([]);
   //find donar records
   const getDonars = async () => {
     try {
       const { data } = await API.get("/admin/organisation-list");
       // console.log(data);
        if(data?.success){
         setdata(data?.organisationData)
        }
     } catch (error) {
       console.log(error);
     }
   };
   useEffect(() => {
     getDonars();
   }, []);
   //donar delete function
   const handleDelete = async(id) => {
     try {
       let answer = window.prompt('Are you sure want to Delete this organisation',"yes sure")
       if(!answer) return
       const {data} = API.delete(`/admin/delete-organisation/${id}`)
       alert(data?.message)
       window.location.reload()
     } catch (error) {
       console.log(error)
     }
   }
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
         <th scope="col">Action</th>
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
               {record.name ||record.organisationName}
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
           <td>
             <button className="btn btn-danger" onClick={() => handleDelete(record._id)}>Delete</button>
           </td>
         </tr>
       ))}
     </tbody>
   </table>
 </div>
      
     </Layout>
   );
 }
 
 
