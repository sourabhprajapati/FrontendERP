import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./StudentAdmissionForm.css";

const schoolCode = "SCHOOL";

const alphaRegex = /^[A-Za-z\s]+$/;
const mobileRegex = /^[6-9]\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const aadhaarRegex = /^\d{12}$/;
const SESSIONS = ["2023-2024", "2024-2025", "2025-2026"];

const getCurrentAcademicYear = () => {
  const now = new Date();
  const year = now.getFullYear();
  const next = (year + 1).toString().slice(-2);
  return `${year}-${next}`;
};

const generateAdmissionNo = (academicYear) => {
  const yearPart = academicYear || getCurrentAcademicYear();
  const serial = Math.floor(1000 + Math.random() * 9000);
  return `${schoolCode}/${yearPart}/${serial}`;
};

const calcAge = (dob) => {
  if (!dob) return "";
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age >= 0 ? age : "";
};

const initialForm = () => ({
  admissionNo: "",
  anyOtherId: "",
  academicYear: getCurrentAcademicYear(),
  admissionDate: new Date().toISOString().split("T")[0],
  class: "",
  admittedClass: "",
  section: "",
  firstName: "",
  lastName: "",
  gender: "",
  dob: "",
  age: "",
  studentStatus: "New",
  aadhaar: "",
  fatherMobile: "",
  currentAddress: "",
  permanentAddress: "",
  sameAsCurrent: false,
  admissionRemark: "",
  nationality: "Indian",
  religion: "",
  category: "",
  isDisability: "No",
  isBPL: "No",
  pinCode: "",
  caste: "",
  residencePhone: "",
  isSingleParent: "No",
  isSingleChild: "No",
  country: "India",
  childLivingWithParents: "Yes",
  father: {
    name: "",
    mobile: "",
    email: "",
    uid: "",
    occupation: "",
    qualification: "",
    annualIncome: "",
    officeContact: "",
    officeAddress: "",
    isSchoolEmployee: "No",
    photo: null,
  },
  mother: {
    name: "",
    mobile: "",
    email: "",
    uid: "",
    occupation: "",
    qualification: "",
    annualIncome: "",
    officeContact: "",
    officeAddress: "",
    photo: null,
  },
  guardianDifferent: false,
  guardian: {
    name: "",
    relation: "",
    mobile: "",
    email: "",
    occupation: "",
    aadhaar: "",
    address: "",
    photo: null,
  },
  guardian2: {
    name: "",
    relation: "",
    mobile: "",
    email: "",
    occupation: "",
    aadhaar: "",
    address: "",
    photo: null,
  },
  previousSchool: {
    name: "",
    lastClass: "",
    medium: "English",
    result: "",
    board: "",
    percentage: "",
    reasonToLeave: "",
    tcDate: "",
    tcNumber: "",
    tcFile: null,
    marksheetFile: null,
  },
  transport: {
    enabled: false,
    route: "",
    busStop: "",
  },
  hostel: {
    enabled: false,
    hostelName: "",
    roomNumber: "",
  },
  health: {
    height: "",
    weight: "",
    eyes: "",
    bloodGroup: "",
    disability: false,
    medical: "",
    emergencyName: "",
    emergencyPhone: "",
  },
  documents: {},
  uploadFiles: {
    aadhaar: null,
    tc: null,
    birthCertificate: null,
    marksheet: null,
    photos: null,
    incomeCertificate: null,
    casteCertificate: null,
    medicalCertificate: null,
  },
});

const StudentAdmissionForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Use relative URL in development (works with Vite proxy) or absolute URL as fallback
  const baseURL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "" : "http://localhost:5000");

  const isEdit = location.state?.isEdit || false;
  const studentId = location.state?.student?._id || null;
  const [loading, setLoading] = useState(isEdit);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [fatherPhotoPreview, setFatherPhotoPreview] = useState(null);
  const [motherPhotoPreview, setMotherPhotoPreview] = useState(null);
  const [guardianPhotoPreview, setGuardianPhotoPreview] = useState(null);
  const [guardian2PhotoPreview, setGuardian2PhotoPreview] = useState(null);

  const [activeTab, setActiveTab] = useState("Admission Details");

  const tabs = [
    "Admission Details",
    "Basic Details",
    "Parent Details",
    "Last Education Details",
    "Health Details",
    "Guardian Details",
  ];

  const [form, setForm] = useState(() => {
    const draft = initialForm();
    if (!isEdit) {
      draft.admissionNo = generateAdmissionNo(draft.academicYear);
    }
    return draft;
  });

  const [errors, setErrors] = useState({});

  // Fetch student data in edit mode
  useEffect(() => {
    if (isEdit && studentId) {
      const fetchStudent = async () => {
        try {
          setLoading(true);
          const res = await fetch(`${baseURL}/api/students/${studentId}`);
          if (!res.ok) throw new Error("Failed to fetch student");
          const student = await res.json();

          // Pre-fill form with student data
          const b = student.basic || {};
          const a = student.address || {};
          const p = student.parents || {};
          const ps = student.previousSchool || {};
          const t = student.transport || {};
          const h = student.hostel || {};
          const health = student.health || {};
          const docs = student.documentsChecklist || {};

          // Parse name into firstName and lastName
          const nameParts = (b.name || "").split(" ").filter(Boolean);
          let firstName = "";
          let lastName = "";

          if (nameParts.length > 1) {
            lastName = nameParts[nameParts.length - 1];
            firstName = nameParts.slice(0, -1).join(" ");
          } else {
            firstName = nameParts[0] || "";
          }

          setForm({
            admissionNo: b.admissionNo || "",
            anyOtherId: b.anyOtherId || "",
            academicYear: b.academicYear || getCurrentAcademicYear(),
            admissionDate: b.admissionDate ? new Date(b.admissionDate).toISOString().split("T")[0] : "",
            class: b.class || "",
            admittedClass: b.admittedClass || "",
            section: b.section || "",
            firstName: firstName,
            lastName: lastName,
            gender: b.gender || "",
            dob: b.dob ? new Date(b.dob).toISOString().split("T")[0] : "",
            age: calcAge(b.dob),
            studentStatus: b.studentStatus || "New",
            aadhaar: b.aadhaar || "",
            fatherMobile: b.fatherMobile || "",
            currentAddress: a.currentAddress || "",
            permanentAddress: a.permanentAddress || "",
            sameAsCurrent: a.sameAsCurrent || false,
            admissionRemark: b.admissionRemark || "",
            nationality: b.nationality || "Indian",
            religion: b.religion || "",
            category: b.category || "",
            isDisability: b.isDisability || "No",
            isBPL: b.isBPL || "No",
            pinCode: b.pinCode || "",
            caste: b.caste || "",
            residencePhone: b.residencePhone || "",
            isSingleParent: b.isSingleParent || "No",
            isSingleChild: b.isSingleChild || "No",
            country: b.country || "India",
            childLivingWithParents: b.childLivingWithParents || "Yes",
            father: {
              name: p.father?.name || "",
              mobile: p.father?.mobile || "",
              email: p.father?.email || "",
              uid: p.father?.uid || "",
              occupation: p.father?.occupation || "",
              qualification: p.father?.qualification || "",
              annualIncome: p.father?.annualIncome || "",
              officeContact: p.father?.officeContact || "",
              officeAddress: p.father?.officeAddress || "",
              isSchoolEmployee: p.father?.isSchoolEmployee || "No",
              photo: null,
            },
            mother: {
              name: p.mother?.name || "",
              mobile: p.mother?.mobile || "",
              email: p.mother?.email || "",
              uid: p.mother?.uid || "",
              occupation: p.mother?.occupation || "",
              qualification: p.mother?.qualification || "",
              annualIncome: p.mother?.annualIncome || "",
              officeContact: p.mother?.officeContact || "",
              officeAddress: p.mother?.officeAddress || "",
              photo: null,
            },
            guardianDifferent: p.guardianDifferent || false,
            guardian: {
              name: p.guardian?.name || "",
              relation: p.guardian?.relation || "",
              mobile: p.guardian?.mobile || "",
              email: p.guardian?.email || "",
              occupation: p.guardian?.occupation || "",
              aadhaar: p.guardian?.aadhaar || "",
              address: p.guardian?.address || "",
              photo: null,
            },
            guardian2: {
              name: p.guardian2?.name || "",
              relation: p.guardian2?.relation || "",
              mobile: p.guardian2?.mobile || "",
              email: p.guardian2?.email || "",
              occupation: p.guardian2?.occupation || "",
              aadhaar: p.guardian2?.aadhaar || "",
              address: p.guardian2?.address || "",
              photo: null,
            },
            previousSchool: {
              name: ps.name || "",
              lastClass: ps.lastClass || "",
              medium: ps.medium || "English",
              result: ps.result || "",
              board: ps.board || "",
              percentage: ps.percentage || "",
              reasonToLeave: ps.reasonToLeave || "",
              tcDate: ps.tcDate ? new Date(ps.tcDate).toISOString().split("T")[0] : "",
              tcNumber: ps.tcNumber || "",
              tcFile: null,
              marksheetFile: null,
            },
            transport: {
              enabled: t.enabled || false,
              route: t.route || "",
              busStop: t.busStop || "",
            },
            hostel: {
              enabled: h.enabled || false,
              hostelName: h.hostelName || "",
              roomNumber: h.roomNumber || "",
            },
            health: {
              height: health.height || "",
              weight: health.weight || "",
              eyes: health.eyes || "",
              bloodGroup: health.bloodGroup || "",
              disability: health.disability || false,
              medical: health.medical || "",
              emergencyName: health.emergencyName || "",
              emergencyPhone: health.emergencyPhone || "",
            },
            documents: {
              aadhaar: docs.aadhaar || false,
              tc: docs.tc || false,
              birthCertificate: docs.birthCertificate || false,
              marksheet: docs.marksheet || false,
              photos: docs.photos || false,
            },
            uploadFiles: {
              aadhaar: null,
              tc: null,
              birthCertificate: null,
              marksheet: null,
              photos: null,
              incomeCertificate: null,
              casteCertificate: null,
              medicalCertificate: null,
            },
          });

          // Set previews if exist
          if (b.photo) setPhotoPreview(b.photo.startsWith("http") ? b.photo : `${baseURL}${b.photo}`);
          if (p.father?.photo) setFatherPhotoPreview(p.father.photo.startsWith("http") ? p.father.photo : `${baseURL}${p.father.photo}`);
          if (p.mother?.photo) setMotherPhotoPreview(p.mother.photo.startsWith("http") ? p.mother.photo : `${baseURL}${p.mother.photo}`);
          if (p.guardian?.photo) setGuardianPhotoPreview(p.guardian.photo.startsWith("http") ? p.guardian.photo : `${baseURL}${p.guardian.photo}`);
          if (p.guardian2?.photo) setGuardian2PhotoPreview(p.guardian2.photo.startsWith("http") ? p.guardian2.photo : `${baseURL}${p.guardian2.photo}`);
        } catch (err) {
          console.error("Error fetching student:", err);
          toast.error("Failed to load student data");
          navigate("/studentdetails");
        } finally {
          setLoading(false);
        }
      };
      fetchStudent();
    }
  }, [isEdit, studentId, navigate]);

  useEffect(() => {
    // Only auto-generate admission no if not in edit mode
    if (!isEdit) {
      setForm((prev) => ({
        ...prev,
        admissionNo: generateAdmissionNo(prev.academicYear),
      }));
    }
  }, [form.academicYear, isEdit]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      age: calcAge(prev.dob),
    }));
  }, [form.dob]);

  const updateField = (path, value) => {
    setForm((prev) => {
      const copy = structuredClone(prev);
      let cursor = copy;
      for (let i = 0; i < path.length - 1; i++) {
        cursor = cursor[path[i]];
      }
      cursor[path[path.length - 1]] = value;
      if (path.join(".") === "sameAsCurrent" && value) {
        copy.permanentAddress = copy.currentAddress;
      }
      if (path.join(".") === "currentAddress" && copy.sameAsCurrent) {
        copy.permanentAddress = value;
      }
      return copy;
    });
  };

  const validate = () => {
    const v = {};

    // Admission Details
    if (!form.firstName) v.firstName = "First name is required";
    if (!form.lastName) v.lastName = "Last name is required";
    if (!form.dob) v.dob = "Date of birth is required";
    if (!form.class) v.class = "Class is required";
    if (!form.section) v.section = "Section is required";
    if (!form.admissionDate) v.admissionDate = "Admission date is required";
    if (!form.admissionNo) v.admissionNo = "Admission No. is required";
    if (!form.fatherMobile) v.fatherMobile = "Father's mobile is required";
    if (form.fatherMobile && !mobileRegex.test(form.fatherMobile))
      v.fatherMobile = "Invalid mobile number";
    if (!form.gender) v.gender = "Gender is required";

    // Parent/Guardian validations (optional fields but format check)
    ["father", "mother", "guardian", "guardian2"].forEach((role) => {
      const person = form[role];
      if (!person) return;
      if (person.mobile && !mobileRegex.test(person.mobile))
        v[`${role}.mobile`] = "Invalid mobile number";
      if (person.email && !emailRegex.test(person.email))
        v[`${role}.email`] = "Invalid email address";
    });

    return v;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) {
      toast.error("Please fix the highlighted errors");
      // Optionally switch to the first tab with errors
      if (v.firstName || v.lastName || v.dob || v.class || v.section || v.admissionDate || v.admissionNo || v.fatherMobile) {
        setActiveTab("Admission Details");
      }
      return;
    }

    const payload = {
      basic: {
        admissionNo: form.admissionNo,
        anyOtherId: form.anyOtherId,
        academicYear: form.academicYear,
        class: form.class,
        section: form.section,
        admissionDate: form.admissionDate,
        firstName: form.firstName,
        lastName: form.lastName,
        name: [form.firstName, form.lastName].filter(Boolean).join(" ").trim(),
        gender: form.gender,
        dob: form.dob,
        age: form.age,
        studentStatus: form.studentStatus,
        aadhaar: form.aadhaar,
        fatherMobile: form.fatherMobile,
        admissionRemark: form.admissionRemark,
        nationality: form.nationality,
        religion: form.religion,
        category: form.category,
        isDisability: form.isDisability,
        isBPL: form.isBPL,
        pinCode: form.pinCode,
        caste: form.caste,
        residencePhone: form.residencePhone,
        isSingleParent: form.isSingleParent,
        isSingleChild: form.isSingleChild,
        country: form.country,
        childLivingWithParents: form.childLivingWithParents,
        admittedClass: form.admittedClass || form.class,
      },
      address: {
        currentAddress: form.currentAddress,
        permanentAddress: form.permanentAddress,
        sameAsCurrent: form.sameAsCurrent,
      },
      parents: {
        father: form.father,
        mother: form.mother,
        guardianDifferent: form.guardianDifferent,
        guardian: form.guardian,
        guardian2: form.guardian2,
      },
      previousSchool: form.previousSchool,
      transport: form.transport,
      hostel: form.hostel,
      health: form.health,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    if (form.photo) formData.append("studentPhoto", form.photo);
    if (form.father.photo) formData.append("fatherPhoto", form.father.photo);
    if (form.mother.photo) formData.append("motherPhoto", form.mother.photo);
    if (form.guardian.photo) formData.append("guardianPhoto", form.guardian.photo);
    if (form.guardian2.photo) formData.append("guardian2Photo", form.guardian2.photo);

    if (form.previousSchool.tcFile) formData.append("tcFile", form.previousSchool.tcFile);
    if (form.previousSchool.marksheetFile) formData.append("marksheetFile", form.previousSchool.marksheetFile);

    // Append uploaded documents
    Object.entries(form.uploadFiles).forEach(([key, file]) => {
      if (file) {
        formData.append(`doc_${key}`, file);
      }
    });

    try {
      const url = isEdit
        ? `${baseURL}/api/students/${studentId}`
        : `${baseURL}/api/students`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Submission failed");
        return;
      }
      toast.success(isEdit ? "Student updated successfully!" : "Student admitted successfully!");

      if (isEdit) {
        navigate("/studentdetails");
      } else {
        const fresh = initialForm();
        fresh.admissionNo = generateAdmissionNo(fresh.academicYear);
        setForm(fresh);
        setPhotoPreview(null);
        setErrors({});
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error – please try again");
    }
  };

  const saveDraft = () => {
    toast.info("Draft saved locally (not persisted)");
  };

  const resetForm = () => {
    if (isEdit) {
      toast.info("Use browser back button to cancel editing");
      return;
    }
    const fresh = initialForm();
    fresh.admissionNo = generateAdmissionNo(fresh.academicYear);
    setForm(fresh);
    setPhotoPreview(null);
    setErrors({});
  };

  const classes = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);

  const renderError = (key) =>
    errors[key] ? <p className="error-text">{errors[key]}</p> : null;

  if (loading) {
    return (
      <div className="admission-shell88">
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div className="erp-spinner-view88"></div>
          <p>Loading student data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admission-shell88">
      <div style={{ marginBottom: "10px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1a202c", margin: "0 0 8px 0" }}>
          {isEdit ? "Edit Student" : "Student Admission Form"}
        </h1>
        <p style={{ color: "#718096", fontSize: "16px", margin: 0 }}>
          {isEdit ? "Update student information" : "Complete student enrollment"}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation88">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`tab-btn88 ${activeTab === tab ? "active88" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="admission-form88">
        {/* 1. Admission Details */}
        {activeTab === "Admission Details" && (
          <section className="section-card88">
            <header className="section-heading88">
              <h3>🔹 1. Admission Details</h3>
            </header>
            <div className="grid88 two-col88">
              <div className="field88">
                <label>Admission No. / SR No. <span className="required-star88">*</span></label>
                <input
                  value={form.admissionNo}
                  onChange={(e) => updateField(["admissionNo"], e.target.value)}
                  placeholder="e.g. SCHOOL/2024/001"
                />
                {renderError("admissionNo")}
              </div>
              <div className="field88">
                <label>Admission Date <span className="required-star88">*</span></label>
                <input
                  type="date"
                  value={form.admissionDate}
                  onChange={(e) => updateField(["admissionDate"], e.target.value)}
                />
                {renderError("admissionDate")}
              </div>
              <div className="field88">
                <label>Academic Session <span className="required-star88">*</span></label>
                <select
                  value={form.academicYear}
                  onChange={(e) => updateField(["academicYear"], e.target.value)}
                >
                  {SESSIONS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {renderError("academicYear")}
              </div>
              <div className="field88">
                <label>First Name <span className="required-star88">*</span></label>
                <input
                  value={form.firstName}
                  onChange={(e) => updateField(["firstName"], e.target.value)}
                  placeholder="First & Middle Name"
                />
                {renderError("firstName")}
              </div>
              <div className="field88">
                <label>Last Name <span className="required-star88">*</span></label>
                <input
                  value={form.lastName}
                  onChange={(e) => updateField(["lastName"], e.target.value)}
                  placeholder="Last Name"
                />
                {renderError("lastName")}
              </div>
              <div className="field88">
                <label>Date Of Birth <span className="required-star88">*</span></label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => updateField(["dob"], e.target.value)}
                />
                {renderError("dob")}
              </div>
              <div className="field88">
                <label>Select Class <span className="required-star88">*</span></label>
                <select
                  value={form.class}
                  onChange={(e) => updateField(["class"], e.target.value)}
                >
                  <option value="">Select class</option>
                  {classes.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {renderError("class")}
              </div>
              <div className="field88">
                <label>Select Section <span className="required-star88">*</span></label>
                <select
                  value={form.section}
                  onChange={(e) => updateField(["section"], e.target.value)}
                >
                  <option value="">Select section</option>
                  {["A", "B", "C", "D"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {renderError("section")}
              </div>
              <div className="field88">
                <label>Father’s Mobile Number <span className="required-star88">*</span></label>
                <input
                  value={form.fatherMobile}
                  onChange={(e) => updateField(["fatherMobile"], e.target.value)}
                  placeholder="Mobile number"
                />
                {renderError("fatherMobile")}
              </div>
              <div className="field88">
                <label>Any Other ID (PPP / PEN / Samagra etc.)</label>
                <input
                  value={form.anyOtherId}
                  onChange={(e) => updateField(["anyOtherId"], e.target.value)}
                  placeholder="Enter ID"
                />
              </div>
              <div className="field88">
                <label>Student Status</label>
                <div className="radio-group88" style={{ display: "flex", gap: "15px" }}>
                  <label><input type="radio" name="status" checked={form.studentStatus === "New"} onChange={() => updateField(["studentStatus"], "New")} /> New</label>
                  <label><input type="radio" name="status" checked={form.studentStatus === "Old"} onChange={() => updateField(["studentStatus"], "Old")} /> Old</label>
                </div>
              </div>
              <div className="field88">
                <label>Child’s Aadhaar No</label>
                <input
                  value={form.aadhaar}
                  onChange={(e) => updateField(["aadhaar"], e.target.value)}
                  placeholder="12 digit Aadhaar"
                />
              </div>
              <div className="field88 full88">
                <label>Current Address</label>
                <textarea
                  rows={2}
                  value={form.currentAddress}
                  onChange={(e) => updateField(["currentAddress"], e.target.value)}
                />
              </div>
              <div className="field88 full88">
                <label>Permanent Address</label>
                <textarea
                  rows={2}
                  value={form.permanentAddress}
                  onChange={(e) => updateField(["permanentAddress"], e.target.value)}
                />
              </div>
              <div className="field88 full88">
                <label>Admission Remark</label>
                <input
                  value={form.admissionRemark}
                  onChange={(e) => updateField(["admissionRemark"], e.target.value)}
                />
              </div>
            </div>
          </section>
        )}

        {/* 2. Basic Details */}
        {activeTab === "Basic Details" && (
          <section className="section-card88">
            <header className="section-heading88">
              <h3>🔹 2. Basic Details</h3>
            </header>
            <div className="grid88 two-col88">
              <div className="field88">
                <label>Gender <span className="required-star88">*</span></label>
                <select value={form.gender} onChange={(e) => updateField(["gender"], e.target.value)}>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Transgender</option>
                </select>
                {renderError("gender")}
              </div>
              <div className="field88">
                <label>Nationality</label>
                <input value={form.nationality} onChange={(e) => updateField(["nationality"], e.target.value)} />
              </div>
              <div className="field88">
                <label>Religion</label>
                <input value={form.religion} onChange={(e) => updateField(["religion"], e.target.value)} />
              </div>
              <div className="field88">
                <label>Category</label>
                <select value={form.category} onChange={(e) => updateField(["category"], e.target.value)}>
                  <option value="">Select</option>
                  <option>General</option>
                  <option>OBC</option>
                  <option>SC</option>
                  <option>ST</option>
                </select>
              </div>
              <div className="field88">
                <label>Any Disability?</label>
                <div className="radio-group88" style={{ display: "flex", gap: "15px" }}>
                  <label><input type="radio" checked={form.isDisability === "Yes"} onChange={() => updateField(["isDisability"], "Yes")} /> Yes</label>
                  <label><input type="radio" checked={form.isDisability === "No"} onChange={() => updateField(["isDisability"], "No")} /> No</label>
                </div>
              </div>
              <div className="field88">
                <label>Whether BPL?</label>
                <div className="radio-group88" style={{ display: "flex", gap: "15px" }}>
                  <label><input type="radio" checked={form.isBPL === "Yes"} onChange={() => updateField(["isBPL"], "Yes")} /> Yes</label>
                  <label><input type="radio" checked={form.isBPL === "No"} onChange={() => updateField(["isBPL"], "No")} /> No</label>
                </div>
              </div>
              <div className="field88">
                <label>Pin Code</label>
                <input value={form.pinCode} onChange={(e) => updateField(["pinCode"], e.target.value)} />
              </div>
              <div className="field88">
                <label>Caste</label>
                <input value={form.caste} onChange={(e) => updateField(["caste"], e.target.value)} />
              </div>
              <div className="field88">
                <label>Residence Phone Number</label>
                <input value={form.residencePhone} onChange={(e) => updateField(["residencePhone"], e.target.value)} />
              </div>
              <div className="field88">
                <label>Single Parent</label>
                <div className="radio-group88" style={{ display: "flex", gap: "15px" }}>
                  <label><input type="radio" checked={form.isSingleParent === "Yes"} onChange={() => updateField(["isSingleParent"], "Yes")} /> Yes</label>
                  <label><input type="radio" checked={form.isSingleParent === "No"} onChange={() => updateField(["isSingleParent"], "No")} /> No</label>
                </div>
              </div>
              <div className="field88">
                <label>Single Child</label>
                <div className="radio-group88" style={{ display: "flex", gap: "15px" }}>
                  <label><input type="radio" checked={form.isSingleChild === "Yes"} onChange={() => updateField(["isSingleChild"], "Yes")} /> Yes</label>
                  <label><input type="radio" checked={form.isSingleChild === "No"} onChange={() => updateField(["isSingleChild"], "No")} /> No</label>
                </div>
              </div>
              <div className="field88">
                <label>Country</label>
                <input value={form.country} onChange={(e) => updateField(["country"], e.target.value)} />
              </div>
              <div className="field88">
                <label>Child Living With Parents</label>
                <div className="radio-group88" style={{ display: "flex", gap: "15px" }}>
                  <label><input type="radio" checked={form.childLivingWithParents === "Yes"} onChange={() => updateField(["childLivingWithParents"], "Yes")} /> Yes</label>
                  <label><input type="radio" checked={form.childLivingWithParents === "No"} onChange={() => updateField(["childLivingWithParents"], "No")} /> No</label>
                </div>
              </div>
              <div className="field88 photo-field88">
                <label>Upload Child’s Image</label>
                <div className="upload-tile88">
                  <div className="photo-preview88">
                    {photoPreview ? (
                      <img src={photoPreview} alt="preview" />
                    ) : form.photo ? (
                      <img src={URL.createObjectURL(form.photo)} alt="preview" />
                    ) : (
                      <span>No image</span>
                    )}
                  </div>
                  <label className="ghost-btn88">
                    Upload
                    <input type="file" hidden onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        updateField(["photo"], file);
                        setPhotoPreview(URL.createObjectURL(file));
                      }
                    }} />
                  </label>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. Parent Details */}
        {activeTab === "Parent Details" && (
          <div className="parent-details-container88">
            <section className="section-card88">
              <header className="section-heading88">
                <h3>➤ Father’s Details</h3>
              </header>
              <div className="grid88 two-col88">
                <div className="field88">
                  <label>Father’s Name</label>
                  <input value={form.father.name} onChange={(e) => updateField(["father", "name"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Father’s Email</label>
                  <input value={form.father.email} onChange={(e) => updateField(["father", "email"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Father’s UID</label>
                  <input value={form.father.uid} onChange={(e) => updateField(["father", "uid"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Qualification</label>
                  <input value={form.father.qualification} onChange={(e) => updateField(["father", "qualification"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Occupation</label>
                  <input value={form.father.occupation} onChange={(e) => updateField(["father", "occupation"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Annual Income</label>
                  <input value={form.father.annualIncome} onChange={(e) => updateField(["father", "annualIncome"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Office Contact</label>
                  <input value={form.father.officeContact} onChange={(e) => updateField(["father", "officeContact"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Office Address</label>
                  <input value={form.father.officeAddress} onChange={(e) => updateField(["father", "officeAddress"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Is School Employee?</label>
                  <div className="radio-group88" style={{ display: "flex", gap: "15px" }}>
                    <label><input type="radio" checked={form.father.isSchoolEmployee === "Yes"} onChange={() => updateField(["father", "isSchoolEmployee"], "Yes")} /> Yes</label>
                    <label><input type="radio" checked={form.father.isSchoolEmployee === "No"} onChange={() => updateField(["father", "isSchoolEmployee"], "No")} /> No</label>
                  </div>
                </div>
                <div className="field88 photo-field88">
                  <label>Upload Father’s Image</label>
                  <div className="upload-tile88">
                    <div className="photo-preview88">
                      {fatherPhotoPreview ? (
                        <img src={fatherPhotoPreview} alt="preview" />
                      ) : form.father.photo ? (
                        <img src={URL.createObjectURL(form.father.photo)} alt="preview" />
                      ) : (
                        <span>No image</span>
                      )}
                    </div>
                    <label className="ghost-btn88">
                      Upload
                      <input type="file" hidden onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          updateField(["father", "photo"], file);
                          setFatherPhotoPreview(URL.createObjectURL(file));
                        }
                      }} />
                    </label>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-card88" style={{ marginTop: "20px" }}>
              <header className="section-heading88">
                <h3>➤ Mother’s Details</h3>
              </header>
              <div className="grid88 two-col88">
                <div className="field88">
                  <label>Mother’s Name</label>
                  <input value={form.mother.name} onChange={(e) => updateField(["mother", "name"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Mother’s Email</label>
                  <input value={form.mother.email} onChange={(e) => updateField(["mother", "email"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Mother’s UID</label>
                  <input value={form.mother.uid} onChange={(e) => updateField(["mother", "uid"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Qualification</label>
                  <input value={form.mother.qualification} onChange={(e) => updateField(["mother", "qualification"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Occupation</label>
                  <input value={form.mother.occupation} onChange={(e) => updateField(["mother", "occupation"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Annual Income</label>
                  <input value={form.mother.annualIncome} onChange={(e) => updateField(["mother", "annualIncome"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Office Contact</label>
                  <input value={form.mother.officeContact} onChange={(e) => updateField(["mother", "officeContact"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Office Address</label>
                  <input value={form.mother.officeAddress} onChange={(e) => updateField(["mother", "officeAddress"], e.target.value)} />
                </div>
                <div className="field88 photo-field88">
                  <label>Upload Mother’s Image</label>
                  <div className="upload-tile88">
                    <div className="photo-preview88">
                      {motherPhotoPreview ? (
                        <img src={motherPhotoPreview} alt="preview" />
                      ) : form.mother.photo ? (
                        <img src={URL.createObjectURL(form.mother.photo)} alt="preview" />
                      ) : (
                        <span>No image</span>
                      )}
                    </div>
                    <label className="ghost-btn88">
                      Upload
                      <input type="file" hidden onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          updateField(["mother", "photo"], file);
                          setMotherPhotoPreview(URL.createObjectURL(file));
                        }
                      }} />
                    </label>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 4. Last Education Details */}
        {activeTab === "Last Education Details" && (
          <section className="section-card88">
            <header className="section-heading88">
              <h3>🔹 4. Last Education Details</h3>
            </header>
            <div className="grid88 two-col88">
              <div className="field88">
                <label>Last School Name</label>
                <input value={form.previousSchool.name} onChange={(e) => updateField(["previousSchool", "name"], e.target.value)} />
              </div>
              <div className="field88">
                <label>Last Class</label>
                <input value={form.previousSchool.lastClass} onChange={(e) => updateField(["previousSchool", "lastClass"], e.target.value)} />
              </div>
              <div className="field88">
                <label>Medium</label>
                <div className="radio-group88" style={{ display: "flex", gap: "15px" }}>
                  <label><input type="radio" checked={form.previousSchool.medium === "English"} onChange={() => updateField(["previousSchool", "medium"], "English")} /> English</label>
                  <label><input type="radio" checked={form.previousSchool.medium === "Hindi"} onChange={() => updateField(["previousSchool", "medium"], "Hindi")} /> Hindi</label>
                </div>
              </div>
              <div className="field88">
                <label>Result</label>
                <input value={form.previousSchool.result} onChange={(e) => updateField(["previousSchool", "result"], e.target.value)} />
              </div>
              <div className="field88">
                <label>Board</label>
                <input value={form.previousSchool.board} onChange={(e) => updateField(["previousSchool", "board"], e.target.value)} />
              </div>
              <div className="field88">
                <label>% Age</label>
                <input value={form.previousSchool.percentage} onChange={(e) => updateField(["previousSchool", "percentage"], e.target.value)} />
              </div>
              <div className="field88">
                <label>Reason To Leave</label>
                <input value={form.previousSchool.reasonToLeave} onChange={(e) => updateField(["previousSchool", "reasonToLeave"], e.target.value)} />
              </div>
              <div className="field88">
                <label>TC Date</label>
                <input type="date" value={form.previousSchool.tcDate} onChange={(e) => updateField(["previousSchool", "tcDate"], e.target.value)} />
              </div>
            </div>
          </section>
        )}

        {/* 5. Health Details */}
        {activeTab === "Health Details" && (
          <section className="section-card88">
            <header className="section-heading88">
              <h3>🔹 5. Health Details</h3>
            </header>
            <div className="grid88 two-col88">
              <div className="field88">
                <label>Height (in cm)</label>
                <input value={form.health.height} onChange={(e) => updateField(["health", "height"], e.target.value)} />
              </div>
              <div className="field88">
                <label>Weight (Kg / Gm)</label>
                <input value={form.health.weight} onChange={(e) => updateField(["health", "weight"], e.target.value)} />
              </div>
              <div className="field88">
                <label>Eyes (Left / Right)</label>
                <input value={form.health.eyes} onChange={(e) => updateField(["health", "eyes"], e.target.value)} />
              </div>
              <div className="field88">
                <label>Blood Group</label>
                <select value={form.health.bloodGroup} onChange={(e) => updateField(["health", "bloodGroup"], e.target.value)}>
                  <option value="">Select</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>
        )}

        {/* 6. Guardian Details */}
        {activeTab === "Guardian Details" && (
          <div className="guardian-details-container88">
            <section className="section-card88">
              <header className="section-heading88">
                <h3>➤ Guardian Details 1</h3>
              </header>
              <div className="grid88 two-col88">
                <div className="field88">
                  <label>Name of Guardian</label>
                  <input value={form.guardian.name} onChange={(e) => updateField(["guardian", "name"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Relation</label>
                  <input value={form.guardian.relation} onChange={(e) => updateField(["guardian", "relation"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Occupation</label>
                  <input value={form.guardian.occupation} onChange={(e) => updateField(["guardian", "occupation"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Contact Number</label>
                  <input value={form.guardian.mobile} onChange={(e) => updateField(["guardian", "mobile"], e.target.value)} />
                </div>
                <div className="field88 full88">
                  <label>Address</label>
                  <textarea rows={2} value={form.guardian.address} onChange={(e) => updateField(["guardian", "address"], e.target.value)} />
                </div>
                <div className="field88 photo-field88">
                  <label>Upload First Guardian’s Image</label>
                  <div className="upload-tile88">
                    <div className="photo-preview88">
                      {guardianPhotoPreview ? (
                        <img src={guardianPhotoPreview} alt="preview" />
                      ) : form.guardian.photo ? (
                        <img src={URL.createObjectURL(form.guardian.photo)} alt="preview" />
                      ) : (
                        <span>No image</span>
                      )}
                    </div>
                    <label className="ghost-btn88">
                      Upload
                      <input type="file" hidden onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          updateField(["guardian", "photo"], file);
                          setGuardianPhotoPreview(URL.createObjectURL(file));
                        }
                      }} />
                    </label>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-card88" style={{ marginTop: "20px" }}>
              <header className="section-heading88">
                <h3>➤ Guardian Details 2</h3>
              </header>
              <div className="grid88 two-col88">
                <div className="field88">
                  <label>Name of Guardian</label>
                  <input value={form.guardian2.name} onChange={(e) => updateField(["guardian2", "name"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Relation</label>
                  <input value={form.guardian2.relation} onChange={(e) => updateField(["guardian2", "relation"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Occupation</label>
                  <input value={form.guardian2.occupation} onChange={(e) => updateField(["guardian2", "occupation"], e.target.value)} />
                </div>
                <div className="field88">
                  <label>Contact Number</label>
                  <input value={form.guardian2.mobile} onChange={(e) => updateField(["guardian2", "mobile"], e.target.value)} />
                </div>
                <div className="field88 full88">
                  <label>Address</label>
                  <textarea rows={2} value={form.guardian2.address} onChange={(e) => updateField(["guardian2", "address"], e.target.value)} />
                </div>
                <div className="field88 photo-field88">
                  <label>Upload Second Guardian’s Image</label>
                  <div className="upload-tile88">
                    <div className="photo-preview88">
                      {guardian2PhotoPreview ? (
                        <img src={guardian2PhotoPreview} alt="preview" />
                      ) : form.guardian2.photo ? (
                        <img src={URL.createObjectURL(form.guardian2.photo)} alt="preview" />
                      ) : (
                        <span>No image</span>
                      )}
                    </div>
                    <label className="ghost-btn88">
                      Upload
                      <input type="file" hidden onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          updateField(["guardian2", "photo"], file);
                          setGuardian2PhotoPreview(URL.createObjectURL(file));
                        }
                      }} />
                    </label>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        <div className="admission-actions88">
          <button type="submit" className="primary-btn88">
            {isEdit ? "Update Enrollment" : "Complete Admission"}
          </button>
          <button type="button" onClick={saveDraft} className="secondary-btn88">
            Save Draft
          </button>
          <button type="button" onClick={resetForm} className="ghost-btn88">
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentAdmissionForm;