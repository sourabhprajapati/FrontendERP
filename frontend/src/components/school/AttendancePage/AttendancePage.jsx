// AttendancePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is installed: npm install axios
import './AttendancePage.css';

// Helper to format date as DD-MM-YYYY
const API_BASE = "http://localhost:5000";
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    role: '',
    department: '',
    attendanceType: '',
  });

  // Get schoolId from localStorage / context / your auth system
  // CHANGE THIS ACCORDING TO YOUR AUTHENTICATION METHOD
  const schoolId = localStorage.getItem('schoolId') ||  "000000000000000000000001"; // ← VERY IMPORTANT!
  console.log("Using schoolId:", schoolId);  // ← Add this

  // Fetch staff list when component mounts or date/filters change
  useEffect(() => {
    fetchStaffList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const fetchStaffList = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_BASE}/api/staff/all`, {
        params: { schoolId }
      });
      //  console.log(response.json())
      if (response.data.success) {
        const staffData = response.data.data.map((staff, index) => ({
          id: staff._id,
          srNo: index + 1,
          staffId: staff._id,
          name: staff.employeeName,
          role: staff.userType || staff.designation || 'Staff',
          department: staff.department || 'General',
          attendance: 'Present' // default
        }));

        setStaffList(staffData);
      }
    } catch (err) {
      console.error('Error fetching staff:', err);
      setError('Failed to load staff list. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Handle date change
  const handleDateChange = (e) => {
    if (e.target.value) {
      const newDate = new Date(e.target.value);
      setSelectedDate(formatDate(newDate));
    }
  };

  // Simple client-side filter (you can also do server-side if needed)
  const filteredStaff = staffList.filter(staff => {
    const roleMatch = !filters.role || 
      staff.role?.toLowerCase().includes(filters.role.toLowerCase());
    const deptMatch = !filters.department || 
      staff.department?.toLowerCase().includes(filters.department.toLowerCase());
    return roleMatch && deptMatch;
  });

  // Update attendance for one staff member
  const handleAttendanceChange = (staffId, value) => {
    setStaffList(prev =>
      prev.map(item =>
        item.id === staffId ? { ...item, attendance: value } : item
      )
    );
  };

  // Mark all visible staff as Holiday
  const markAsHoliday = () => {
    setStaffList(prev =>
      prev.map(item => ({ ...item, attendance: 'Holiday' }))
    );
  };

  // Save attendance to backend
  const saveAttendance = async () => {
    if (!schoolId) {
      alert('School ID is missing. Please login again.');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        schoolId,
        date: selectedDate,
        records: staffList.map(staff => ({
          staffId: staff.id,
          attendance: staff.attendance,
          remarks: '' // you can add remarks input later if needed
        }))
      };

      const response = await axios.post(`${API_BASE}/api/staff-attendance/mark`, payload);

      if (response.data.success) {
        alert(`Attendance saved successfully for ${selectedDate}!`);
      } else {
        alert('Failed to save attendance: ' + (response.data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Save attendance error:', err);
      alert('Error saving attendance: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="attendance-container">
      {/* Filter Section */}
      <div className="filter-card">
        <div className="filter-header">
          <span className="search-icon">🔍</span>
          <h2>Staff Attendance - Filter</h2>
        </div>

        <div className="filter-row">
          <div className="filter-group">
            <label>Role</label>
            <select name="role" value={filters.role} onChange={handleFilterChange}>
              <option value="">All Roles</option>
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Department</label>
            <select name="department" value={filters.department} onChange={handleFilterChange}>
              <option value="">All Departments</option>
              <option value="teaching">Teaching</option>
              <option value="non-teaching">Non-Teaching</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Date</label>
            <input
              type="date"
              value={selectedDate.split('-').reverse().join('-')} // YYYY-MM-DD for input
              onChange={handleDateChange}
            />
            <div className="selected-date-display">
              Selected: <strong>{selectedDate}</strong>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 20px 20px' }}>
          <button className="search-btn" onClick={fetchStaffList} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh / Apply Filters'}
          </button>
        </div>
      </div>

      {/* Staff List Section */}
      <div className="staff-card">
        <div className="staff-header">
          <div className="title-with-icon">
            <span className="staff-icon">👥</span>
            <h2>Staff Attendance - {selectedDate}</h2>
          </div>

          <div className="action-buttons">
            <button className="holiday-btn" onClick={markAsHoliday} disabled={loading}>
              Mark All as Holiday
            </button>
            <button className="save-btn" onClick={saveAttendance} disabled={loading}>
              {loading ? 'Saving...' : 'Save Attendance'}
            </button>
          </div>
        </div>

        {error && (
          <div style={{ color: 'red', padding: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <div className="table-container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>Loading staff...</div>
          ) : filteredStaff.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              No staff found for the selected filters/date
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>SR. NO</th>
                  <th>NAME</th>
                  <th>ROLE</th>
                  <th>DEPARTMENT</th>
                  <th>ATTENDANCE</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((staff) => (
                  <tr key={staff.id}>
                    <td>{staff.srNo}</td>
                    <td>{staff.name}</td>
                    <td>{staff.role}</td>
                    <td>{staff.department}</td>
                    <td className="attendance-options">
                      {['Present', 'Late', 'Absent', 'Half Day', 'Holiday', 'Leave'].map(option => (
                        <label key={option}>
                          <input
                            type="radio"
                            name={`att-${staff.id}`}
                            checked={staff.attendance === option}
                            onChange={() => handleAttendanceChange(staff.id, option)}
                          />
                          {option}
                        </label>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AttendancePage;