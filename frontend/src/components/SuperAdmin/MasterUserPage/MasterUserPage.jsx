// src/components/SuperAdmin/MasterUserPage/MasterUserPage.jsx
import React, { useState } from "react";
import "./MasterUserPage.css";
import { UserPlus, Key, Lock, Unlock, Search, CheckCircle } from "lucide-react";

const MasterUserPage = () => {
  // ----- State -----
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "kanak.goyal-master@mittsure",
      password: "DP7XFVZD",
      type: "MASTER",
    },
    {
      id: 2,
      username: "uday.rajawat-master@mittsure",
      password: "WUN*EP@Q",
      type: "MASTER",
    },
    {
      id: 3,
      username: "Tushar.joshi-master@mittsure",
      password: "NKJ*DK9N",
      type: "MASTER",
    },
  ]);
  const [toast, setToast] = useState(null);

  // ----- Helper: random password -----
  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*#@";
    let pwd = "";
    for (let i = 0; i < 8; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pwd;
  };

  // ----- Submit: create master -----
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = username.trim();
    if (!trimmed) {
      showToast("Please enter a username", "error");
      return;
    }

    // Prevent duplicate usernames
    const fullName = `${trimmed}-master@mittsure`;
    if (users.some((u) => u.username === fullName)) {
      showToast("Username already exists", "error");
      return;
    }

    const newUser = {
      id: Math.max(...users.map((u) => u.id)) + 1,
      username: fullName,
      password: generatePassword(),
      type: "MASTER",
    };

    setUsers((prev) => [...prev, newUser]);
    setUsername("");
    showToast(`Master user ${fullName} created!`, "success");
  };

  // ----- Toast helper -----
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ----- Search filter -----
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="master-container">
      {/* ---- Toast ---- */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <CheckCircle size={18} />
          {toast.msg}
        </div>
      )}

      {/* ---- Header ---- */}
      <div className="header-card">
        <h1 className="page-title">
          <UserPlus className="title-icon" />
          Master User Management
        </h1>
        <p className="page-subtitle">
          Create and manage master-level admin accounts
        </p>
      </div>

      {/* ---- Create Form ---- */}
      <section className="form-card">
        <div className="form-header">
          <h2>Create New Master User</h2>
          <span className="badge-master">MASTER ONLY</span>
        </div>

        <form onSubmit={handleSubmit} className="user-form">
          <div className="input-group">
            <label className="input-label">
              Username <span className="required">*</span>
            </label>
            <div className="username-input-wrapper">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter unique username"
                className="username-field"
                required
              />
              <span className="domain-suffix">-master@mittsure</span>
            </div>
          </div>

          <p className="info-text">
            <Key size={14} /> Password will be auto-generated and emailed after
            submission.
          </p>

          <button type="submit" className="create-master-btn">
            <UserPlus size={18} />
            Create Master User
          </button>
        </form>
      </section>

      {/* ---- Table ---- */}
      <section className="table-card">
        <div className="table-header">
          <h2>Master User List ({filteredUsers.length})</h2>
          <div className="search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="master-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Username</th>
                <th>Password</th>
                <th>User Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, idx) => (
                  <tr key={user.id} className="table-row">
                    <td>{idx + 1}</td>
                    <td className="username-cell">{user.username}</td>
                    <td className="password-cell">{user.password}</td>
                    <td>
                      <span className="user-type-badge">MASTER</span>
                    </td>
                    <td className="actions-cell">
                      <button
                        className="action-btn change-pwd"
                        title="Change Password"
                      >
                        <Key size={14} />
                      </button>
                      <button
                        className="action-btn block-user"
                        title="Block User"
                      >
                        <Lock size={14} />
                      </button>
                      <button
                        className="action-btn activate-user"
                        title="Activate User"
                      >
                        <Unlock size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default MasterUserPage;