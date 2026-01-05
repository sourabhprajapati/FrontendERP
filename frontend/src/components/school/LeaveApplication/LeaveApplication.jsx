// LeaveApplication.jsx
import React, { useState } from 'react';
import './LeaveApplication.css';

const LeaveApplication = () => {
  const [activeTab, setActiveTab] = useState('apply');

  // Track which history items are expanded
  const [expandedItems, setExpandedItems] = useState({ 0: true });

  const toggleExpand = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const historyData = [
    {
      from: "16 Dec 2025 (Session 1)",
      to: "17 Dec 2025 (Session 2)",
      type: "Casual Leave",
      days: 2,
      status: "APPROVED",
      appliedOn: "26 Dec, 2025",
      reason: ".",
    },
    {
      from: "10 Dec 2025",
      to: "10 Dec 2025",
      type: "Special Leave",
      days: 0.5,
      status: "APPROVED",
      appliedOn: "15 Dec, 2025",
      reason: "Family function",
    },
  ];

  return (
    <div className="leave-application-container44">
      {/* Tabs */}
      <div className="tabs44">
        <button
          className={`tab44 ${activeTab === 'apply' ? 'active' : ''}`}
          onClick={() => setActiveTab('apply')}
        >
          Apply
        </button>
        <button
          className={`tab44 ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button
          className={`tab44 ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>

      <div className="content-wrapper44">
        {/* Apply Tab */}
        {activeTab === 'apply' && (
          <>
            <div className="info-banner44">
              Leave is earned by an employee and granted by the employer to take time off work. 
              The employee is free to avail leave in accordance with the company policy.
              <span className="hide-link44">Hide</span>
            </div>

            <h2 className="form-title44">Applying for Leave</h2>

            <form className="leave-form44">
              <div className="form-group44">
                <label className="required44">Leave type*</label>
                <select className="form-control44">
                  <option value="">Select type</option>
                  <option>Casual Leave</option>
                  <option>Paid Leave</option>
                  <option>Special Leave</option>
                  <option>Loss to Pay</option>
                  <option>Comp-off</option>
                  <option>Work From Home</option>
                  <option>On Duty</option>
                </select>
              </div>

              <div className="date-range-container44">
                <div className="form-group44 date-group44">
                  <label className="required44">From date*</label>
                  <div className="date-input-wrapper44">
                    <input type="date" className="form-control44 date-input44" />
                    <select className="session-select44">
                      <option>Session 1</option>
                      <option>Session 2</option>
                    </select>
                  </div>
                </div>

                <div className="form-group44 date-group44">
                  <label className="required44">To*</label>
                  <div className="date-input-wrapper44">
                    <input type="date" className="form-control44 date-input44" />
                    <select className="session-select44">
                      <option>Session 2</option>
                      <option>Session 1</option>
                    </select>
                  </div>
                </div>

                <div className="balance-info44">
                  <div>Leave Balance: <strong>1</strong></div>
                  <div>Applying For:</div>
                </div>
              </div>

              <div className="form-group44">
                <label44>Contact details</label44>
                <textarea className="form-control44 contact-textarea44" rows="2" />
              </div>

              <div className="form-group44">
                <label className="required44">Reason*</label>
                <textarea
                  className="form-control44 reason-textarea44"
                  placeholder="Enter reason"
                  rows="3"
                />
              </div>

              <div className="form-group44">
                <label44>Attach File</label44>
                <div className="file-upload-wrapper44">
                  <input
                    type="file"
                    id="file-upload"
                    className="file-input44"
                    accept=".pdf,.xls,.xlsx,.doc,.docx,.txt,.ppt,.pptx,.gif,.jpg,.jpeg,.png"
                  />
                  <label htmlFor="file-upload" className="file-upload-label44">
                    Choose File
                  </label>
                  <span className="file-types-info44">
                    File Types: pdf, xls, xlsx, doc, docx, txt, ppt, pptx, gif, jpg, jpeg, png
                  </span>
                </div>
              </div>

              <div className="form-actions44">
                <button type="submit" className="btn44 submit-btn44">
                  Submit
                </button>
                <button type="button" className="btn44 cancel-btn44">
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}

        {/* Pending Tab - Empty State */}
        {activeTab === 'pending' && (
          <div className="empty-state44">
            <div className="illustration44">
              <svg width="240" height="180" viewBox="0 0 240 180" fill="none">
                <rect x="50" y="70" width="140" height="90" rx="6" fill="#f3f4f6" />
                <circle cx="90" cy="100" r="10" fill="#e5e7eb" />
                <rect x="110" y="90" width="90" height="4" rx="2" fill="#d1d5db" />
                <rect x="110" y="100" width="70" height="4" rx="2" fill="#d1d5db" />
                <text x="120" y="150" fill="#9ca3af" fontSize="14">It's empty!</text>
              </svg>
            </div>
            <p className="empty-message44">
              It's empty here! Your pending leave requests will appear here.
            </p>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="history-container44">
            {historyData.map((item, index) => {
              const isExpanded = expandedItems[index] ?? false;

              return (
                <div key={index} className="history-item44">
                  <div className="history-header44">
                    <span className="status44 approved44">{item.status}</span>
                    <button
                      className="expand-toggle44"
                      onClick={() => toggleExpand(index)}
                    >
                      {isExpanded ? '▲' : '▼'}
                    </button>
                  </div>

                  <div className="history-summary44">
                    <div>Leave</div>
                    <div>{item.type}</div>
                    <div>{item.days} days</div>
                  </div>

                  {isExpanded && (
                    <div className="history-details44">
                      <div>Duration: {item.from} to {item.to}</div>
                      <div>Reason: {item.reason || 'Not provided'}</div>
                      <div className="applied-info44">
                        Applied on {item.appliedOn}
                        <span className="view-details44">View Details</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveApplication;