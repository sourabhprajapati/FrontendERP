// LeaveBalance.jsx
import React from 'react';
import './LeaveBalance.css';

const leaveData = [
  {
    name: 'Casual Leave',
    granted: 12,
    balance: 0,
    consumedText: '12 of 12 Consumed',
    progress: 100,
    showViewDetails: true,
  },
  {
    name: 'On Duty',
    granted: 0,
    balance: 0,
    consumedText: null,
    progress: 0,
    showViewDetails: false,
  },
  {
    name: 'Paid Leave',
    granted: 25.55,
    balance: 7.05,
    consumedText: '18.5 of 25.55 Consumed',
    progress: (18.5 / 25.55) * 100,
    showViewDetails: true,
  },
  {
    name: 'Loss Of Pay',
    granted: 0,
    balance: 0,
    consumedText: null,
    progress: 0,
    showViewDetails: false,
  },
  {
    name: 'Comp - Off',
    granted: 0,
    balance: 0,
    consumedText: null,
    progress: 0,
    showViewDetails: false,
  },
  {
    name: 'Bereavement Leave',
    granted: 0,
    balance: 0,
    consumedText: null,
    progress: 0,
    showViewDetails: false,
  },
  {
    name: 'Work From Home',
    granted: 0,
    balance: 0,
    consumedText: null,
    progress: 0,
    showViewDetails: false,
  },
  {
    name: 'Special Leave',
    granted: 0.5,
    balance: 0,
    consumedText: '0.5 of 0.5 Consumed',
    progress: 100,
    showViewDetails: true,
  },
];

const LeaveBalance = () => {
  return (
    <div className="leave-balance-wrapper45">
      <div className="cards-container45">
        {leaveData.map((item, index) => (
          <div key={index} className="balance-card45">
            <div className="card-top45">
              <div className="leave-name45">{item.name}</div>
              <div className="granted-text45">
                Granted: {item.granted.toFixed(2).replace(/\.?0+$/, '')}
              </div>
            </div>

            <div className="balance-big45">
              {item.balance.toFixed(2).replace(/\.?0+$/, '')}
            </div>
            <div className="balance-label45">Balance</div>

            {item.showViewDetails && (
              <div className="view-details45">View Details</div>
            )}

            {item.consumedText && (
              <>
                <div className="consumed-text45">{item.consumedText}</div>
                <div className="progress-container45">
                  <div
                    className="progress-fill45"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveBalance;