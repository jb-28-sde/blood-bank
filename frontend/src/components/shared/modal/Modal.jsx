import React, { useState } from "react";
import { useSelector } from "react-redux";
import API from "../../../services/API";

export default function Modal() {
  const [inventoryType, setInventoryType] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState("");
  const [email, setemail] = useState("");

  const { user } = useSelector((state) => state.auth);

  const handleModalSubmit = async () => {
    try {
      // Validation
      if (!bloodGroup || !quantity || !inventoryType || !email) {
        return alert("Please provide all fields");
      }

      // Base payload
      let payload = {
        email,
        inventoryType,
        bloodGroup,
        quantity: Number(quantity),
        organisation: user?._id,
      };

      // Add donor or hospital based on inventory type
      if (inventoryType === "in") {
        payload.donar = user?._id;
      } else if (inventoryType === "out") {
        payload.hospital = user?._id;
      }

      // API request
      const { data } = await API.post("/inventory/create-inventory", payload);

      console.log("Response Data 👉", data);

      if (data?.success) {
        alert("✅ Blood record created successfully!");

        // Reset form
        setBloodGroup("");
        setQuantity("");
        setemail("");
        setInventoryType("");
      } else {
        alert("❌ Failed to create blood record");
      }
    } catch (error) {
      console.error("Submit Error 👉", error.response?.data || error.message);
      alert("❌ Something went wrong");
    }
  };

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Manage Blood Record
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* Inventory Type */}
            <div className="d-flex mb-3">
              <span>Inventory Type:</span>
              <div className="form-check ms-3">
                <input
                  type="radio"
                  name="inventoryTypeRadio"
                  value="in"
                  checked={inventoryType === "in"}
                  onChange={(e) => setInventoryType(e.target.value)}
                  className="form-check-input"
                />
                <label className="form-check-label">IN</label>
              </div>
              <div className="form-check ms-3">
                <input
                  type="radio"
                  name="inventoryTypeRadio"
                  value="out"
                  checked={inventoryType === "out"}
                  onChange={(e) => setInventoryType(e.target.value)}
                  className="form-check-input"
                />
                <label className="form-check-label">OUT</label>
              </div>
            </div>

            {/* Blood Group */}
            <div className="mb-3">
              <label htmlFor="bloodGroup" className="form-label">
                Blood Group
              </label>
              <select
                id="bloodGroup"
                className="form-select"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="">-- Select Blood Group --</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
              </select>
            </div>

            {/* Donor Email */}
            <div className="mb-3">
              <label htmlFor="donarEmail" className="form-label">
                Donor Email
              </label>
              <input
                type="email"
                id="donarEmail"
                className="form-control"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter donor email"
              />
            </div>

            {/* Quantity */}
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity (ML)
              </label>
              <input
                type="number"
                id="quantity"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity in ML"
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleModalSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
