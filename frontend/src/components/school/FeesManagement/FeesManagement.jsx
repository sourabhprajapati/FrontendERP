import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FeesManagement.css";

/* API CONSTANTS */
const schoolId = "000000000000000000000001";
const API_BASE = "http://localhost:5000";

const FeesManagement = () => {
  const [feeName, setFeeName] = useState("");
  const [feeType, setFeeType] = useState("classWise");
  const [paymentType, setPaymentType] = useState("MONTHLY");
  const [feesList, setFeesList] = useState([]);
  const [editId, setEditId] = useState(null);

  /* ---------- MONTH LOGIC (UNCHANGED) ---------- */
  const getFeeMonth = (type) => {
    switch (type) {
      case "MONTHLY":
        return "Every";
      case "QUARTERLY":
        return "Apr–Jun, Jul–Sep, Oct–Dec, Jan–Mar";
      case "HALFYEARLY":
        return "Apr–Sep / Oct–Mar";
      case "YEARLY":
        return "April";
      default:
        return "";
    }
  };

  /* ---------- FETCH ---------- */
  const fetchFees = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/fees/${schoolId}`);
      const result = await res.json();
      setFeesList(result.data || []);
    } catch {
      toast.error("Failed to load fees");
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  /* ---------- ADD ---------- */
  const handleAddFees = async () => {
    if (!feeName.trim()) {
      toast.error("Fees name is required");
      return;
    }

    try {
      await fetch(`${API_BASE}/api/fees/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolId,
          feeName: feeName.trim(),
          paymentType,
          month: getFeeMonth(paymentType),
          feeType,
        }),
      });

      toast.success("Fees added successfully");
      resetForm();
      fetchFees();
    } catch {
      toast.error("Failed to add fees");
    }
  };

  /* ---------- EDIT ---------- */
  const handleEdit = (fee) => {
    setEditId(fee._id);
    setFeeName(fee.feeName);
    setPaymentType(fee.paymentType);
    setFeeType(fee.feeType);
  };

  /* ---------- UPDATE ---------- */
  const handleUpdate = async () => {
    if (!feeName.trim()) {
      toast.error("Fees name is required");
      return;
    }

    try {
      await fetch(`${API_BASE}/api/fees/update/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feeName: feeName.trim(),
          paymentType,
          month: getFeeMonth(paymentType),
          feeType,
        }),
      });

      toast.success("Fees updated successfully");
      resetForm();
      fetchFees();
    } catch {
      toast.error("Failed to update fees");
    }
  };

  /* ---------- DELETE ---------- */
  const handleDelete = (id) => {
    toast.info(
      <div>
        Are you sure?
        <div style={{ marginTop: "8px" }}>
          <button onClick={() => confirmDelete(id)}>Yes</button>
          <button
            onClick={() => toast.dismiss()}
            style={{ marginLeft: "8px" }}
          >
            No
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  const confirmDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/api/fees/delete/${id}`, {
        method: "DELETE",
      });
      toast.dismiss();
      toast.success("Fees deleted successfully");
      fetchFees();
      if (editId === id) resetForm();
    } catch {
      toast.error("Failed to delete fees");
    }
  };

  /* ---------- RESET ---------- */
  const resetForm = () => {
    setEditId(null);
    setFeeName("");
    setFeeType("classWise");
    setPaymentType("MONTHLY");
  };

  /* ---------- JSX (UNCHANGED) ---------- */
  return (
    <div className="fees-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="fees-title">Fees Management</h2>

      <div className="fees-card">
        <div className="fees-card-header">
          {editId ? "Edit Fees" : "Add Fees"}
        </div>

        <div className="fees-card-body">
          <div className="fees-row">
            <label>
              Fees Name <span>*</span>
            </label>
            <input
              value={feeName}
              onChange={(e) => setFeeName(e.target.value)}
              placeholder="Enter fees name"
            />
          </div>

          <div className="fees-row">
            <label>
              Fee Type <span>*</span>
            </label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  checked={feeType === "classWise"}
                  onChange={() => setFeeType("classWise")}
                />
                Class wise
              </label>
              <label>
                <input
                  type="radio"
                  checked={feeType === "studentWise"}
                  onChange={() => setFeeType("studentWise")}
                />
                Student Wise
              </label>
            </div>
          </div>

          <div className="fees-row">
            <label>
              Fee Payment Type <span>*</span>
            </label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <option value="MONTHLY">Monthly</option>
              <option value="QUARTERLY">Quarterly</option>
              <option value="HALFYEARLY">Half-Yearly</option>
              <option value="YEARLY">Yearly</option>
            </select>
          </div>

          <div className="fees-divider"></div>

          <div className="fees-btn-wrap">
            {editId ? (
              <>
                <button onClick={handleUpdate}>Update Fees</button>
                <button className="cancel-btn" onClick={resetForm}>
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={handleAddFees}>₹ Add Fees</button>
            )}
          </div>
        </div>
      </div>

      <div className="fees-card">
        <div className="fees-card-header">View / Edit Fees</div>

        <table className="fees-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Fee Name</th>
              <th>Fee Payment Type</th>
              <th>Fee Month</th>
              <th>Fee Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feesList.map((fee, index) => (
              <tr key={fee._id}>
                <td>{index + 1}</td>
                <td>{fee.feeName}</td>
                <td>{fee.paymentType}</td>
                <td>{fee.month}</td>
                <td>{fee.feeType}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(fee)}
                  >
                    ✏ Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(fee._id)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeesManagement;
