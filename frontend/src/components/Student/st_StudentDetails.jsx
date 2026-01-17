import React, { useState, useEffect } from "react";
import {
  User,
  BookOpen,
  Users,
  MapPin,
  Phone,
  Calendar,
  ShieldCheck,
  BadgeCheck,
  Hash,
  Heart,
  Droplets,
  Mail,
  Loader2
} from "lucide-react";
import { toast } from "react-toastify";
import "./st_StudentDetails.css";

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("academic");
  const [studentId] = useState("69492db6454a767f3fe98323"); //hardcode student's id for demo

  const baseURL = "http://localhost:5000";

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await fetch(`${baseURL}/api/students/${studentId}`);
        if (!response.ok) throw new Error("Student data not found");
        const data = await response.json();
        setStudent(data);
      } catch (err) {
        console.error("Error fetching student:", err);
        toast.error("Failed to load student details");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [studentId]);

  if (loading) {
    return (
      <div className="st-loader-container">
        <Loader2 className="st-spinner" size={48} />
        <p>Fetching your profile...</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="st-error-container">
        <h3>Profile Not Found</h3>
        <p>We couldn't retrieve your details at this moment.</p>
      </div>
    );
  }

  const b = student.basic || {};
  const a = student.address || {};
  const p = student.parents || {};
  const ps = student.previousSchool || {};
  const health = student.health || {};

  const getFullPhotoUrl = (url) => {
    if (!url) return "/placeholder-avatar.jpg";
    if (url.startsWith("http")) return url;
    return `${baseURL}${url}`;
  };

  const formatDate = (date) => {
    if (!date) return "—";
    const d = new Date(date);
    return isNaN(d.getTime()) ? date : d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="st-info-row">
      <div className="st-info-icon-wrapper">
        <Icon size={18} />
      </div>
      <div className="st-info-content">
        <span className="st-info-label">{label}</span>
        <span className="st-info-value">{value || "—"}</span>
      </div>
    </div>
  );

  return (
    <div className="st-profile-container st-animate-fade-in">
      {/* Hero Section */}
      <div className="st-hero-card">
        <div className="st-hero-content">
          <div className="st-avatar-wrapper">
            <img
              src={getFullPhotoUrl(b.photo)}
              alt={b.name}
              onError={(e) => { e.target.src = "/placeholder-avatar.jpg"; }}
            />
            <div className="st-status-badge active">Active Student</div>
          </div>

          <div className="st-student-main">
            <h1>{b.name}</h1>
            <div className="st-student-badges">
              <span className="st-badge primary">Class {b.class} - {b.section}</span>
              <span className="st-badge secondary">Roll No: {b.rollNo || "N/A"}</span>
              <span className="st-badge outline">ID: {b.admissionNo}</span>
            </div>
          </div>
        </div>

        <div className="st-hero-stats">
          <div className="st-stat-item">
            <Calendar size={20} />
            <div>
              <span className="st-stat-label">Admission Date</span>
              <span className="st-stat-value">{formatDate(b.admissionDate)}</span>
            </div>
          </div>
          <div className="st-stat-item">
            <BadgeCheck size={20} />
            <div>
              <span className="st-stat-label">Academic Year</span>
              <span className="st-stat-value">{b.academicYear}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="st-tabs-nav">
        <button
          className={`st-tab-btn ${activeTab === "academic" ? "active" : ""}`}
          onClick={() => setActiveTab("academic")}
        >
          <BookOpen size={18} /> Academic
        </button>
        <button
          className={`st-tab-btn ${activeTab === "personal" ? "active" : ""}`}
          onClick={() => setActiveTab("personal")}
        >
          <User size={18} /> Personal
        </button>
        <button
          className={`st-tab-btn ${activeTab === "family" ? "active" : ""}`}
          onClick={() => setActiveTab("family")}
        >
          <Users size={18} /> Family
        </button>
        <button
          className={`st-tab-btn ${activeTab === "health" ? "active" : ""}`}
          onClick={() => setActiveTab("health")}
        >
          <Heart size={18} /> Health
        </button>
      </div>

      {/* Tab Content */}
      <div className="st-tab-content st-tab-stabilizer">
        {activeTab === "academic" && (
          <div className="st-content-grid">
            <div className="st-info-card shadow">
              <h3>Admission Details</h3>
              <div className="st-card-body">
                <InfoRow icon={Hash} label="Admission No." value={b.admissionNo} />
                <InfoRow icon={Calendar} label="Admission Date." value={formatDate(b.admissionDate)} />
                <InfoRow icon={BadgeCheck} label="Admitted Class" value={b.admittedClass} />
                <InfoRow icon={ShieldCheck} label="Student Status" value={b.studentStatus} />
              </div>
            </div>
            <div className="st-info-card shadow">
              <h3>Previous Education</h3>
              <div className="st-card-body">
                <InfoRow icon={BookOpen} label="School Name" value={ps.name} />
                <InfoRow icon={BadgeCheck} label="Last Class" value={ps.lastClass} />
                <InfoRow icon={Hash} label="TC Number" value={ps.tcNumber} />
                <InfoRow icon={BadgeCheck} label="Result" value={ps.result} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "personal" && (
          <div className="st-content-grid">
            <div className="st-info-card shadow">
              <h3>Personal Info</h3>
              <div className="st-card-body">
                <InfoRow icon={Calendar} label="Date of Birth" value={formatDate(b.dob)} />
                <InfoRow icon={User} label="Gender" value={b.gender} />
                <InfoRow icon={BadgeCheck} label="Aadhaar No." value={b.aadhaar} />
                <InfoRow icon={MapPin} label="Nationality" value={b.nationality} />
              </div>
            </div>
            <div className="st-info-card shadow">
              <h3>Address Details</h3>
              <div className="st-card-body">
                <InfoRow icon={MapPin} label="Current Address" value={a.currentAddress} />
                <InfoRow icon={MapPin} label="Permanent Address" value={a.permanentAddress} />
                <InfoRow icon={Hash} label="Pin Code" value={b.pinCode} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "family" && (
          <div className="st-content-grid">
            <div className="st-info-card shadow">
              <h3>Father's Details</h3>
              <div className="st-card-body">
                <InfoRow icon={User} label="Name" value={p.father?.name} />
                <InfoRow icon={Phone} label="Mobile" value={p.father?.mobile || b.fatherMobile} />
                <InfoRow icon={Briefcase} label="Occupation" value={p.father?.occupation} />
                <InfoRow icon={Mail} label="Email" value={p.father?.email} />
              </div>
            </div>
            <div className="st-info-card shadow">
              <h3>Mother's Details</h3>
              <div className="st-card-body">
                <InfoRow icon={User} label="Name" value={p.mother?.name} />
                <InfoRow icon={Phone} label="Mobile" value={p.mother?.mobile} />
                <InfoRow icon={Briefcase} label="Occupation" value={p.mother?.occupation} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "health" && (
          <div className="st-content-grid">
            <div className="st-info-card shadow">
              <h3>Vital Stats</h3>
              <div className="st-card-body">
                <InfoRow icon={Hash} label="Height" value={health.height ? `${health.height} cm` : "—"} />
                <InfoRow icon={Hash} label="Weight" value={health.weight ? `${health.weight} kg` : "—"} />
                <InfoRow icon={Droplets} label="Blood Group" value={health.bloodGroup} />
                <InfoRow icon={BadgeCheck} label="Disability" value={b.isDisability} />
              </div>
            </div>
            <div className="st-info-card shadow">
              <h3>Emergency Contact</h3>
              <div className="st-card-body">
                <InfoRow icon={User} label="Contact Person" value={health.emergencyName} />
                <InfoRow icon={Phone} label="Contact No." value={health.emergencyPhone} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Simple utility icon for occupation since it wasn't imported
const Briefcase = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

export default StudentDetails;