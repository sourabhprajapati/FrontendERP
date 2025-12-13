// AutoMessageSetting.jsx

import React, { useState } from 'react';
import './MessageSettings.css';

import { 
  MessageSquare, Send, Users, TrendingUp, 
  Bell, Calendar, Gift, FileText, UserCheck, 
  AlertCircle, RefreshCw, Save 
} from 'lucide-react';

export default function MessageSettings() {
  const [activeNotifications, setActiveNotifications] = useState({
    enquiry: true,
    feeReminder: false,
    attendanceAlert: false,
    registrationConfirmation: false,
    birthdayWishes: false,
    calendarNotifications: false,
  });

  const toggle = (key) => {
    setActiveNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const count = Object.values(activeNotifications).filter(Boolean).length;

  const items = [
    { key: 'enquiry', title: 'Enquiry Message', desc: 'Automatically send confirmation messages when new enquiries are received from parents or students.', icon: MessageSquare, active: true, badge: 'Active' },
    { key: 'feeReminder', title: 'Fee Reminder', desc: 'Send automated fee payment reminders to parents before due dates and overdue notices.', icon: FileText },
    { key: 'attendanceAlert', title: 'Attendance Alert', desc: 'Notify parents instantly when their child is marked absent or arrives late to school.', icon: AlertCircle },
    { key: 'registrationConfirmation', title: 'Registration Confirmation', desc: 'Send welcome messages and registration confirmations to newly admitted students.', icon: UserCheck },
    { key: 'birthdayWishes', title: 'Birthday Wishes', desc: 'Send personalized birthday greetings to students and staff members automatically.', icon: Gift, schedule: '09:00 AM Daily' },
    { key: 'calendarNotifications', title: 'Calendar Notifications', desc: 'Keep everyone informed about upcoming events, holidays, and school calendar updates.', icon: Calendar },
  ];

  return (
    <div className="msg-container21">
      <div className="msg-header21">
        <h1><Bell size={32} /> Message Settings</h1>
        <p>Configure automated notifications and message templates</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid21">
        <div className="stat-card21">
          <div>
            <p>Total Messages</p>
            <h3>2,847 <span className="positive21">+12%</span></h3>
          </div>
          <MessageSquare size={40} className="icon-muted21" />
        </div>
        <div className="stat-card21">
          <div>
            <p>Sent Today</p>
            <h3>156 <span className="positive21">+5%</span></h3>
          </div>
          <Send size={40} className="icon-muted21 green21" />
        </div>
        <div className="stat-card21">
          <div>
            <p>Recipients</p>
            <h3>1,234</h3>
          </div>
          <Users size={40} className="icon-muted21 purple21" />
        </div>
        <div className="stat-card21">
          <div>
            <p>Delivery Rate</p>
            <h3>98.5% <span className="positive21">+0.5%</span></h3>
          </div>
          <TrendingUp size={40} className="icon-muted21 emerald21" />
        </div>
      </div>

      {/* Active Bar */}
      <div className="active-bar21">
        <div className="left21">
          <span className="dot21 green21"></span>
          <strong>{count} of 6 Active</strong>
          <span className="updated21">Last updated: Today, 10:30 AM</span>
        </div>
        <div className="right21">
          <button className="btn-secondary21"><RefreshCw size={16} /> Reset All</button>
          <button className="btn-primary21"><Save size={16} /> Save Changes</button>
        </div>
      </div>

      {/* Notification List */}
      <div className="notification-list21">
        {items.map(item => {
          const Icon = item.icon;
          const isActive = activeNotifications[item.key];
          return (
            <div key={item.key} className={`notif-card21 ${isActive ? 'active21' : ''}`}>
              <div className="notif-left21">
                <div className={`icon-circle21 ${isActive ? 'active21' : ''}`}>
                  <Icon size={24} className={isActive ? 'text-blue21' : 'text-gray21'} />
                </div>
                <div className="notif-content21">
                  <div className="notif-title-line21">
                    <h4>{item.title}</h4>
                    {item.badge && <span className="badge-active21">{item.badge}</span>}
                    {item.schedule && <span className="schedule21">Clock {item.schedule}</span>}
                  </div>
                  <p>{item.desc}</p>
                </div>
              </div>

              <div className="notif-right21">
                <button className="template-link21">Template</button>
                <label className="switch21">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => toggle(item.key)}
                  />
                  <span className="slider21"></span>
                </label>
              </div>
            </div>
          );
        })}
      </div>

      <p className="footer-note21">
        Messages are sent via SMS gateway. Standard charges may apply.
      </p>
    </div>
  );
}