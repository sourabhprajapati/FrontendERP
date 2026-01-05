// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Hardcoded credentials (case-insensitive)
  const credentials = {
    superadmin: { password: 'super123', role: 'superAdmin' },
    schooladmin: { password: 'school123', role: 'school' },
    sales: { password: 'sales123', role: 'sales' },
    student: { password: 'student123', role: 'student' }, // New Student Login
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeTab !== 'password') {
      setError('Please use "Login with Password" tab for testing');
      return;
    }

    if (!formData.username || !formData.password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      const usernameLower = formData.username.trim().toLowerCase();
      const user = credentials[usernameLower];

      if (user && user.password === formData.password) {
        // Save login info
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('currentUser', JSON.stringify({
          username: usernameLower,
          role: user.role
        }));

        // Redirect based on role
        if (user.role === 'superAdmin') {
          navigate('/superAdminDash');
        } else if (user.role === 'school') {
          navigate('/schoolHome');
        } else if (user.role === 'sales') {
          navigate('/Newschool');
        } else if (user.role === 'student') {
          navigate('/dashboard'); // Student Dashboard
        }
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="login-container44">
      {/* Background Decorations */}
      <div className="decoration44 decoration-144">
        <div className="chart-card44">
          <div className="chart-header44">
            <div className="chart-icon44"></div>
            <div className="chart-lines44">
              <div className="line44"></div>
              <div className="line44"></div>
            </div>
          </div>
          <div className="chart-items44">
            <div className="item44"></div>
            <div className="item44"></div>
            <div className="item44"></div>
          </div>
        </div>
      </div>

      <div className="decoration44 decoration-244">
        <div className="analytics-card44">
          <div className="mini-chart44"></div>
          <svg className="wave-chart44" viewBox="0 0 100 40">
            <path d="M0,20 Q15,10 30,20 T60,20 T90,20" fill="none" stroke="#4A9FF5" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      <div className="decoration44 decoration-344">
        <div className="database-stack44">
          <div className="db-layer44"></div>
          <div className="db-layer44"></div>
          <div className="db-layer44"></div>
        </div>
      </div>

      <div className="decoration44 decoration-444">
        <div className="stats-card44">
          <svg className="area-chart44" viewBox="0 0 100 50">
            <path d="M0,40 L20,30 L40,35 L60,20 L80,25 L100,15 L100,50 L0,50 Z" fill="url(#gradient1)" opacity="0.6"/>
            <path d="M0,40 L20,30 L40,35 L60,20 L80,25 L100,15" fill="none" stroke="#5CB85C" strokeWidth="2"/>
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#5CB85C" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#5CB85C" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="decoration44 decoration-544">
        <div className="data-viz44">
          <div className="viz-icon44"></div>
          <div className="viz-lines44">
            <div className="v-line44"></div>
            <div className="v-line44"></div>
          </div>
        </div>
      </div>

      <div className="decoration44 decoration-644">
        <div className="graph-card44">
          <svg className="line-graph44" viewBox="0 0 80 40">
            <path d="M5,30 Q20,15 35,20 T65,15" fill="none" stroke="#6CB4E8" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      <div className="decoration44 decoration-744">
        <div className="server-stack44">
          <div className="server-layer44 layer-blue44"></div>
          <div className="server-layer44 layer-green44"></div>
        </div>
      </div>

      <div className="decoration44 decoration-844">
        <div className="bar-chart-card44">
          <div className="bars44">
            <div className="bar44" style={{height: '60%', background: '#5CB85C'}}></div>
            <div className="bar44" style={{height: '80%', background: '#4A9FF5'}}></div>
            <div className="bar44" style={{height: '45%', background: '#5CB85C'}}></div>
            <div className="bar44" style={{height: '90%', background: '#F5A623'}}></div>
          </div>
        </div>
      </div>

      <div className="decoration44 decoration-944">
        <div className="settings-card44">
          <div className="gear-icon44">⚙</div>
        </div>
      </div>

      {/* Connection Lines */}
      <svg className="connection-lines44" width="100%" height="100%">
        <line x1="15%" y1="20%" x2="25%" y2="35%" stroke="#D0D8E0" strokeWidth="1" strokeDasharray="5,5" opacity="0.4"/>
        <line x1="85%" y1="25%" x2="75%" y2="40%" stroke="#D0D8E0" strokeWidth="1" strokeDasharray="5,5" opacity="0.4"/>
        <line x1="20%" y1="70%" x2="35%" y2="60%" stroke="#D0D8E0" strokeWidth="1" strokeDasharray="5,5" opacity="0.4"/>
        <line x1="80%" y1="75%" x2="65%" y2="65%" stroke="#D0D8E0" strokeWidth="1" strokeDasharray="5,5" opacity="0.4"/>
        <circle cx="15%" cy="20%" r="4" fill="#5CB85C" opacity="0.6"/>
        <circle cx="85%" cy="25%" r="4" fill="#4A9FF5" opacity="0.6"/>
        <circle cx="20%" cy="70%" r="4" fill="#5CB85C" opacity="0.6"/>
        <circle cx="80%" cy="75%" r="4" fill="#6CB4E8" opacity="0.6"/>
        <circle cx="30%" cy="40%" r="3" fill="#D0D8E0" opacity="0.5"/>
        <circle cx="70%" cy="35%" r="3" fill="#D0D8E0" opacity="0.5"/>
      </svg>

      {/* Logo */}
      <div className="logo-container44">
        <div className="logo44">
          <svg width="220" height="140" viewBox="0 0 180 50" xmlns="http://www.w3.org/2000/svg">
            <text x="-2" y="30" fontFamily="Arial, sans-serif" fontSize="42" fontWeight="bold" fill="#0047AB" fontStyle="italic">
              Mitt
            </text>
            <text x="75" y="30" fontFamily="Arial, sans-serif" fontSize="42" fontWeight="bold" fill="#00B050" fontStyle="italic">
              sure
            </text>
            <text x="130" y="57" fontFamily="Arial, sans-serif" fontSize="25" fontWeight="bold" fill="#0047AB">
              ERP
            </text>
          </svg>
        </div>
      </div>

      {/* Login Card */}
      <div className="login-card44">
        <div className="login-header44">
          <h2>Login</h2>
          <p>Hey, Enter your details to login</p>
        </div>

        {error && (
          <div style={{ color: '#e74c3c', textAlign: 'center', margin: '10px 0', fontSize: '14px' }}>
            {error}
          </div>
        )}

        {/* Test Credentials Hint (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div style={{ fontSize: '13px', color: '#27ae60', textAlign: 'center', margin: '15px 0', background: '#eafaf1', padding: '12px', borderRadius: '8px' }}>
            <strong>Test Credentials:</strong><br/>
            superadmin → super123 (Super Admin)<br/>
            schooladmin → school123 (School Admin)<br/>
            sales → sales123 (Sales Executive)<br/>
            <strong>student → student123 (Student Panel)</strong>
          </div>
        )}

        <div className="tab-container44">
          <button 
            className={`tab44 ${activeTab === 'password' ? 'active44' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            Login with Password
          </button>
          <button 
            className={`tab44 ${activeTab === 'otp' ? 'active44' : ''}`}
            onClick={() => setActiveTab('otp')}
          >
            Login with OTP
          </button>
        </div>

        <form className="login-form44" onSubmit={handleSubmit}>
          <div className="form-group44">
            <label>Email/ Mobile Number/ Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="e.g. student"
              required={activeTab === 'password'}
              disabled={loading}
            />
          </div>

          {activeTab === 'password' && (
            <div className="form-group44">
              <label>Password</label>
              <div className="password-input-wrapper44">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle44"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
          )}

          <div className="form-footer44">
            <label className="remember-me44">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                disabled={loading}
              />
              <span>Remember Me</span>
            </label>
            <a href="#forgot" className="forgot-password44">Forgot Password?</a>
          </div>

          <button type="submit" className="login-button44" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="register-link44">
          Don't have an account? <a href="#register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;