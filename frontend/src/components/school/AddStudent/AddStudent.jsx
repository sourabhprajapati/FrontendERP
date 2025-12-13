import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AddStudent.css';

const API_BASE = 'http://localhost:5000/api/students';

export default function AddStudent() {
  const location = useLocation();
  const navigate = useNavigate();

  const studentToEdit = location.state?.student || null;
  const isEditMode = !!studentToEdit;

  const [activeTab, setActiveTab] = useState('admission');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);

  const [formData, setFormData] = useState({
    // Admission
    admissionNo: '',
    studentRegId: '',
    admissionDate: '',
    dob: '',
    birthPlace: '',
    fatherPhone: '',
    alternatePhone: '',
    aadhaar: '',
    rteEligible: 'No',

    // Sibling
    siblingName: '',
    siblingClass: '',
    siblingAdmissionNo: '',

    // Address
    currentAddress: '',
    permanentAddress: '',

    // Basic
    firstName: '',
    middleName: '',
    lastName: '',
    class: '',
    section: '',
    academicYear: '',
    gender: '',
    category: 'General',
    bloodGroup: '',
    nationality: 'Indian',

    // Parent
    fatherName: '',
    motherName: '',
    fatherOccupation: '',
    motherOccupation: '',
    fatherAadhaar: '',
    motherAadhaar: '',
    email: '',
    emergencyContact: '',

    // Last Education
    previousSchoolName: '',
    previousClass: '',
    previousPercentage: '',

    // Health
    height: '',
    weight: '',
    medicalCondition: '',
    doctorRemark: '',

    // Guardian
    guardianName: '',
    relation: '',
    guardianPhone: '',
    guardianAddress: '',

    // Settings
    transportRequired: 'No',
    transportRoute: '',
    additionalNotes: ''
  });

  const classList = [
    'Nursery', 'K.G', 'Class 1', 'Class 2', 'Class 3', 'Class 4',
    'Class 5', 'Class 6', 'Class 7', 'Class 8'
  ];

  const sections = ['A', 'B', 'C', 'D'];

  // Fetch student data in edit mode
 // Inside useEffect – this will now work
