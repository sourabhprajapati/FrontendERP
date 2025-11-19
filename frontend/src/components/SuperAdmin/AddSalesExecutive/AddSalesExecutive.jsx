// src/components/SuperAdmin/SalesExecutive/AddSalesExecutive.jsx
import React, { useState, useMemo } from "react";
import "./AddSalesExecutive.css";
import Header from "../Header/Header";
import Sidebar from "../Header/Sidebar/Sidebar";
import { FaRegEdit, FaSearch, FaRegSave, FaRedo } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { TbRadioactiveFilled } from "react-icons/tb";

const initialSalesExecutives = [
  { id: 1, code: "20017", name: "VINAY KUMAR SHARMA", mobile: "7374003631", email: "vinay.sharma@mittsure.com", username: "vinay.sharma", password: "Ms@20017" },
  { id: 2, code: "20023", name: "KOUSHAL JOSHI", mobile: "7374003642", email: "koushal.joshi@mittsure.com", username: "koushal.joshi", password: "Ms@20023" },
  { id: 3, code: "20025", name: "KAPIL JAISWAL", mobile: "9773379420", email: "kapil.jaiswal@mittsure.com", username: "kapil.jaiswal", password: "Ms@20025" },
  { id: 4, code: "20026", name: "GAJENDRA SINGH RAWAT", mobile: "9773379422", email: "gajendra.rawat@mittsure.com", username: "gajendra.rawat", password: "Ms@20026" },
  { id: 5, code: "20027", name: "PANKAJ YADAV", mobile: "9773379419", email: "pankaj.yadav@mittsure.com", username: "pankaj.yadav", password: "Ms@20027" },
  { id: 6, code: "20030", name: "ABHISHEK KUMAWAT", mobile: "7374003665", email: "abhishek.kumawat@mittsure.com", username: "abhishek.kumawat", password: "Ms@20030" },
  { id: 7, code: "20033", name: "RAHUL KHANDELWAL", mobile: "7374003614", email: "rahul.khandelwal@mittsure.com", username: "rahul.khandelwal", password: "Ms@20033" },
];

const AddSalesExecutive = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [salesExecutives, setSalesExecutives] = useState(initialSalesExecutives);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    employeeId: "",
    email: "",
    username: "",
    password: ""
  });

  // Function to generate password
  const generatePassword = () => {
    const prefix = "Ms@";
    const randomNum = Math.floor(10000 + Math.random() * 90000); // 5-digit random number
    return `${prefix}${randomNum}`;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle generate password button click
  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setFormData(prev => ({
      ...prev,
      password: newPassword
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.mobile || !formData.employeeId || !formData.email || !formData.username || !formData.password) {
      alert("Please fill in all required fields!");
      return;
    }

    // Check if employee ID already exists
    const existingEmployee = salesExecutives.find(exec => exec.code === formData.employeeId);
    if (existingEmployee) {
      alert("Employee ID already exists! Please use a different ID.");
      return;
    }

    // Create new sales executive object
    const newSalesExecutive = {
      id: salesExecutives.length + 1, // Simple ID generation
      code: formData.employeeId,
      name: formData.name.toUpperCase(),
      mobile: formData.mobile,
      email: formData.email,
      username: formData.username,
      password: formData.password
    };

    // Add to the list
    setSalesExecutives(prev => [newSalesExecutive, ...prev]);

    // Reset form after submission
    setFormData({
      name: "",
      mobile: "",
      employeeId: "",
      email: "",
      username: "",
      password: ""
    });
    
    alert("Sales Executive added successfully!");
  };

  // Auto-generate username from email when email is entered
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData(prev => ({
      ...prev,
      email: email,
      username: email.split('@')[0] // Auto-generate username from email
    }));
  };

  const filteredExecutives = useMemo(() => {
    if (!searchQuery.trim()) return salesExecutives;

    const query = searchQuery.toLowerCase();
    return salesExecutives.filter((exec) =>
      exec.name.toLowerCase().includes(query) ||
      exec.code.includes(query) ||
      exec.email.toLowerCase().includes(query) ||
      exec.mobile.includes(query) ||
      exec.username.toLowerCase().includes(query)
    );
  }, [searchQuery, salesExecutives]);

  const displayedExecutives = useMemo(() => {
    const list = [...filteredExecutives];
    return list.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [filteredExecutives, sortOrder]);

  const handleSortByName = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  // Action handlers for buttons
  const handleEdit = (id) => {
    // Find the executive to edit
    const executive = salesExecutives.find(exec => exec.id === id);
    alert(`Edit functionality for: ${executive.name}`);
    // You can implement edit modal or form pre-fill here
  };

  const handleBlock = (id) => {
    const executive = salesExecutives.find(exec => exec.id === id);
    if (window.confirm(`Are you sure you want to block ${executive.name}?`)) {
      alert(`Blocked: ${executive.name}`);
      // You can update the status in the state here
    }
  };

  const handleActivate = (id) => {
    const executive = salesExecutives.find(exec => exec.id === id);
    if (window.confirm(`Are you sure you want to activate ${executive.name}?`)) {
      alert(`Activated: ${executive.name}`);
      // You can update the status in the state here
    }
  };

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
                <input 
                  type="text" 
                  className="se-form-input" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                  placeholder="Enter full name"
                />
              </div>
              <div className="se-form-group">
                <label>Mobile No <span className="se-required">*</span>:</label>
                <input 
                  type="tel" 
                  className="se-form-input" 
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required 
                  placeholder="Enter mobile number"
                />
              </div>
              <div className="se-form-group">
                <label>Employee ID <span className="se-required">*</span>:</label>
                <input 
                  type="text" 
                  className="se-form-input" 
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  required 
                  placeholder="Enter employee ID"
                />
              </div>
            </div>
            
            <div className="se-form-group">
              <label>Email ID <span className="se-required">*</span>:</label>
              <input 
                type="email" 
                className="se-form-input" 
                name="email"
                value={formData.email}
                onChange={handleEmailChange}
                required 
                placeholder="Enter email address"
              />
            </div>

            {/* New Username and Password Row */}
            <div className="se-form-row-compact">
              <div className="se-form-group">
                <label>Username <span className="se-required">*</span>:</label>
                <input 
                  type="text" 
                  className="se-form-input" 
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required 
                  placeholder="Username will auto-generate from email"
                />
              </div>
              <div className="se-form-group">
                <label>Password <span className="se-required">*</span>:</label>
                <div className="se-password-container">
                  <input 
                    type="text" 
                    className="se-password-input" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Click Generate to create password"
                    required 
                  />
                  <button 
                    type="button" 
                    className="se-generate-btn"
                    onClick={handleGeneratePassword}
                  >
                    <FaRedo /> Generate
                  </button>
                </div>
              </div>
            </div>

            <div className="se-button-container">
              <button type="submit" className="se-save-button">
                <span className="se-save-icon"><FaRegSave /></span> Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ========== LIST TABLE ========== */}
      <div className="se-container">
        <h2 className="se-section-title">Sales Executive List ({salesExecutives.length} executives)</h2>
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

          <div className="se-table-wrapper">
            <table className="se-sales-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Employee Id</th>
                  <th onClick={handleSortByName} style={{ cursor: "pointer" }}>
                    Name {sortOrder === "asc" ? "↑" : "↓"}
                  </th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Mobile No.</th>
                  <th>Email ID</th>
                  <th>Edit</th>
                  <th>Block</th>
                  <th>Re-Activate</th>
                </tr>
              </thead>
              <tbody>
                {displayedExecutives.map((exec, index) => (
                  <tr key={exec.id}>
                    <td>{index + 1}</td>
                    <td>{exec.code}</td>
                    <td>
                      <div className="se-name-cell">{exec.name}</div>
                    </td>
                    <td>{exec.username}</td>
                    <td>
                      <span className="se-password-cell">{exec.password}</span>
                    </td>
                    <td>{exec.mobile}</td>
                    <td>{exec.email}</td>
                    <td>
                      <button 
                        className="se-btn-edit"
                        onClick={() => handleEdit(exec.id)}
                      >
                        <FaRegEdit /> Edit
                      </button>
                    </td>
                    <td>
                      <button 
                        className="se-btn-block"
                        onClick={() => handleBlock(exec.id)}
                      >
                        <MdBlock /> Block
                      </button>
                    </td>
                    <td>
                      <button 
                        className="se-btn-activate"
                        onClick={() => handleActivate(exec.id)}
                      >
                        <TbRadioactiveFilled /> Activate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddSalesExecutive;