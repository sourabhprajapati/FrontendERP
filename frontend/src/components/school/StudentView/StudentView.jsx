import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit2,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Users,
  FileText,
  Heart,
  Car,
  Home,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import "./StudentView.css";

const StudentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000";

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("admission");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchStudent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseURL}/api/students/${id}`);
        if (!response.ok) throw new Error("Student not found");
        const data = await response.json();
        setStudent(data);
      } catch (err) {
        console.error("Error fetching student:", err);
        toast.error("Failed to load student details");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleDeleteDocument = async (index) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;

    try {
      const response = await fetch(`${baseURL}/api/students/${id}/documents/${index}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const res = await fetch(`${baseURL}/api/students/${id}`);
        const data = await res.json();
        setStudent(data);
        toast.success("Document deleted successfully");
      } else {
        toast.error("Failed to delete document");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting document");
    }
  };

  if (loading) {
    return (
      <div className="erp-view-container">
        <div className="erp-loading-view">
          <div className="erp-spinner-view"></div>
          <p>Loading student details...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="erp-view-container">
        <div className="erp-error-view">
          <div className="erp-error-icon-view">⚠️</div>
          <h3>Student not found</h3>
          <button onClick={() => navigate("/studentdetails")} className="erp-btn-back">
            Back to Students
          </button>
        </div>
      </div>
    );
  }

  const b = student.basic || {};
  const a = student.address || {};
  const p = student.parents || {};
  const ps = student.previousSchool || {};
  const transport = student.transport || {};
  const hostel = student.hostel || {};
  const health = student.health || {};
  const docsChecklist = student.documentsChecklist || {};

  const tabs = [
    { id: "admission", label: "Admission Details", icon: Calendar },
    { id: "basic", label: "Basic Details", icon: UserCheck },
    { id: "parents", label: "Parent Details", icon: Users },
    { id: "education", label: "Last Education Details", icon: GraduationCap },
    { id: "health", label: "Health Details", icon: Heart },
    { id: "guardians", label: "Guardian Details", icon: UserCheck },
    { id: "documents", label: "Documents", icon: FileText },
  ];

  const getFullPhotoUrl = (url) => {
    if (!url) return "/placeholder-avatar.jpg";
    if (url.startsWith("http")) return url;
    return `${baseURL}${url}`;
  };

  const formatDate = (date) => {
    if (!date) return "—";
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return date;
      return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  return (
    <div className="erp-view-container">
      {/* Header */}
      <div className="erp-view-header">
        <button onClick={() => navigate("/studentdetails")} className="erp-back-btn">
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="erp-header-title">
          <h1>Student Profile</h1>
          <p>Full student academic and personal records</p>
        </div>
        <div className="erp-header-actions-view">
          <button
            onClick={() =>
              navigate("/studentadmissionform", {
                state: { student, isEdit: true },
              })
            }
            className="erp-btn-edit-view"
          >
            <Edit2 size={18} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Student Top Card */}
      <div className="erp-student-card-view">
        <div className="erp-student-photo-section">
          <div className="erp-photo-wrapper">
            <img
              src={getFullPhotoUrl(b.photo)}
              alt={b.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-avatar.jpg";
              }}
            />
          </div>
          <div className="erp-student-basic-info">
            <div className="erp-title-row">
              <h2>{b.name || "Unnamed Student"}</h2>
              <span
                className={`erp-status-pill ${(student.status || "active") === "active" ? "active" : "inactive"}`}
              >
                {student.status || "active"}
              </span>
            </div>
            <div className="erp-student-meta">
              <span className="erp-meta-badge">Class {b.class || "-"}</span>
              {b.section && <span className="erp-meta-badge">Sec {b.section}</span>}
              <span className="erp-meta-badge">{b.gender || "-"}</span>
              <span className="erp-meta-badge">{b.studentStatus || "New"} Student</span>
            </div>
            <div className="erp-student-contact">
              {b.fatherMobile && (
                <div className="erp-contact-item">
                  <Phone size={16} />
                  <span>{b.fatherMobile} (Father)</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="erp-student-quick-info">
          <div className="erp-quick-item">
            <span className="erp-quick-label">Admission No.</span>
            <span className="erp-quick-value">{b.admissionNo || "—"}</span>
          </div>
          <div className="erp-quick-item">
            <span className="erp-quick-label">Roll No.</span>
            <span className="erp-quick-value">{b.rollNo || "—"}</span>
          </div>
          <div className="erp-quick-item">
            <span className="erp-quick-label">Academic Year</span>
            <span className="erp-quick-value">{b.academicYear || "—"}</span>
          </div>
          <div className="erp-quick-item">
            <span className="erp-quick-label">Admission Date</span>
            <span className="erp-quick-value">{formatDate(b.admissionDate)}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="erp-tabs-view">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`erp-tab-view ${activeTab === tab.id ? "active" : ""}`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="erp-content-view">
        {activeTab === "admission" && (
          <div className="erp-info-section">
            <div className="erp-info-card">
              <h3>
                <Calendar size={20} />
                Admission Details
              </h3>
              <div className="erp-info-grid">
                <div className="erp-info-item">
                  <span className="erp-info-label">Admission No. / SR No.</span>
                  <span className="erp-info-value">{b.admissionNo || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Admission Date</span>
                  <span className="erp-info-value">{formatDate(b.admissionDate)}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Admitted Class</span>
                  <span className="erp-info-value">{b.admittedClass || b.class || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Current Class / Section</span>
                  <span className="erp-info-value">{b.class} - {b.section}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Student Status</span>
                  <span className="erp-info-value">{b.studentStatus || "New"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Father's Mobile Number</span>
                  <span className="erp-info-value">{b.fatherMobile || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Any Other ID</span>
                  <span className="erp-info-value">{b.anyOtherId || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Aadhaar No.</span>
                  <span className="erp-info-value">{b.aadhaar || "—"}</span>
                </div>
                <div className="erp-info-item full">
                  <span className="erp-info-label">Admission Remark</span>
                  <span className="erp-info-value">{b.admissionRemark || "—"}</span>
                </div>
              </div>
            </div>

            <div className="erp-info-card" style={{ marginTop: "24px" }}>
              <h3>
                <MapPin size={20} />
                Address Details
              </h3>
              <div className="erp-info-grid">
                <div className="erp-info-item full">
                  <span className="erp-info-label">Current Address</span>
                  <span className="erp-info-value">{a.currentAddress || "—"}</span>
                </div>
                <div className="erp-info-item full">
                  <span className="erp-info-label">Permanent Address</span>
                  <span className="erp-info-value">{a.permanentAddress || "—"}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "basic" && (
          <div className="erp-info-section">
            <div className="erp-info-card">
              <h3>
                <UserCheck size={20} />
                Personal Information
              </h3>
              <div className="erp-info-grid">
                <div className="erp-info-item">
                  <span className="erp-info-label">Gender</span>
                  <span className="erp-info-value">{b.gender || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Date of Birth</span>
                  <span className="erp-info-value">{formatDate(b.dob)}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Age</span>
                  <span className="erp-info-value">{b.age || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Nationality</span>
                  <span className="erp-info-value">{b.nationality || "Indian"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Religion</span>
                  <span className="erp-info-value">{b.religion || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Category</span>
                  <span className="erp-info-value">{b.category || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Caste</span>
                  <span className="erp-info-value">{b.caste || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Any Disability?</span>
                  <span className="erp-info-value">{b.isDisability || "No"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Whether BPL?</span>
                  <span className="erp-info-value">{b.isBPL || "No"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Pin Code</span>
                  <span className="erp-info-value">{b.pinCode || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Residence Phone</span>
                  <span className="erp-info-value">{b.residencePhone || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Single Parent?</span>
                  <span className="erp-info-value">{b.isSingleParent || "No"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Single Child?</span>
                  <span className="erp-info-value">{b.isSingleChild || "No"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Country</span>
                  <span className="erp-info-value">{b.country || "India"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Living With Parents?</span>
                  <span className="erp-info-value">{b.childLivingWithParents || "Yes"}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "parents" && (
          <div className="erp-family-view">
            <div className="erp-parent-row">
              {/* Father */}
              <div className="erp-info-card family-card">
                <div className="erp-family-header">
                  <div className="erp-family-photo">
                    <img src={getFullPhotoUrl(p.father?.photo)} alt="Father" />
                  </div>
                  <div className="erp-family-title">
                    <h4>Father's Profile</h4>
                    <strong>{p.father?.name || "—"}</strong>
                  </div>
                </div>
                <div className="erp-family-details">
                  <div className="erp-detail-item"><span>UID:</span> <strong>{p.father?.uid || "—"}</strong></div>
                  <div className="erp-detail-item"><span>Mobile:</span> <strong>{p.father?.mobile || b.fatherMobile || "—"}</strong></div>
                  <div className="erp-detail-item"><span>Email:</span> <strong>{p.father?.email || "—"}</strong></div>
                  <div className="erp-detail-item"><span>Occupation:</span> <strong>{p.father?.occupation || "—"}</strong></div>
                  <div className="erp-detail-item"><span>Qualification:</span> <strong>{p.father?.qualification || "—"}</strong></div>
                  <div className="erp-detail-item"><span>Annual Income:</span> <strong>{p.father?.annualIncome || "—"}</strong></div>
                  <div className="erp-detail-item"><span>Office Contact:</span> <strong>{p.father?.officeContact || "—"}</strong></div>
                  <div className="erp-detail-item"><span>School Employee:</span> <strong>{p.father?.isSchoolEmployee || "No"}</strong></div>
                  <div className="erp-detail-item full"><span>Office Address:</span> <strong>{p.father?.officeAddress || "—"}</strong></div>
                </div>
              </div>

              {/* Mother */}
              <div className="erp-info-card family-card">
                <div className="erp-family-header">
                  <div className="erp-family-photo">
                    <img src={getFullPhotoUrl(p.mother?.photo)} alt="Mother" />
                  </div>
                  <div className="erp-family-title">
                    <h4>Mother's Profile</h4>
                    <strong>{p.mother?.name || "—"}</strong>
                  </div>
                </div>
                <div className="erp-family-details">
                  <div className="erp-detail-item"><span>UID:</span> <strong>{p.mother?.uid || "—"}</strong></div>
                  <div className="erp-detail-item"><span>Mobile:</span> <strong>{p.mother?.mobile || "—"}</strong></div>
                  <div className="erp-detail-item"><span>Email:</span> <strong>{p.mother?.email || "—"}</strong></div>
                  <div className="erp-detail-item"><span>Occupation:</span> <strong>{p.mother?.occupation || "—"}</strong></div>
                  <div className="erp-detail-item"><span>Qualification:</span> <strong>{p.mother?.qualification || "—"}</strong></div>
                  <div className="erp-detail-item"><span>Annual Income:</span> <strong>{p.mother?.annualIncome || "—"}</strong></div>
                  <div className="erp-detail-item"><span>Office Contact:</span> <strong>{p.mother?.officeContact || "—"}</strong></div>
                  <div className="erp-detail-item full"><span>Office Address:</span> <strong>{p.mother?.officeAddress || "—"}</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "guardians" && (
          <div className="erp-family-view">
            <div className="erp-parent-row">
              {/* Guardian 1 */}
              <div className="erp-info-card family-card">
                <div className="erp-family-header">
                  <div className="erp-family-photo">
                    <img src={getFullPhotoUrl(p.guardian?.photo)} alt="Guardian 1" />
                  </div>
                  <div className="erp-family-title">
                    <h4>First Guardian</h4>
                    <strong>{p.guardian?.name || "—"}</strong>
                  </div>
                </div>
                <div className="erp-family-details">
                  <div className="erp-detail-item"><span>Relation:</span> <strong>{p.guardian?.relation || "—"}</strong></div>
                  <div className="erp-detail-item"><span>Mobile:</span> <strong>{p.guardian?.mobile || "—"}</strong></div>
                  <div className="erp-detail-item"><span>Occupation:</span> <strong>{p.guardian?.occupation || "—"}</strong></div>
                  <div className="erp-detail-item"><span>Aadhaar:</span> <strong>{p.guardian?.aadhaar || "—"}</strong></div>
                  <div className="erp-detail-item full"><span>Address:</span> <strong>{p.guardian?.address || "—"}</strong></div>
                </div>
              </div>

              {/* Guardian 2 */}
              <div className="erp-info-card family-card">
                <div className="erp-family-header">
                  <div className="erp-family-photo">
                    <img src={getFullPhotoUrl(p.guardian2?.photo)} alt="Guardian 2" />
                  </div>
                  <div className="erp-family-title">
                    <h4>Second Guardian</h4>
                    <strong>{p.guardian2?.name || "—"}</strong>
                  </div>
                </div>
                <div className="erp-family-details">
                  <div className="erp-detail-item"><span>Relation:</span> <strong>{p.guardian2?.relation || "—"}</strong></div>
                  <div className="erp-detail-item"><span>Mobile:</span> <strong>{p.guardian2?.mobile || "—"}</strong></div>
                  <div className="erp-detail-item"><span>Occupation:</span> <strong>{p.guardian2?.occupation || "—"}</strong></div>
                  <div className="erp-detail-item"><span>Aadhaar:</span> <strong>{p.guardian2?.aadhaar || "—"}</strong></div>
                  <div className="erp-detail-item full"><span>Address:</span> <strong>{p.guardian2?.address || "—"}</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "education" && (
          <div className="erp-info-section">
            <div className="erp-info-card">
              <h3>
                <GraduationCap size={20} />
                Last Education Details
              </h3>
              <div className="erp-info-grid">
                <div className="erp-info-item">
                  <span className="erp-info-label">Last School Name</span>
                  <span className="erp-info-value">{ps.name || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Last Class</span>
                  <span className="erp-info-value">{ps.lastClass || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Medium</span>
                  <span className="erp-info-value">{ps.medium || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Result</span>
                  <span className="erp-info-value">{ps.result || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Board</span>
                  <span className="erp-info-value">{ps.board || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Percentage (%age)</span>
                  <span className="erp-info-value">{ps.percentage || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Reason To Leave</span>
                  <span className="erp-info-value">{ps.reasonToLeave || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">TC Date</span>
                  <span className="erp-info-value">{formatDate(ps.tcDate)}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">TC Number</span>
                  <span className="erp-info-value">{ps.tcNumber || "—"}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "health" && (
          <div className="erp-info-section">
            <div className="erp-info-card">
              <h3>
                <Heart size={20} />
                Health Details
              </h3>
              <div className="erp-info-grid">
                <div className="erp-info-item">
                  <span className="erp-info-label">Height (cm)</span>
                  <span className="erp-info-value">{health.height || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Weight (kg)</span>
                  <span className="erp-info-value">{health.weight || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Eyes (L/R)</span>
                  <span className="erp-info-value">{health.eyes || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Blood Group</span>
                  <span className="erp-info-value">{health.bloodGroup || "—"}</span>
                </div>
                <div className="erp-info-item full">
                  <span className="erp-info-label">Medical History / Conditions</span>
                  <span className="erp-info-value">{health.medical || "None"}</span>
                </div>
              </div>
            </div>

            <div className="erp-info-card" style={{ marginTop: "24px" }}>
              <h3>
                <AlertCircle size={20} />
                Emergency Contact
              </h3>
              <div className="erp-info-grid">
                <div className="erp-info-item">
                  <span className="erp-info-label">Contact Person</span>
                  <span className="erp-info-value">{health.emergencyName || "—"}</span>
                </div>
                <div className="erp-info-item">
                  <span className="erp-info-label">Contact Number</span>
                  <span className="erp-info-value">{health.emergencyPhone || "—"}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="erp-documents-view">
            <div className="erp-info-card">
              <h3>
                <Download size={20} />
                Files & Downloads
              </h3>
              <div className="erp-documents-list-view">
                {ps.tcFile && (
                  <div className="erp-document-card-view">
                    <div className="erp-document-info-view">
                      <FileText size={24} className="erp-doc-icon-view" />
                      <div>
                        <h4>Transfer Certificate (TC)</h4>
                        <p>Uploaded from admission form</p>
                      </div>
                    </div>
                    <a href={`${baseURL}${ps.tcFile}`} target="_blank" rel="noopener noreferrer" className="erp-btn-download-view">
                      <Download size={18} /> Download
                    </a>
                  </div>
                )}
                {ps.marksheetFile && (
                  <div className="erp-document-card-view">
                    <div className="erp-document-info-view">
                      <FileText size={24} className="erp-doc-icon-view" />
                      <div>
                        <h4>Marksheet</h4>
                        <p>Uploaded from admission form</p>
                      </div>
                    </div>
                    <a href={`${baseURL}${ps.marksheetFile}`} target="_blank" rel="noopener noreferrer" className="erp-btn-download-view">
                      <Download size={18} /> Download
                    </a>
                  </div>
                )}
                {student.documents?.map((doc, index) => (
                  <div key={index} className="erp-document-card-view">
                    <div className="erp-document-info-view">
                      <FileText size={24} className="erp-doc-icon-view" />
                      <div>
                        <h4>{doc.title || "Document"}</h4>
                        <p>{doc.fileName}</p>
                      </div>
                    </div>
                    <div className="erp-document-actions-view">
                      <a href={`${baseURL}${doc.filePath}`} target="_blank" rel="noopener noreferrer" className="erp-btn-download-view">
                        <Download size={18} /> Download
                      </a>
                      <button onClick={() => handleDeleteDocument(index)} className="erp-btn-delete-view">Delete</button>
                    </div>
                  </div>
                ))}
                {!ps.tcFile && !ps.marksheetFile && (!student.documents || student.documents.length === 0) && (
                  <div className="erp-empty-docs">
                    <FileText size={48} />
                    <p>No documents uploaded yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentView;
