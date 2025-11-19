// Newschool.jsx
import React, { useState } from "react";
import "./Newschool.css";

const Newschool = () => {
    const [form, setForm] = useState({
        salesExecutive: "",
        state: "",
        schoolName: "",
        district: "",
        address: "",
        email: "",
        contactNo: "",
        contactPerson: "",
        selectBoard: "",
        grade: "",
        strength: "",
        noOfStudents: "",
        tpg: false,
        talentBox: false,
        distributor: "Direct Supply",
        consentFile: null,
        loginFile: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (["strength", "noOfStudents", "contactNo"].includes(name)) {
            if (!/^\d*$/.test(value)) return;
            if (value.length > 10) return;
        }

        if (["schoolName", "address", "contactPerson", "grade"].includes(name)) {
            if (!/^[A-Za-z\s\.\,\-\(\)]*$/.test(value)) return;
        }

        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Updated: Only allow ONE file
    const handleFile = (e, field) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0]; // Take only the first file
            setForm((prev) => ({ ...prev, [field]: file }));
        }
    };

    const handleDistributor = (e) => {
        setForm((prev) => ({ ...prev, distributor: e.target.value }));
    };

    const handleCheckbox = (e) => {
        const { name, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Final validation
        if (form.contactNo.length !== 10) {
            alert("Contact No must be exactly 10 digits.");
            return;
        }

        if (!form.consentFile || !form.loginFile) {
            alert("Please upload both Consent Form and Login Form.");
            return;
        }

        console.log("Form submitted:", form);
    };

    return (
        <div className="newschool-container">
            {/* <div className="header">
                <h2>New School Request</h2>
                
            </div> */}
            <h1 className="page-title">New School Request</h1>

            <form onSubmit={handleSubmit} className="newschool-form">
                {/* Row 1 */}
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            Sales Executive <span className="required">*</span>
                        </label>
                        <select name="salesExecutive" value={form.salesExecutive} onChange={handleChange} required>
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>
                            School Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="schoolName"
                            value={form.schoolName}
                            onChange={handleChange}
                            placeholder="School Name"
                            required
                        />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            State <span className="required">*</span>
                        </label>
                        <select name="state" value={form.state} onChange={handleChange} required>
                            <option value="">Select State</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>
                            District <span className="required">*</span>
                        </label>
                        <select name="district" value={form.district} onChange={handleChange} required>
                            <option value="">Select District</option>
                        </select>
                    </div>
                </div>

                {/* Row 3 */}
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            Address <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Full Address"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Email <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="school@example.com"
                            required
                        />
                    </div>
                </div>

                {/* Row 4 */}
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            Contact No <span className="required">*</span>
                        </label>
                        <input
                            type="tel"
                            name="contactNo"
                            value={form.contactNo}
                            onChange={handleChange}
                            placeholder="10-digit mobile number"
                            maxLength={10}
                            required
                        />
                        {form.contactNo.length > 0 && form.contactNo.length < 10 && (
                            <small style={{ color: "#dc2626", fontSize: "0.8rem" }}>
                                Must be 10 digits
                            </small>
                        )}
                    </div>
                    <div className="form-group">
                        <label>
                            Contact Person <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="contactPerson"
                            value={form.contactPerson}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                        />
                    </div>
                </div>

                {/* Row 5 */}
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            Select Board <span className="required">*</span>
                        </label>
                        <select name="selectBoard" value={form.selectBoard} onChange={handleChange} required>
                            <option value="">Select Board</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>
                            Grade <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="grade"
                            value={form.grade}
                            onChange={handleChange}
                            // placeholder="e.g. 1-12"
                            required
                        />
                    </div>
                </div>

                {/* Row 6 */}
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            Strength <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="strength"
                            value={form.strength}
                            onChange={handleChange}
                            // placeholder="Max 10 digits"
                            maxLength={10}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            No. of Students Enrolled <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="noOfStudents"
                            value={form.noOfStudents}
                            onChange={handleChange}
                            // placeholder="Max 10 digits"
                            maxLength={10}
                            required
                        />
                    </div>
                </div>

                {/* TPG & Talent Box & Book (Add button) */}
                <div className="form-row">
                    <div className="form-group full-width">
                        <label style={{ marginBottom: "0.75rem", display: "block" }}>
                            Features
                        </label>
                        <div className="radio-group" style={{ gap: "1.5rem", flexWrap: "wrap", alignItems: "flex-start" }}>
                            {/* TPG */}
                            <label style={{ fontWeight: "500", cursor: "pointer" }}>
                                <input
                                    type="checkbox"
                                    name="tpg"
                                    checked={form.tpg}
                                    onChange={handleCheckbox}
                                    style={{
                                        width: "1.25rem",
                                        height: "1.25rem",
                                        accentColor: "#2563eb",
                                        cursor: "pointer",
                                        marginRight: "0.5rem",
                                    }}
                                />
                                TPG
                            </label>

                            {/* Talent Box */}
                            <label style={{ fontWeight: "500", cursor: "pointer" }}>
                                <input
                                    type="checkbox"
                                    name="talentBox"
                                    checked={form.talentBox}
                                    onChange={handleCheckbox}
                                    style={{
                                        width: "1.25rem",
                                        height: "1.25rem",
                                        accentColor: "#2563eb",
                                        cursor: "pointer",
                                        marginRight: "0.5rem",
                                    }}
                                />
                                Talent Box
                            </label>

                            {/* ---- NEW "Add Book" BUTTON ---- */}
                            <a
                                href="/book"               // stays in the same tab
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "0.4rem 0.9rem",
                                    background: "#f3f4f6",
                                    color: "#374151",
                                    border: "1.5px solid #d1d5db",
                                    borderRadius: "6px",
                                    fontWeight: "500",
                                    fontSize: "0.95rem",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = "#e5e7eb";
                                    e.currentTarget.style.borderColor = "#9ca3af";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = "#f3f4f6";
                                    e.currentTarget.style.borderColor = "#d1d5db";
                                }}
                            >
                                + Add Book
                            </a>
                        </div>
                    </div>
                </div>

                {/* Distributor */}
                <div className="form-row">
                    <div className="form-group full-width">
                        <label>
                            Distributor <span className="required">*</span>
                        </label>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="distributor"
                                    value="Direct Supply"
                                    checked={form.distributor === "Direct Supply"}
                                    onChange={handleDistributor}
                                />
                                Direct Supply
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="distributor"
                                    value="Other Distributor"
                                    checked={form.distributor === "Other Distributor"}
                                    onChange={handleDistributor}
                                />
                                Other Distributor
                            </label>
                        </div>
                    </div>
                </div>

                {/* === FILE UPLOADS - ONLY ONE FILE EACH === */}
                <div className="form-row file-row">
                    <div className="file-group">
                        <label className="file-label">
                            Upload Consent Form <span className="required">*</span>
                        </label>
                        <div className="file-wrapper">
                            <label className="file-btn">
                                + Choose
                                <input
                                    type="file"
                                    accept=".doc,.docx"
                                    onChange={(e) => handleFile(e, "consentFile")}
                                    required
                                />
                            </label>
                            {form.consentFile && (
                                <div className="file-name">
                                    {form.consentFile.name}
                                    <span
                                        style={{
                                            marginLeft: "8px",
                                            color: "#dc2626",
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                        }}
                                        onClick={() => setForm((prev) => ({ ...prev, consentFile: null }))}
                                    >
                                        ×
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="file-group">
                        <label className="file-label">
                            Upload Login Form (Only .doc or .docx) <span className="required">*</span>
                        </label>
                        <div className="file-wrapper">
                            <label className="file-btn">
                                + Choose
                                <input
                                    type="file"
                                    accept=".doc,.docx"
                                    onChange={(e) => handleFile(e, "loginFile")}
                                    required
                                />
                            </label>
                            {form.loginFile && (
                                <div className="file-name">
                                    {form.loginFile.name}
                                    <span
                                        style={{
                                            marginLeft: "8px",
                                            color: "#dc2626",
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                        }}
                                        onClick={() => setForm((prev) => ({ ...prev, loginFile: null }))}
                                    >
                                        ×
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="submit-wrapper">
                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Newschool;