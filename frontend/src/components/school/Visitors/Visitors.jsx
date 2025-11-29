import React, { useState } from 'react';
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
      attachment: files ? files[0] : prev.attachment
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newVisitor = {
      email: formData.email || '-',
      date: formatDate(formData.date),
      inTime: formData.inTime || '-',
      outTime: formData.outTime || '-',
      createdBy: 'Super',
    };

    setVisitors(prev => [newVisitor, ...prev]);

    setFormData({
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
    e.target.reset();
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
            <div className="vis-form-group15">
              <label>Purpose <span className="vis-required15">*</span></label>
              <select name="purpose" onChange={handleChange} required>
                <option value="" disabled selected>Select Purpose</option>
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
              <input type="text" name="name" placeholder="Full name" onChange={handleChange} required />
            </div>

            <div className="vis-form-group15">
              <label>Email</label>
              <input type="email" name="email" placeholder="example@gmail.com" onChange={handleChange} />
            </div>

            <div className="vis-form-group15">
              <label>Phone</label>
              <input type="tel" name="phone" placeholder="98xxxxxxxx" onChange={handleChange} />
            </div>

            <div className="vis-form-group15">
              <label>Number of Persons</label>
              <input type="number" name="persons" min="1" defaultValue="1" onChange={handleChange} />
            </div>

            <div className="vis-form-group15">
              <label>ID Card</label>
              <input type="text" name="idCard" placeholder="Aadhar / PAN / License" onChange={handleChange} />
            </div>

            <div className="vis-form-group15">
              <label>Date <span className="vis-required15">*</span></label>
              <input type="date" name="date" defaultValue={new Date().toISOString().split('T')[0]} onChange={handleChange} required />
            </div>

            <div className="vis-form-group15">
              <label>In Time <span className="vis-required15">*</span></label>
              <input type="time" name="inTime" onChange={handleChange} required />
            </div>

            <div className="vis-form-group15">
              <label>Out Time</label>
              <input type="time" name="outTime" onChange={handleChange} />
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
              <textarea name="note" rows="4" placeholder="Any additional note..." onChange={handleChange} />
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
                    <th style={th}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map((v, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                      <td style={td}>{v.email}</td>
                      <td style={td}>{v.date}</td>
                      <td style={td}>{v.inTime}</td>
                      <td style={td}>{v.outTime}</td>
                      <td style={td}>{v.createdBy}</td>
                      <td style={td}>
                        <button style={actionBtn}>Action</button>
                      </td>
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
const actionBtn = { background: '#4f46e5', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' };

export default Visitors;