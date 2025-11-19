// src/pages/Reject.jsx
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Reject.css";

// ──────────────────────────────────────────────────────────────
// DUMMY DATA
// ──────────────────────────────────────────────────────────────
const DUMMY_REJECTED = [
  {
    _id: "s1",
    schoolName: "Sunrise Public School",
    type: "New",
    address: "12 MG Road, Bangalore, Karnataka 560001",
    contactPerson: "Mrs. Anjali Sharma",
    contactNumber: "9876543210",
    email: "sunrise@mittsure.com",
    Schoolcode: "KANAA",
    board: "CBSE",
    documents: {
      LoginForm: "Login_Sunrise.pdf",
      ConsentForm: "Consent_Sunrise.docx",
    },
    tpg: true,
    talentBox: false,
    remark: "Login form data does not match with school records.",
    status: "rejected",
  },
  {
    _id: "s2",
    schoolName: "Green Valley Academy",
    type: "Renewal",
    address: "Sector-7, Noida, Uttar Pradesh 201301",
    contactPerson: "Mr. Rajesh Kumar",
    contactNumber: "8765432109",
    email: "greenvalley@mittsure.com",
    Schoolcode: "JAJSK",
    board: "ICSE",
    documents: {
      LoginForm: "Login_GreenValley.pdf",
      ConsentForm: "Consent_GreenValley.docx",
    },
    tpg: false,
    talentBox: true,
    remark: "Consent form signature is missing.",
    status: "rejected",
  },
  {
    _id: "s3",
    schoolName: "Bright Future International School",
    type: "New",
    address: "Plot 45, Andheri East, Mumbai 400069",
    contactPerson: "Dr. Priya Mehta",
    contactNumber: "9123456780",
    email: "brightfuture@mittsure.com",
    Schoolcode: "MHBFI",
    board: "IB",
    documents: {
      LoginForm: "Login_BrightFuture.pdf",
      ConsentForm: "Consent_BrightFuture.docx",
    },
    tpg: true,
    talentBox: true,
    remark: "School code already exists in system.",
    status: "rejected",
  },
  {
    _id: "s4",
    schoolName: "Little Stars Pre-School",
    type: "New",
    address: "Near City Park, Jaipur, Rajasthan 302016",
    contactPerson: "Ms. Neha Gupta",
    contactNumber: "7012345678",
    email: "littlestars@mittsure.com",
    Schoolcode: "RJLSN",
    board: "State Board",
    documents: {
      LoginForm: "Login_LittleStars.pdf",
      ConsentForm: "Consent_LittleStars.docx",
    },
    tpg: false,
    talentBox: false,
    remark: "Contact number is not 10 digits.",
    status: "rejected",
  },
  {
    _id: "s5",
    schoolName: "Delhi Public School - Rohini",
    type: "Renewal",
    address: "Sector 24, Rohini, Delhi 110085",
    contactPerson: "Mr. Vikram Singh",
    contactNumber: "8012345670",
    email: "dpsrohini@mittsure.com",
    Schoolcode: "DLDPS",
    board: "CBSE",
    documents: {
      LoginForm: "Login_DPS_Rohini.pdf",
      ConsentForm: "Consent_DPS_Rohini.docx",
    },
    tpg: true,
    talentBox: false,
    remark: "Renewal documents outdated (older than 1 year).",
    status: "rejected",
  },
  {
    _id: "s6",
    schoolName: "Modern Vidya Niketan",
    type: "New",
    address: "Palam Vihar, Gurgaon, Haryana 122017",
    contactPerson: "Mrs. Sunita Rani",
    contactNumber: "9912345670",
    email: "mvn@mittsure.com",
    Schoolcode: "HRMVN",
    board: "CBSE",
    documents: {
      LoginForm: "Login_MVN.pdf",
      ConsentForm: "Consent_MVN.docx",
    },
    tpg: false,
    talentBox: true,
    remark: "Email domain not recognized. Use official school email.",
    status: "rejected",
  },
];