useEffect(() => {
  if (isEditMode && studentToEdit?._id) {
    fetch(`http://localhost:5000/api/students/${studentToEdit._id}`)
      .then(res => {
        if (!res.ok) throw new Error('Student not found');
        return res.json();
      })
      .then(result => {
        setFormData(result.data);
      })
      .catch(err => {
        alert('Error: ' + err.message);
        navigate('/student-list');
      });
  }
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = isEditMode
      ? `${API_BASE}/${studentToEdit._id}`
      : API_BASE;

    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || (isEditMode ? 'Student updated!' : 'Student registered successfully!'));
        navigate('/student-list'); // or wherever your list page is
      } else {
        alert(data.message || 'Operation failed');
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'admission', label: 'Admission Details' },
    { id: 'basic', label: 'Basic Details' },
    { id: 'parent', label: 'Parent Details' },
    { id: 'lastEdu', label: 'Last Education' },
    { id: 'health', label: 'Health Details' },
    { id: 'guardian', label: 'Guardian Details' },
    { id: 'settings', label: 'Settings' }
  ];

  if (fetching) {
    return (
      <div className="add-container19" style={{ textAlign: 'center', paddingTop: '150px' }}>
        <h2>Loading student information...</h2>
      </div>
    );
  }

  return (
    <div className="add-container19">
      <div className="add-header19">
        <h2>{isEditMode ? 'Edit Student' : 'Student Registration Form'}</h2>
      </div>

      <div className="tabs-row19">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`tab-btn19 ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* === ADMISSION TAB === */}
        {activeTab === 'admission' && (
          <div className="form-section19">
            <h3>Admission Details</h3>
            <div className="form-grid19 single-column19">
              <div className="input-box19">
                <label>Admission No / SR No <span style={{color:'red'}}>*</span></label>
                <input type="text" name="admissionNo" value={formData.admissionNo} onChange={handleChange} required />
              </div>
              <div className="input-box19">
                <label>Student Reg ID</label>
                <input type="text" name="studentRegId" value={formData.studentRegId} onChange={handleChange} />
              </div>
              <div className="input-box19">
                <label>Admission Date <span style={{color:'red'}}>*</span></label>
                <input type="date" name="admissionDate" value={formData.admissionDate} onChange={handleChange} required />
              </div>
              <div className="input-box19">
                <label>Date of Birth <span style={{color:'red'}}>*</span></label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
              </div>
              <div className="input-box19">
                <label>Birth Place</label>
                <input type="text" name="birthPlace" value={formData.birthPlace} onChange={handleChange} />
              </div>
              <div className="input-box19">
                <label>Father's Mobile <span style={{color:'red'}}>*</span></label>
                <input type="tel" name="fatherPhone" value={formData.fatherPhone} onChange={handleChange} required />
              </div>
              <div className="input-box19">
                <label>Alternate Mobile</label>
                <input type="tel" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} />
              </div>
              <div className="input-box19">
                <label>Child Aadhaar</label>
                <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} />
              </div>
              <div className="input-box19">
                <label>RTE Eligible?</label>
                <select name="rteEligible" value={formData.rteEligible} onChange={handleChange}>
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>

              <h3 style={{marginTop: '35px', color: '#004585'}}>Sibling Details</h3>
              
              <div className="input-box19">
                <label>Sibling Name</label>
                <input type="text" name="siblingName" value={formData.siblingName} onChange={handleChange} />
              </div>
              <div className="input-box19">
                <label>Sibling Class</label>
                <select name="siblingClass" value={formData.siblingClass} onChange={handleChange}>
                  <option value="">Select</option>
                  {classList.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="input-box19">
                <label>Sibling Admission No</label>
                <input type="text" name="siblingAdmissionNo" value={formData.siblingAdmissionNo} onChange={handleChange} />
              </div>

              <div className="input-big19">
                <label>Current Address</label>
                <textarea rows="3" name="currentAddress" value={formData.currentAddress} onChange={handleChange} />
              </div>
              <div className="input-big19">
                <label>Permanent Address</label>
                <textarea rows="3" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} />
              </div>
            </div>
          </div>
        )}

        {/* === BASIC DETAILS TAB === */}
        {activeTab === 'basic' && (
          <div className="form-section19">
            <h3>Basic Details</h3>
            <div className="form-grid19">
              <div className="input-box19">
                <label>First Name <span style={{color:'red'}}>*</span></label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="input-box19">
                <label>Middle Name</label>
                <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
              </div>
              <div className="input-box19">
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
              </div>
              <div className="input-box19">
                <label>Class <span style={{color:'red'}}>*</span></label>
                <select name="class" value={formData.class} onChange={handleChange} required>
                  <option value="">Select Class</option>
                  {classList.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="input-box19">
                <label>Section <span style={{color:'red'}}>*</span></label>
                <select name="section" value={formData.section} onChange={handleChange} required>
                  <option value="">Select</option>
                  {sections.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="input-box19">
                <label>Academic Year <span style={{color:'red'}}>*</span></label>
                <input type="text" name="academicYear" value={formData.academicYear} placeholder="2024 - 2025" onChange={handleChange} required />
              </div>
              <div className="input-box19">
                <label>Gender <span style={{color:'red'}}>*</span></label>
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="input-box19">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option>General</option>
                  <option>OBC</option>
                  <option>SC</option>
                  <option>ST</option>
                </select>
              </div>
              <div className="input-box19">
                <label>Blood Group</label>
                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>O+</option><option>O-</option><option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option><option>AB+</option><option>AB-</option>
                </select>
              </div>
              <div className="input-box19">
                <label>Nationality</label>
                <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
              </div>
            </div>
          </div>
        )}

        {/* === PARENT, HEALTH, GUARDIAN, SETTINGS – same as your original (copy-paste them here) === */}
        {/* I’m saving space – just paste your original tab content here */}
        {/* They work exactly the same with handleChange */}

        {/* Parent Details */}
        {activeTab === 'parent' && (
          <div className="form-section19">
            <h3>Parent Details</h3>
            <div className="form-grid19">
              <div className="input-box19"><label>Father Name *</label><input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required /></div>
              <div className="input-box19"><label>Mother Name *</label><input type="text" name="motherName" value={formData.motherName} onChange={handleChange} required /></div>
              <div className="input-box19"><label>Father Occupation</label><input type="text" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} /></div>
              <div className="input-box19"><label>Mother Occupation</label><input type="text" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} /></div>
              <div className="input-box19"><label>Father Aadhaar</label><input type="text" name="fatherAadhaar" value={formData.fatherAadhaar} onChange={handleChange} /></div>
              <div className="input-box19"><label>Mother Aadhaar</label><input type="text" name="motherAadhaar" value={formData.motherAadhaar} onChange={handleChange} /></div>
              <div className="input-box19"><label>Email ID</label><input type="email" name="email" value={formData.email} onChange={handleChange} /></div>
              <div className="input-box19"><label>Emergency Contact</label><input type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} /></div>
            </div>
          </div>
        )}

        {/* Last Education */}
        {activeTab === 'lastEdu' && (
          <div className="form-section19">
            <h3>Last Education</h3>
            <div className="form-grid19">
              <div className="input-box19"><label>Previous School</label><input type="text" name="previousSchoolName" value={formData.previousSchoolName} onChange={handleChange} /></div>
              <div className="input-box19"><label>Previous Class</label>
                <select name="previousClass" value={formData.previousClass} onChange={handleChange}>
                  <option>Select</option>
                  {classList.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="input-box19"><label>Percentage</label><input type="number" name="previousPercentage" value={formData.previousPercentage} onChange={handleChange} min="0" max="100" /></div>
            </div>
          </div>
        )}

        {/* Health, Guardian, Settings – same pattern */}
        {activeTab === 'health' && (
          <div className="form-section19">
            <h3>Health Details</h3>
            <div className="form-grid19">
              <div className="input-box19"><label>Height (cm)</label><input type="number" name="height" value={formData.height} onChange={handleChange} /></div>
              <div className="input-box19"><label>Weight (kg)</label><input type="number" name="weight" value={formData.weight} onChange={handleChange} /></div>
              <div className="input-box19"><label>Medical Condition</label><input type="text" name="medicalCondition" value={formData.medicalCondition} onChange={handleChange} /></div>
              <div className="input-big19"><label>Doctor Remark</label><textarea rows="3" name="doctorRemark" value={formData.doctorRemark} onChange={handleChange} /></div>
            </div>
          </div>
        )}

        {activeTab === 'guardian' && (
          <div className="form-section19">
            <h3>Guardian Details (If Any)</h3>
            <div className="form-grid19">
              <div className="input-box19"><label>Guardian Name</label><input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} /></div>
              <div className="input-box19"><label>Relation</label><input type="text" name="relation" value={formData.relation} onChange={handleChange} /></div>
              <div className="input-box19"><label>Phone</label><input type="tel" name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} /></div>
              <div className="input-big19"><label>Address</label><textarea rows="3" name="guardianAddress" value={formData.guardianAddress} onChange={handleChange} /></div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="form-section19">
            <h3>Additional Settings</h3>
            <div className="form-grid19">
              <div className="input-box19">
                <label>Transport Required</label>
                <select name="transportRequired" value={formData.transportRequired} onChange={handleChange}>
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
              <div className="input-box19">
                <label>Route / Bus No.</label>
                <input type="text" name="transportRoute" value={formData.transportRoute} onChange={handleChange} />
              </div>
              <div className="input-big19">
                <label>Additional Notes</label>
                <textarea rows="4" name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} placeholder="Any special instructions..." />
              </div>
            </div>
          </div>
        )}

        {/* Sticky Submit Button */}
        <div className="submit-container19">
          <button type="submit" className="submit-btn19" disabled={loading}>
            {loading ? 'Saving...' : isEditMode ? 'Update Student' : 'Register Student'}
          </button>
        </div>
      </form>
    </div>
  );
}