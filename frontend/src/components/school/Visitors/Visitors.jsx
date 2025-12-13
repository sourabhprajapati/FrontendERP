import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Visitors.css';

function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [formData, setFormData] = useState({
    purpose: '',
    name: '',
    email: '',
    phone: '',
    persons: 1,
    idCard: '',
    date: new Date().toISOString().split('T')[0],
    inTime: '',
    outTime: '',
    attachment: null,
    note: '',
  });

  // Load all visitors on component mount
  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/visitors');
      setVisitors(res.data);
    } catch (err) {
      console.error('Error fetching visitors:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('purpose', formData.purpose);
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('persons', formData.persons);
    data.append('idCard', formData.idCard);
    data.append('date', formData.date);
    data.append('inTime', formData.inTime);
    data.append('outTime', formData.outTime || '');
    data.append('note', formData.note || '');
    if (formData.attachment) {
      data.append('attachment', formData.attachment);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/visitors/add', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Add new visitor to the top of the list
      setVisitors(prev => [res.data, ...prev]);

      // Reset form
      setFormData({
        purpose: '', name: '', email: '', phone: '', persons: 1,
        idCard: '', date: new Date().toISOString().split('T')[0],
        inTime: '', outTime: '', attachment: null, note: ''
      });
      e.target.reset();
      alert('Visitor added successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to add visitor');
    }
  };

  const formatDate = (dateStr) => {
    const [y, m, d] = dateStr.split('-');
    return `${d}-${m}-${y}`;
  };

  return (
    <div className="vis-page15">
      <div className="vis-form-card15">
        <div className="vis-title15">
          <h2>Add Visitors</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="vis-form-grid15">
            {/* All your input fields - same as before */}
            <div className="vis-form-group15">
              <label>Purpose <span className="vis-required15">*</span></label>
              <select name="purpose" value={formData.purpose} onChange={handleChange} required>
                <option value="" disabled>Select Purpose</option>
                <option>Meeting</option>
                <option>Parent Visit</option>
                <option>Delivery</option>
                <option>Official</option>
                <option>Interview</option>
                <option>Other</option>
              </select>
            </div>

            <div className="vis-form-group15">
              <label>Name <span className="vis-required15">*</span></label>
              <input type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="vis-form-group15">
              <label>Email</label>
              <input type="email" name="email" placeholder="example@gmail.com" value={formData.email} onChange={handleChange} />
            </div>

            <div className="vis-form-group15">
              <label>Phone</label>
              <input type="tel" name="phone" placeholder="98xxxxxxxx" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="vis-form-group15">
              <label>Number of Persons</label>
              <input type="number" name="persons" min="1" value={formData.persons} onChange={handleChange} />
            </div>

            <div className="vis-form-group15">
              <label>ID Card</label>
              <input type="text" name="idCard" placeholder="Aadhar / PAN / License" value={formData.idCard} onChange={handleChange} />
            </div>

            <div className="vis-form-group15">
              <label>Date <span className="vis-required15">*</span></label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div className="vis-form-group15">
              <label>In Time <span className="vis-required15">*</span></label>
              <input type="time" name="inTime" value={formData.inTime} onChange={handleChange} required />
            </div>

            <div className="vis-form-group15">
              <label>Out Time</label>
              <input type="time" name="outTime" value={formData.outTime} onChange={handleChange} />
            </div>

            <div className="vis-form-group15 vis-full-width15">
              <label>Attachment (Photo/ID Proof) <span style={{color:'#666', fontSize:'14px'}}>(optional)</span></label>
              <input
                type="file"
                name="attachment"
                accept="image/*,.pdf"
                onChange={handleChange}
                style={{
                  padding: '14px 16px',
                  border: '2px solid #d1d5db',
                  borderRadius: '12px',
                  backgroundColor: '#fafafa',
                  fontSize: '15px',
                  width: '100%',
                }}
              />
            </div>

            <div className="vis-form-group15 vis-full-width15">
              <label>Note (optional)</label>
              <textarea name="note" rows="4" placeholder="Any additional note..." value={formData.note} onChange={handleChange} />
            </div>
          </div>

          <div className="vis-form-actions15">
            <button type="submit" className="vis-save-btn15">Submit</button>
          </div>
        </form>

        {/* Visitor Log Table */}
        {visitors.length > 0 && (
          <div style={{ marginTop: '60px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#000' }}>Visitor Log</h2>
            <div style={{ overflowX: 'auto', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc' }}>
                    <th style={th}>EMAIL</th>
                    <th style={th}>DATE</th>
                    <th style={th}>IN TIME</th>
                    <th style={th}>OUT TIME</th>
                    <th style={th}>CREATED BY</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map((v, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                      <td style={td}>{v.email}</td>
                      <td style={td}>{v.date}</td>
                      <td style={td}>{v.inTime}</td>
                      <td style={td}>{v.outTime}</td>
                      <td style={td}>{v.createdBy || 'Super'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ textAlign: 'center', marginTop: '15px', color: '#64748b' }}>
              Total Entries: {visitors.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const th = { padding: '16px 12px', fontSize: '14px', fontWeight: '600', color: '#374151' };
const td = { padding: '16px 12px', fontSize: '14.5px', color: '#111827' };

export default Visitors;