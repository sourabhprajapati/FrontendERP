import React, { useEffect, useState } from "react";
import "./StudentBirthday.css";

const templates = [
  "🎉 Happy Birthday, dear {name}! Wishing you a year filled with joy, success, and countless blessings.",
  "🎂 Many many happy returns of the day, {name}! May this year bring you closer to all your dreams.",
  "🌟 Happy Birthday {name}! Keep shining bright like the star you are! ✨",
  "🎈 Warmest birthday wishes to {name}! May your day be as wonderful as you are.",
  "🥳 Happy Birthday {name}! Here's to another amazing year ahead!",
];

const StudentBirthdayList = () => {
  const baseURL = "http://localhost:5000";
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");

  const [showWish, setShowWish] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${baseURL}/api/students`);
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Failed to load students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((s) => {
    const b = s.basic || {};
    const nameMatch = b.name?.toLowerCase().includes(search.toLowerCase());
    const classMatch = !classFilter || b.class === classFilter;
    const sectionMatch = !sectionFilter || b.section === sectionFilter;
    return nameMatch && classMatch && sectionMatch;
  });

  const uniqueClasses = [
    ...new Set(students.map((s) => s.basic?.class).filter(Boolean)),
  ].sort((a, b) => a - b);

  const openWishModal = (student) => {
    // Only allow wishes on the student's birthday
    if (!isBirthdayToday(student.basic?.dob)) return;

    setSelectedStudent(student);
    const name = student.basic?.name || "Student";
    const defaultMsg = templates[0].replace("{name}", name);
    setMessage(defaultMsg);
    setSent(false);
    setShowWish(true);
  };

  const sendWish = () => {
    if (!message.trim()) return;

    // Replace with actual student/parent mobile when integrated
    const testPhone = "8302124447"; // Change to real number or integrate API

    const text = encodeURIComponent(message.trim());
    const whatsappUrl = `https://wa.me/${testPhone}?text=${text}`;
    window.open(whatsappUrl, "_blank");

    setSent(true);
  };

  const getAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const isBirthdayToday = (dob) => {
    if (!dob) return false;
    const birthDate = new Date(dob);
    const today = new Date();
    return (
      birthDate.getDate() === today.getDate() &&
      birthDate.getMonth() === today.getMonth()
    );
  };

  if (loading) {
    return <div className="loading-premium">Loading birthday list...</div>;
  }

  return (
    <div className="birthday-container-premium">
      <div className="birthday-card-premium">
        {/* Header */}
        <div className="header-premium">
          <div className="title-section-premium">
            <h1>Students Birthday List 🎉</h1>
            <p>Celebrate every special day with warm wishes</p>
          </div>
          <div className="count-badge-premium">
            Total: <strong>{filteredStudents.length}</strong> students
          </div>
        </div>

        {/* Filters */}
        <div className="filters-premium">
          <div className="search-box-premium">
            <input
              type="text"
              placeholder="Search by student name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="search-icon-premium">🔍</span>
          </div>

          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="class-filter-premium"
          >
            <option value="">All Classes</option>
            {uniqueClasses.map((c) => (
              <option key={c} value={c}>
                Class {c}
              </option>
            ))}
          </select>

          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            className="section-filter-premium"
          >
            <option value="">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
            <option value="D">Section D</option>
          </select>
        </div>

        {/* Birthday List */}
        <div className="list-premium">
          {filteredStudents.length === 0 ? (
            <div className="empty-state-premium">
              <div className="empty-icon">🎂</div>
              <p>No students found</p>
            </div>
          ) : (
            filteredStudents.map((student) => {
              const b = student.basic || {};
              const dob = b.dob ? new Date(b.dob).toLocaleDateString("en-IN") : "—";
              const age = getAge(b.dob);
              const birthdayToday = isBirthdayToday(b.dob);

              return (
                <div key={student._id} className="birthday-item-premium">
                  <div className="student-info-premium">
                    <img
                      src={
                        b.photo
                          ? b.photo.startsWith("http")
                            ? b.photo
                            : `${baseURL}${b.photo}`
                          : "/placeholder-avatar.jpg"
                      }
                      alt={b.name}
                      className="avatar-premium"
                      onError={(e) => {
                        e.target.src = "/placeholder-avatar.jpg";
                      }}
                    />
                    <div className="details-premium">
                      <h3>{b.name || "Unknown"}</h3>
                      <p>
                        Class {b.class} {b.section && `- ${b.section}`} • Roll: {b.rollNo || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="dob-info-premium">
                    <span className="date-premium">🎂 {dob}</span>
                    {age !== null && <span className="age-premium">({age} years)</span>}
                    <span
                      className={`birthday-status-premium ${
                        birthdayToday ? "today" : "not-today"
                      }`}
                    >
                      {birthdayToday ? "Today 🎉" : "Not today"}
                    </span>
                  </div>

                  <button
                    className="wish-button-premium"
                    onClick={() => openWishModal(student)}
                    disabled={!birthdayToday}
                    title={birthdayToday ? "Send birthday wish" : "Available on the birthday"}
                  >
                    Send Wish 🎁
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Wish Modal */}
      {showWish && selectedStudent && (
        <div className="modal-overlay-premium" onClick={() => setShowWish(false)}>
          <div className="modal-premium" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn-premium"
              onClick={() => setShowWish(false)}
            >
              ✕
            </button>

            {!sent ? (
              <>
                <div className="modal-header-premium">
                  <h2>Send Birthday Wish</h2>
                  <p>To: <strong>{selectedStudent.basic?.name}</strong></p>
                </div>

                <div className="templates-premium">
                  {templates.map((template, i) => (
                    <div
                      key={i}
                      className="template-premium"
                      onClick={() =>
                        setMessage(
                          template.replace("{name}", selectedStudent.basic?.name || "Student")
                        )
                      }
                    >
                      {template.replace("{name}", selectedStudent.basic?.name || "Student")}
                    </div>
                  ))}
                </div>

                <textarea
                  className="message-box-premium"
                  placeholder="Or write your own custom message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="5"
                />

                <button
                  className="send-btn-premium"
                  onClick={sendWish}
                  disabled={!message.trim()}
                >
                  Send via WhatsApp 🚀
                </button>
              </>
            ) : (
              <div className="success-state-premium">
                <div className="success-icon">🎉</div>
                <h3>Wish Sent Successfully!</h3>
                <p>Your birthday message has been opened in WhatsApp.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentBirthdayList;