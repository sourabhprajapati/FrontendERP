// src/components/SuperAdmin/SalesExecutive/AddSalesExecutive.jsx
import React, { useState, useEffect, useMemo } from "react";
import "./AddSalesExecutive.css";
import {
  FaRegEdit,
  FaSearch,
  FaRegSave,
  FaRedo,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { TbRadioactiveFilled } from "react-icons/tb";

const API_BASE = "http://localhost:5000/api/sales-executives";

const AddSalesExecutive = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [salesExecutives, setSalesExecutives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Add Form
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    employeeId: "",
    email: "",
    username: "",
  });

  // Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingExecutive, setEditingExecutive] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    username: "",
  });

  // Fetch all executives
  useEffect(() => {
    fetchExecutives();
  }, []);

  const fetchExecutives = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setSalesExecutives(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load executives");
    } finally {
      setLoading(false);
    }
  };

  // Auto-fill username from email
  const handleEmailChange = (e) => {
    const email = e.target.value;
    const username = email.split("@")[0];
    setFormData((prev) => ({ ...prev, email, username }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ADD NEW EXECUTIVE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.employeeId || !formData.email || !formData.username) {
      alert("All fields are required!");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          mobile: formData.mobile.trim(),
          code: formData.employeeId.trim(),
          email: formData.email.trim(),
          username: formData.username.trim(),
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setSalesExecutives((prev) => [result.data, ...prev]);
        setFormData({ name: "", mobile: "", employeeId: "", email: "", username: "" });
        alert("Sales Executive added successfully!\nLogin credentials sent to their email.");
      } else {
        alert(result.message || "Failed to add executive");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // EDIT EXECUTIVE
  const openEditModal = (exec) => {
    setEditingExecutive(exec);
    setEditFormData({
      name: exec.name,
      mobile: exec.mobile,
      email: exec.email,
      username: exec.username,
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingExecutive(null);
    setEditFormData({ name: "", mobile: "", email: "", username: "" });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingExecutive) return;

    try {
      const res = await fetch(`${API_BASE}/${editingExecutive._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      const result = await res.json();

      if (res.ok) {
        setSalesExecutives((prev) =>
          prev.map((e) => (e._id === editingExecutive._id ? result.data : e))
        );
        closeEditModal();
        alert("Executive updated successfully!");
      } else {
        alert(result.message || "Update failed");
      }
    } catch (err) {
      alert("Failed to update. Please try again.");
    }
  };

  // BLOCK & ACTIVATE
  const handleBlock = async (id, name) => {
    if (!window.confirm(`Block ${name}?`)) return;
    await fetch(`${API_BASE}/${id}/block`, { method: "PUT" });
    setSalesExecutives((prev) =>
      prev.map((e) => (e._id === id ? { ...e, isActive: false } : e))
    );
  };

  const handleActivate = async (id, name) => {
    if (!window.confirm(`Activate ${name}?`)) return;
    await fetch(`${API_BASE}/${id}/activate`, { method: "PUT" });
    setSalesExecutives((prev) =>
      prev.map((e) => (e._id === id ? { ...e, isActive: true } : e))
    );
  };

  // Search + Sort
  const filteredAndSorted = useMemo(() => {
    let list = [...salesExecutives];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.code.includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.mobile.includes(q) ||
          e.username.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    return list;
  }, [salesExecutives, searchQuery, sortOrder]);

  return (
    <main className="se-main-content">

      {/* ========== ADD FORM ========== */}
      <div className="se-container">
        <h2 className="se-section-title">Add Sales Executive</h2>
        <div className="se-card">
          <form className="se-sales-form" onSubmit={handleSubmit}>
            <div className="se-form-row">
              <div className="se-form-group">
                <label>Name <span className="se-required">*</span>:</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="se-form-input" required />
              </div>
              <div className="se-form-group">
                <label>Mobile No <span className="se-required">*</span>:</label>
                <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} className="se-form-input" required />
              </div>
              <div className="se-form-group">
                <label>Employee ID <span className="se-required">*</span>:</label>
                <input type="text" name="employeeId" value={formData.employeeId} onChange={handleInputChange} className="se-form-input" required />
              </div>
            </div>

            <div className="se-form-group">
              <label>Email ID <span className="se-required">*</span>:</label>
              <input type="email" name="email" value={formData.email} onChange={handleEmailChange} className="se-form-input" required />
            </div>

            <div className="se-form-row-compact">
              <div className="se-form-group">
                <label>Username <span className="se-required">*</span>:</label>
                <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="se-form-input" required />
              </div>
              <div className="se-form-group">
                <label>Password:</label>
                <div className="se-password-container">
                  <input type="text" className="se-password-input" value="Auto-generated on save" disabled />
                  <button type="button" className="se-generate-btn" disabled>
                    <FaRedo /> Generate
                  </button>
                </div>
                <small style={{ marginTop: "6px", color: "#1976d2", fontWeight: "500" }}>
                  Password will be auto-generated securely on save
                </small>
              </div>
            </div>

            <div className="se-button-container">
              <button type="submit" className="se-save-button" disabled={submitting}>
                {submitting ? (
                  <>
                    <FaSpinner className="spin" /> Saving...
                  </>
                ) : (
                  <>
                    <FaRegSave /> Save
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ========== EDIT MODAL ========== */}
      {isEditModalOpen && (
        <div className="se-modal-overlay" onClick={closeEditModal}>
          <div className="se-modal" onClick={(e) => e.stopPropagation()}>
            <div className="se-modal-header">
              <h3>Edit Sales Executive</h3>
              <button onClick={closeEditModal} className="se-modal-close">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="se-modal-form">
              <div className="se-form-group">
                <label>Name:</label>
                <input type="text" name="name" value={editFormData.name} onChange={handleEditChange} required />
              </div>
              <div className="se-form-group">
                <label>Mobile:</label>
                <input type="tel" name="mobile" value={editFormData.mobile} onChange={handleEditChange} required />
              </div>
              <div className="se-form-group">
                <label>Email:</label>
                <input type="email" name="email" value={editFormData.email} onChange={handleEditChange} required />
              </div>
              <div className="se-form-group">
                <label>Username:</label>
                <input type="text" name="username" value={editFormData.username} onChange={handleEditChange} required />
              </div>
              <div className="se-modal-actions">
                <button type="button" onClick={closeEditModal} className="se-btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="se-save-button">
                  Update Executive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========== LIST TABLE ========== */}
      <div className="se-container">
        <h2 className="se-section-title">
          Sales Executive List ({salesExecutives.length} executives)
        </h2>
        <div className="se-card">
          <div className="se-table-header">
            <div></div>
            <div style={{ position: "relative" }}>
              <FaSearch className="se-search-icon" />
              <input
                type="text"
                className="se-search-bar"
                placeholder="Search by Name, ID, Email, Mobile, Username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px" }}>
              <FaSpinner className="spin" style={{ fontSize: "28px" }} />
            </div>
          ) : filteredAndSorted.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>
              No executives found
            </div>
          ) : (
            <div className="se-table-wrapper">
              <table className="se-sales-table">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Employee ID</th>
                    <th onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")} style={{ cursor: "pointer" }}>
                      Name {sortOrder === "asc" ? "↑" : "↓"}
                    </th>
                    <th>Username</th>
                    <th>Password</th>
                    <ed>Status</ed>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSorted.map((exec, index) => (
                    <tr key={exec._id} className={!exec.isActive ? "inactive-row" : ""}>
                      <td>{index + 1}</td>
                      <td>{exec.code}</td>
                      <td><div className="se-name-cell">{exec.name}</div></td>
                      <td>{exec.username}</td>
                      <td><span className="se-password-cell">{exec.password}</span></td>
                      <td>
                        <span className={`status-badge ${exec.isActive ? "active" : "blocked"}`}>
                          {exec.isActive ? "Active" : "Blocked"}
                        </span>
                      </td>
                      <td>{exec.mobile}</td>
                      <td>{exec.email}</td>
                      <td>
                        <button className="se-btn-edit" onClick={() => openEditModal(exec)}>
                          <FaRegEdit /> Edit
                        </button>
                        {exec.isActive ? (
                          <button className="se-btn-block" onClick={() => handleBlock(exec._id, exec.name)}>
                            <MdBlock /> Block
                          </button>
                        ) : (
                          <button className="se-btn-activate" onClick={() => handleActivate(exec._id, exec.name)}>
                            <TbRadioactiveFilled /> Activate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AddSalesExecutive;