// src/components/SuperAdmin/SalesExecutivePage/SalesExecutivePage.jsx
import React, { useState, useEffect } from "react";
import "./SalesExecutivePage.css";
import {
  UserPlus,
  Key,
  Lock,
  Unlock,
  Search,
  CheckCircle,
  RefreshCw,
  Copy,
} from "lucide-react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/sales-executive";   // Change if your backend is on different port

const SalesExecutivePage = () => {
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Fetch users — backend will now return plain password every time
  const fetchUsers = async (search = "") => {
    setTableLoading(true);
    try {
      const res = await axios.get(`${API_BASE}?search=${search}`);
      if (res.data.success) {
        setUsers(res.data.users);   // password field will be real plain text now
      }
    } catch (err) {
      showToast("Failed to load users", "error");
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchUsers(searchTerm), 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return showToast("Enter username", "error");

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/create`, { username: trimmed });
      if (res.data.success) {
        setUsers(prev => [res.data.user, ...prev]);
        setUsername("");
        showToast(`Created! Password: ${res.data.user.password}`, "success");
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (userId, name) => {
    if (!window.confirm("Generate new password?")) return;
    try {
      const res = await axios.put(`${API_BASE}/${userId}/password`);
      if (res.data.success) {
        setUsers(prev =>
          prev.map(u => (u.id === userId ? { ...u, password: res.data.newPassword } : u))
        );
        showToast(`New password: ${res.data.newPassword}`, "success");
      }
    } catch (err) {
      showToast("Failed", "error");
    }
  };

  const handleBlock = async (id) => {
    if (!window.confirm("Block user?")) return;
    await axios.put(`${API_BASE}/${id}/block`);
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, isBlocked: true } : u)));
    showToast("Blocked", "success");
  };

  const handleActivate = async (id) => {
    if (!window.confirm("Activate user?")) return;
    await axios.put(`${API_BASE}/${id}/activate`);
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, isBlocked: false } : u)));
    showToast("Activated", "success");
  };

  const copyPassword = (pwd) => {
    navigator.clipboard.writeText(pwd);
    showToast("Password copied!", "success");
  };

  return (
    <div className="salesx-container">

      {/* Toast */}
      {toast && (
        <div className={`salesx-toast salesx-toast-${toast.type}`}>
          <CheckCircle size={18} /> {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="salesx-header-card">
        <h1 className="salesx-page-title">
          <UserPlus className="salesx-title-icon" /> Sales Executive Management
        </h1>
        <p className="salesx-page-subtitle">Create and manage sales accounts</p>
      </div>

      {/* Create Form */}
      <section className="salesx-form-card">
        <div className="salesx-form-header">
          <h2>Create New Sales Executive</h2>
          <span className="salesx-badge-sales">SALES ONLY</span>
        </div>
        <form onSubmit={handleSubmit} className="salesx-user-form">
          <div className="salesx-input-group">
            <label className="salesx-input-label">
              Username <span className="salesx-required">*</span>
            </label>
            <div className="salesx-username-input-wrapper">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="rohan.sharma"
                className="salesx-username-field"
                required
                disabled={loading}
              />
              <span className="salesx-domain-suffix">-sales@mittsure</span>
            </div>
          </div>
          <button type="submit" className="salesx-create-btn" disabled={loading}>
            {loading ? <RefreshCw size={18} className="animate-spin" /> : <UserPlus size={18} />}
            {loading ? "Creating..." : "Create Sales Executive"}
          </button>
        </form>
      </section>

      {/* Table */}
      <section className="salesx-table-card">
        <div className="salesx-table-header">
          <h2>Sales Executive List ({users.length})</h2>
          <div className="salesx-search-wrapper">
            <Search size={16} className="salesx-search-icon" />
            <input
              type="text"
              placeholder="Search username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="salesx-search-input"
            />
          </div>
        </div>

        <div className="salesx-table-wrapper">
          <table className="salesx-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Username</th>
                <th>Password</th>
                <th>Status</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableLoading ? (
                <tr>
                  <td colSpan="6" className="salesx-no-data">
                    <RefreshCw className="animate-spin inline mr-2" size={18} />
                    Loading...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="salesx-no-data">No users found</td>
                </tr>
              ) : (
                users.map((user, idx) => (
                  <tr key={user.id} className="salesx-table-row">
                    <td>{idx + 1}</td>
                    <td className="salesx-username-cell">{user.username}</td>

                    {/* THIS IS THE IMPORTANT PART — ALWAYS SHOWS REAL PASSWORD */}
                    <td className="salesx-password-cell">
                      <div className="flex items-center gap-2">
                        <code className="bg-orange-100 text-orange-800 px-3 py-1 rounded font-mono text-sm">
                          {user.password}
                        </code>
                        <button
                          onClick={() => copyPassword(user.password)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Copy password"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    </td>
                    {/* END OF IMPORTANT PART */}

                    <td>
                      <span className={`salesx-user-type-badge ${user.isBlocked ? "opacity-60" : ""}`}>
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td><span className="salesx-user-type-badge">SALES</span></td>
                    <td className="salesx-actions-cell">
                      <button
                        className="salesx-action-btn salesx-change-pwd"
                        title="Change Password"
                        onClick={() => handleChangePassword(user.id, user.username)}
                      >
                        <Key size={14} />
                      </button>
                      {user.isBlocked ? (
                        <button
                          className="salesx-action-btn salesx-activate-user"
                          title="Activate"
                          onClick={() => handleActivate(user.id)}
                        >
                          <Unlock size={14} />
                        </button>
                      ) : (
                        <button
                          className="salesx-action-btn salesx-block-user"
                          title="Block"
                          onClick={() => handleBlock(user.id)}
                        >
                          <Lock size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SalesExecutivePage;