const Reject = () => {
  const [schools, setSchools] = useState(DUMMY_REJECTED);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [resubmitPending, setResubmitPending] = useState(new Set()); // Tracks rows that need re-submit

  const startEdit = (school) => {
    setEditingId(school._id);
    setFormData({ ...school });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        documents: { ...prev.documents, [name]: files[0] },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updated = { ...formData };
    Object.keys(updated.documents || {}).forEach((key) => {
      const file = updated.documents[key];
      if (file instanceof File) updated.documents[key] = file.name;
    });

    setSchools((prev) =>
      prev.map((s) => (s._id === editingId ? updated : s))
    );

    toast.success("Re-submitted successfully!");
    setEditingId(null);
    setFormData({});

    // Mark as pending re-submit AFTER successful submission
    setResubmitPending((prev) => new Set(prev).add(editingId));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  const renderFeatures = (school) => {
    const feats = [];
    if (school.tpg) feats.push("TPG");
    if (school.talentBox) feats.push("Talent Box");
    if (!feats.length) return <span className="no-features">None</span>;
    return feats.map((f, i) => (
      <span key={i} className={`feature-badge ${f.toLowerCase().replace(" ", "-")}`}>
        {f}
      </span>
    ));
  };

  return (
    <div className="reject-page">
      <ToastContainer position="top-center" autoClose={2500} />

      <header className="page-header">
        <h1>Rejected School Applications</h1>
      </header>

      <div className="table-container">
        <table className="reject-table">
          <thead>
            <tr>
              <th>School Name</th>
              <th>Type</th>
              <th>School Code</th>
              <th>Contact Person</th>
              <th>Contact</th>
              <th>Board</th>
              <th>Documents</th>
              <th>Features</th>
              <th>Admin Remark</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school) => (
              <React.Fragment key={school._id}>
                {/* MAIN ROW */}
                <tr className={editingId === school._id ? "editing" : ""}>
                  <td>
                    {editingId === school._id ? (
                      <input
                        type="text"
                        value={formData.schoolName || ""}
                        disabled
                        className="inline-input"
                      />
                    ) : (
                      <strong>{school.schoolName}</strong>
                    )}
                  </td>

                  <td>
                    {editingId === school._id ? (
                      <select
                        name="type"
                        value={formData.type || ""}
                        onChange={handleChange}
                        className="inline-input"
                      >
                        <option>New</option>
                        <option>Renewal</option>
                      </select>
                    ) : (
                      <span className={`badge ${school.type.toLowerCase()}`}>
                        {school.type}
                      </span>
                    )}
                  </td>

                  {/* SCHOOL CODE – NON-EDITABLE */}
                  <td>
                    <span className="school-code">{school.Schoolcode}</span>
                  </td>

                  {/* CONTACT PERSON */}
                  <td>{school.contactPerson}</td>

                  <td>
                    {editingId === school._id ? (
                      <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber || ""}
                        onChange={handleChange}
                        className="inline-input"
                      />
                    ) : (
                      school.contactNumber
                    )}
                  </td>

                  <td>
                    {editingId === school._id ? (
                      <input
                        type="text"
                        name="board"
                        value={formData.board || ""}
                        onChange={handleChange}
                        className="inline-input"
                      />
                    ) : (
                      school.board
                    )}
                  </td>

                  {/* DOCUMENTS */}
                  <td>
                    {editingId === school._id ? (
                      <div className="doc-upload-group">
                        {Object.keys(school.documents).map((key) => (
                          <div key={key} className="doc-upload">
                            <label>{key}:</label>
                            <input type="file" name={key} onChange={handleChange} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="doc-list">
                        {Object.entries(school.documents).map(([k, f]) => (
                          <span key={k} className="doc-chip">
                            {f || "(none)"}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>

                  {/* FEATURES */}
                  <td>
                    {editingId === school._id ? (
                      <span className="editing-indicator">Edit below</span>
                    ) : (
                      <div className="features-list">{renderFeatures(school)}</div>
                    )}
                  </td>

                  {/* REMARK */}
                  <td className="remark-td">
                    <div className="remark-wrapper">
                      <p className="remark-text">{school.remark}</p>
                    </div>
                  </td>

                  {/* ACTIONS – Edit or Re-submit */}
                  <td>
                    {editingId === school._id ? (
                      <span className="editing-indicator">Editing...</span>
                    ) : resubmitPending.has(school._id) ? (
                      <button
                        onClick={() => startEdit(school)}
                        className="btn-resubmit-small"
                      >
                        Re-submit
                      </button>
                    ) : (
                      <button
                        onClick={() => startEdit(school)}
                        className="btn-edit-small"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>

                {/* EXPANDED EDIT ROW */}
                {editingId === school._id && (
                  <tr className="expanded-edit-row">
                    <td colSpan="10">
                      <form onSubmit={handleSubmit} className="expanded-form">
                        <div className="form-grid">
                          <div className="form-field">
                            <label>Address</label>
                            <input
                              type="text"
                              name="address"
                              value={formData.address || ""}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          <div className="form-field">
                            <label>Email</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email || ""}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          <div className="form-field">
                            <label>Contact Person</label>
                            <input
                              type="text"
                              name="contactPerson"
                              value={formData.contactPerson || ""}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        {/* FEATURES HORIZONTAL */}
                        <div className="form-field full-width">
                          <label style={{ marginBottom: "0.5rem", display: "block", fontWeight: 600 }}>
                            Features
                          </label>
                          <div className="features-horizontal">
                            <label className="feature-checkbox">
                              <input
                                type="checkbox"
                                name="tpg"
                                checked={formData.tpg || false}
                                onChange={handleCheckbox}
                              />
                              TPG
                            </label>

                            <label className="feature-checkbox">
                              <input
                                type="checkbox"
                                name="talentBox"
                                checked={formData.talentBox || false}
                                onChange={handleCheckbox}
                              />
                              Talent Box
                            </label>

                            <a
                              href="/digital"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="add-book-btn"
                            >
                              + Add Book
                            </a>
                          </div>
                        </div>

                        {/* SUBMIT / CANCEL */}
                        <div className="form-actions-expanded">
                          <button type="submit" className="btn-submit-full">
                            Re-submit Application
                          </button>
                          <button type="button" onClick={cancelEdit} className="btn-cancel-full">
                            Cancel
                          </button>
                        </div>
                      </form>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {schools.length === 0 && (
        <div className="empty-state">
          <p>No rejected applications found.</p>
        </div>
      )}
    </div>
  );
};

export default Reject;