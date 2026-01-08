import React, { useState } from "react";
import { FaLock, FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LockFeesModification.css";

const LockFeesModification = () => {
  const [lockDate, setLockDate] = useState("");
  const [savedDate, setSavedDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  /* ================= LOCK ================= */
  const handleLockFees = () => {
    if (!lockDate) {
      toast.error("Please select a date to lock fees modification");
      return;
    }

    setSavedDate(lockDate);
    setIsEditing(false);
    toast.success(`Fees modification locked till ${lockDate}`);
  };

  /* ================= EDIT ================= */
  const handleEdit = () => {
    setIsEditing(true);
    toast.info("You can now edit the lock date");
  };

  /* ================= DELETE ================= */
  const handleDelete = () => {
    setSavedDate("");
    setLockDate("");
    setIsEditing(false);
    toast.success("Fees modification unlocked successfully");
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

          {/* ACTION BUTTONS */}
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
