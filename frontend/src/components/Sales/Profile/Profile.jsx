import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const user = {
    name: 'Varun ',
    email: 'Varun.Kumar@mittsure.com',
    username: 'Varun_Kumar',
  };

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.new !== passwordData.confirm) {
      setMessage({ text: 'New passwords do not match.', type: 'error' });
      return;
    }
    if (passwordData.new.length < 8) {
      setMessage({ text: 'Password must be at least 8 characters.', type: 'error' });
      return;
    }

    setMessage({ text: 'Password changed successfully.', type: 'success' });
    setPasswordData({ current: '', new: '', confirm: '' });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  return (
    <div className="pf-container">
      <div className="pf-header">
        <h1>Profile Settings</h1>
        <div className="pf-role-badge">Sales Executive</div>
      </div>

      <div className="pf-card">
        <section className="pf-info-section">
          <h2>Personal Information</h2>

          <div className="pf-info-grid">
            <div className="pf-info-row">
              <label>Name</label>
              <span className="pf-info-value">{user.name}</span>
            </div>

            <div className="pf-info-row">
              <label>Email</label>
              <span className="pf-info-value">{user.email}</span>
            </div>

            <div className="pf-info-row">
              <label>Username</label>
              <span className="pf-info-value">{user.username}</span>
            </div>
          </div>
        </section>

        <hr className="pf-section-divider" />

        <section className="pf-password-section">
          <h2>Change Password</h2>
          <form onSubmit={handlePasswordChange} className="pf-password-form">
            <div className="pf-form-group">
              <label>Current Password</label>
              <input
                type="password"
                value={passwordData.current}
                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                required
              />
            </div>

            <div className="pf-form-group">
              <label>New Password</label>
              <input
                type="password"
                value={passwordData.new}
                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                required
              />
            </div>

            <div className="pf-form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                required
              />
            </div>

            {message.text && (
              <p className={`pf-message ${message.type}`}>{message.text}</p>
            )}

            <button type="submit" className="pf-submit-btn">
              Update Password
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Profile;