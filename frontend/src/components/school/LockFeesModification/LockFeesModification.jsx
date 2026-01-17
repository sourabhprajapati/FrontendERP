import React, { useEffect, useState } from "react";
import { FaLock, FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LockFeesModification.css";

/* API CONSTANTS */
const API_BASE = "http://localhost:5000";
const schoolId = "000000000000000000000001";

const LockFeesModification = () => {
  const [lockDate, setLockDate] = useState("");
  const [savedDate, setSavedDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  /* ================= FETCH ON LOAD ================= */
  useEffect(() => {
    const fetchLock = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/lock-fees/${schoolId}`);
        const result = await res.json();

        if (result.success && result.data) {
          const date = result.data.lockUptoDate.split("T")[0];
          setSavedDate(date);
          setLockDate(date);
        }
      } catch (error) {
        toast.error("Failed to load lock status");
      }
    };

    fetchLock();
  }, []);

  /* ================= LOCK / UPDATE ================= */
  const handleLockFees = async () => {
    if (!lockDate) {
      toast.error("Please select a date to lock fees modification");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/lock-fees/lock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolId,
          lockUptoDate: lockDate,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setSavedDate(lockDate);
        setIsEditing(false);
        toast.success(`Fees modification locked till ${lockDate}`);
      } else {
        toast.error(result.message || "Failed to lock fees");
      }
    } catch (error) {
      toast.error("Server error while locking fees");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = () => {
    setIsEditing(true);
    toast.info("You can now edit the lock date");
  };

  /* ================= DELETE / UNLOCK ================= */
  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/lock-fees/${schoolId}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {
        setSavedDate("");
        setLockDate("");
        setIsEditing(false);
        toast.success("Fees modification unlocked successfully");
      } else {
        toast.error(result.message || "Failed to unlock fees");
      }
    } catch (error) {
      toast.error("Server error while unlocking fees");
    }
  };

  return (
    <div className="lfm-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="lfm-card">
        <h2>Lock Fees Modification</h2>

        <div className="lfm-sub-card">
          <h4>Lock Fees Upto Below Entered Date</h4>

          {!savedDate ? (
            <p className="lfm-note">
              <strong>Note :</strong> You haven't locked your fees modifications till now.
            </p>
          ) : (
            <p className="lfm-note success">
              <strong>Locked Till :</strong> {savedDate}
            </p>
          )}

          <div className="lfm-form">
            <label>
              Enter Date Upto Which You Want to Lock Fees Modification
            </label>

            <input
              type="date"
              value={lockDate}
              disabled={!!savedDate && !isEditing}
              onChange={(e) => setLockDate(e.target.value)}
            />
          </div>

          {/* ACTION BUTTONS (UNCHANGED) */}
          <div className="lfm-btn-wrap">
            {!savedDate && (
              <button onClick={handleLockFees}>
                <FaLock /> Lock Fees
              </button>
            )}

            {savedDate && !isEditing && (
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
              <button onClick={handleLockFees}>
                <FaLock /> Update Lock
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockFeesModification;
