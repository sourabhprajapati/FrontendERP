import React, { useState } from "react";
import { FaUpload, FaTrash, FaSave } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UPIQRCode.css";

const UPIQRCode = () => {
  const [qrImage, setQrImage] = useState(null);
  const [preview, setPreview] = useState(null);

  /* ===== HANDLE FILE ===== */
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    setQrImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ===== SAVE ===== */
  const handleSave = () => {
    if (!qrImage) {
      toast.error("Please upload a QR code image");
      return;
    }

    // 🔗 API CALL HERE
    // const formData = new FormData();
    // formData.append("upi_qr", qrImage);

    toast.success("UPI QR Code uploaded successfully");
  };

  /* ===== DELETE ===== */
  const handleDelete = () => {
    setQrImage(null);
    setPreview(null);
    toast.success("UPI QR Code removed");
  };

  return (
    <div className="upi-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="upi-card">
        <h2>UPI QR Code Management</h2>

        <div className="upi-box">
          {!preview ? (
            <label className="upi-upload">
              <FaUpload />
              <span>Upload UPI QR Code</span>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>
          ) : (
            <div className="upi-preview">
              <img src={preview} alt="UPI QR Preview" />

              <div className="upi-actions">
                <button className="save" onClick={handleSave}>
                  <FaSave /> Save
                </button>

                <button className="delete" onClick={handleDelete}>
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="upi-note">
          <strong>Note:</strong> This QR code will be shown on the fee receipt and
          UPI payment screen.
        </p>
      </div>
    </div>
  );
};

export default UPIQRCode;
