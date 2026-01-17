import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaClock,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LateFeeManagement.css";

/* API CONSTANTS */
const API_BASE = "http://localhost:5000";
const schoolId = "000000000000000000000001";

const LateFeeManagement = () => {
  const [mode, setMode] = useState("ONETIME"); // ONETIME | PERDAY
  const [amount, setAmount] = useState("");
  const [applyAfterDate, setApplyAfterDate] = useState("");
  const [config, setConfig] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  /* ================= FETCH CONFIG ================= */
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/late-fee/${schoolId}`);
        const result = await res.json();

        if (result.success && result.data) {
          setMode(result.data.mode);
          setAmount(result.data.amount);
          setApplyAfterDate(result.data.applyAfterDate.split("T")[0]);
          setConfig(result.data);
        }
      } catch (err) {
        toast.error("Failed to load late fee configuration");
      }
    };

    fetchConfig();
  }, []);

  /* ================= SAVE / UPDATE ================= */
  const handleSave = async () => {
    if (!amount || !applyAfterDate) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/late-fee/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolId,
          mode,
          amount,
          applyAfterDate,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setConfig(result.data);
        setIsEditing(false);
        toast.success("Late fee configuration saved");
      } else {
        toast.error(result.message || "Failed to save late fee");
      }
    } catch (err) {
      toast.error("Server error while saving late fee");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = () => {
    setIsEditing(true);
    toast.info("Edit mode enabled");
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/late-fee/${schoolId}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {
        setConfig(null);
        setAmount("");
        setApplyAfterDate("");
        setMode("ONETIME");
        setIsEditing(false);
        toast.success("Late fee configuration removed");
      } else {
        toast.error(result.message || "Failed to delete late fee");
      }
    } catch (err) {
      toast.error("Server error while deleting late fee");
    }
  };

  return (
    <div className="lf-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="lf-card">
        <h2>
          <FaClock /> Late Fee Management
        </h2>

        <div className="lf-sub-card">
          <h4>Late Fee Rule</h4>

          {!config ? (
            <p className="lf-note">
              <strong>Note :</strong> Late fee is not configured yet.
            </p>
          ) : (
            <p className="lf-note success">
              <strong>Mode :</strong>{" "}
              {config.mode === "ONETIME"
                ? "One Time Late Fee"
                : "Per Day Late Fee"}{" "}
              | <strong>Amount :</strong> ₹{config.amount}{" "}
              {config.mode === "PERDAY" && "/ day"} |{" "}
              <strong>Apply After :</strong>{" "}
              {config.applyAfterDate.split("T")[0]}
            </p>
          )}

          {/* MODE */}
          <div className="lf-mode">
            <label>Late Fee Type</label>
            <div className="lf-radio">
              <label>
                <input
                  type="radio"
                  checked={mode === "ONETIME"}
                  disabled={!!config && !isEditing}
                  onChange={() => setMode("ONETIME")}
                />
                One Time
              </label>

              <label>
                <input
                  type="radio"
                  checked={mode === "PERDAY"}
                  disabled={!!config && !isEditing}
                  onChange={() => setMode("PERDAY")}
                />
                Per Day
              </label>
            </div>
          </div>

          {/* FORM */}
          <div className="lf-form">
            <div>
              <label>
                {mode === "ONETIME"
                  ? "Late Fee Amount (₹)"
                  : "Late Fee Per Day (₹)"}
              </label>
              <input
                type="number"
                value={amount}
                disabled={!!config && !isEditing}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div>
              <label>Apply Late Fee After Due Date</label>
              <input
                type="date"
                value={applyAfterDate}
                disabled={!!config && !isEditing}
                onChange={(e) => setApplyAfterDate(e.target.value)}
              />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="lf-btn-wrap">
            {!config && (
              <button onClick={handleSave}>
                <FaPlus /> Add Late Fee
              </button>
            )}

            {config && !isEditing && (
              <>
                <button className="edit" onClick={handleEdit}>
                  <FaEdit /> Edit
                </button>
                <button className="delete" onClick={handleDelete}>
                  <FaTrash /> Delete
                </button>
              </>
            )}

            {isEditing && (
              <button onClick={handleSave}>
                <FaSave /> Update Late Fee
              </button>
            )}
          </div>
        </div>

        {/* INFO */}
        <div className="lf-info">
          <h5>How It Works</h5>
          <ul>
            <li>One-time late fee is applied once after due date</li>
            <li>Per-day late fee = late days × amount</li>
            <li>Auto calculated during fee collection</li>
            <li>Final calculation should be on backend</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LateFeeManagement;
