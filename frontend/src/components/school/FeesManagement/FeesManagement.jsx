import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FeesManagement.css";

const FeesManagement = () => {
  const [feeName, setFeeName] = useState("");
  const [feeType, setFeeType] = useState("classWise");
  const [paymentType, setPaymentType] = useState("MONTHLY");

  const [feesList, setFeesList] = useState([
    {
      id: 1,
      name: "Admission Fee",
      paymentType: "YEARLY",
      month: "April",
      type: "classWise",
    },
    {
      id: 2,
      name: "Tuition Fee",
      paymentType: "MONTHLY",
      month: "Every",
      type: "classWise",
    },
  ]);

  const [editId, setEditId] = useState(null);

  /* ---------- MONTH LOGIC ---------- */
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

  /* ---------- ADD ---------- */
  const handleAddFees = () => {
    if (!feeName.trim()) {
      toast.error("Fees name is required");
      return;
    }

    setFeesList([
      ...feesList,
      {
        id: Date.now(),
        name: feeName.trim(),
        paymentType,
        month: getFeeMonth(paymentType),
        type: feeType,
      },
    ]);

    toast.success("Fees added successfully");
    resetForm();
  };

  /* ---------- EDIT ---------- */
  const handleEdit = (fee) => {
    setEditId(fee.id);
    setFeeName(fee.name);
    setPaymentType(fee.paymentType);
    setFeeType(fee.type);
  };

  /* ---------- UPDATE ---------- */
  const handleUpdate = () => {
    if (!feeName.trim()) {
      toast.error("Fees name is required");
      return;
    }

    setFeesList(
      feesList.map((fee) =>
        fee.id === editId
          ? {
              ...fee,
              name: feeName.trim(),
              paymentType,
              month: getFeeMonth(paymentType),
              type: feeType,
            }
          : fee
      )
    );

    toast.success("Fees updated successfully");
    resetForm();
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

  const confirmDelete = (id) => {
    setFeesList(feesList.filter((fee) => fee.id !== id));
    toast.dismiss();
    toast.success("Fees deleted successfully");

    if (editId === id) resetForm();
  };

  /* ---------- RESET ---------- */
  const resetForm = () => {
    setEditId(null);
    setFeeName("");
    setFeeType("classWise");
    setPaymentType("MONTHLY");
  };

  return (
    <div className="fees-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="fees-title">Fees Management</h2>

      {/* ADD / EDIT FORM */}
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

      {/* TABLE */}
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
              <tr key={fee.id}>
                <td>{index + 1}</td>
                <td>{fee.name}</td>
                <td>{fee.paymentType}</td>
                <td>{fee.month}</td>
                <td>{fee.type}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(fee)}
                  >
                    ✏ Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(fee.id)}
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
