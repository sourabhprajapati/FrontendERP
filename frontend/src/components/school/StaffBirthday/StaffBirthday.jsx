import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StaffBirthday.css";

export default function StaffBirthday() {
  const [staffList, setStaffList] = useState([]);
  const [loadingStaff, setLoadingStaff] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  const [sending, setSending] = useState({}); // renamed from loading for clarity

  // Get schoolId from localStorage / context / props (change as per your auth)
  const schoolId =
    localStorage.getItem("schoolId") || "000000000000000000000001"; // ← IMPORTANT!

  const today = new Date().toISOString().slice(5, 10); // MM-DD

  // Fetch staff from backend on mount
  useEffect(() => {
    const fetchStaff = async () => {
      if (!schoolId) {
        setError("School ID not found. Please login again.");
        setLoadingStaff(false);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/staff/all?schoolId=${schoolId}` // ← change port/host if different
        );

        if (res.data.success) {
          // Map backend field names to frontend expectations
          const formatted = res.data.data.map((s, index) => ({
            id: s._id || index + 1,
            name: s.employeeName,
            dob: s.dob, // assume YYYY-MM-DD
            phone: s.mobile ? `+91${s.mobile}` : "", // add +91 if missing
            email: s.email || "",
          }));
          setStaffList(formatted);
        } else {
          setError(res.data.message || "Failed to load staff");
        }
      } catch (err) {
        setError(
          "Failed to connect to server. " +
            (err.response?.data?.message || err.message)
        );
      } finally {
        setLoadingStaff(false);
      }
    };

    fetchStaff();
  }, [schoolId]);

  const filtered = staffList.filter((s) => {
    const matchName = s.name?.toLowerCase().includes(search.toLowerCase());
    const matchMonth = month ? s.dob?.slice(5, 7) === month : true;
    return matchName && matchMonth;
  });

  const getReadableDate = (date) => {
    if (!date) return "—";
    const d = new Date(date);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

const sendRealSMS = async (staff) => {
    const { name, phone } = staff;

    if (!phone) {
      alert(`No phone number available for ${name}`);
      return;
    }

    // Clean phone number (remove + if API doesn't accept it)
    const mobileNumber = phone.startsWith("+") ? phone.slice(1) : phone;

    const isToday = staff.dob.slice(5, 10) === today;

    const message = isToday
      ? `Dear Staff Member, 
Wish You A Very Happy Birthday. May Life Lead You To Great Happiness, And Success. Enjoy Your Day!! 
${name}
 - MITTSURE`
      : `Hi ${name}, hope you're doing great! From your team.`;

    // ── IMPORTANT SETTINGS ──
    const authKey = "10e2527f282889eb9402c16d19360558"; // ← Put your real key
    const senderId = "MITTSU"; // e.g. "COMPANY"
    const route = "TR"; // TR = Transactional
    const template_id = "1207166927725168657"; // 19 digit template id (mandatory for DLT)
    const campaign_name = "Birthday Wishes"; // Your campaign name

    const postData = {
      campaign_name: campaign_name,
      auth_key: authKey,
      receivers: mobileNumber,
      sender: senderId,
      route: route,
      message: {
        msgdata: message,
        Template_ID: template_id,
        coding: "1", // 1 = English
      },
      scheduleTime: "", // leave empty if not scheduling
    };

    setSending((prev) => ({ ...prev, [staff.id]: true }));

    try {
      const response = await axios.post(
        "https://sms.bulksmsserviceproviders.com/api/send/sms",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("SMS Response:", response.data);

      // Inside the try block, replace the if condition with:
      if (
        response.data?.status?.toLowerCase() === "success" ||
        (response.data?.message || "").toLowerCase().includes("successfully")
      ) {
        alert(`SMS sent successfully to ${name}! 🎉`);
      } else {
        alert(`SMS sending failed!\n${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.error("SMS Error:", error.response?.data || error.message);
      alert(
        `Failed to send SMS to ${name}\n${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setSending((prev) => ({ ...prev, [staff.id]: false }));
    }
  };



  const handleSendEmail = (staff) => {
    // your existing email logic
  };

  if (loadingStaff)
    return <div className="bday-empty">Loading staff list...</div>;
  if (error)
    return (
      <div className="bday-empty" style={{ color: "red" }}>
        {error}
      </div>
    );

  return (
    <div className="bday-wrapper">
      <h2 className="bday-title">Staff Birthday</h2>

      <input
        className="bday-search"
        placeholder="Search staff..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="bday-month-select"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        style={{
          appearance: "none", // removes default arrow on some browsers
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'><polygon points='6,9 1,4 11,4' fill='%23008000'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
          paddingRight: "30px", // space for custom arrow
        }}
      >
        <option value="" disabled hidden>
          Filter by Month
        </option>{" "}
        {/* better placeholder */}
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>

      <div className="bday-list">
        {filtered.map((s) => {
          const isToday = s.dob?.slice(5, 10) === today;
          const isSending = sending[s.id];

          return (
            <div
              key={s.id}
              className={`bday-card ${isToday ? "bday-highlight" : ""}`}
            >
              <div>
                <h3>{s.name}</h3>
                <p>
                  Date of Birth: <span>{getReadableDate(s.dob)}</span>
                </p>
              </div>

              <div className="bday-card-actions">
                {isToday && <div className="bday-today-badge">Today!</div>}

                <button
                  className="bday-sms-btn"
                  onClick={() => sendRealSMS(s)}
                disabled={sending[s.id]}
                  style={{ opacity: isSending ? 0.6 : 1 }}
                >
                  {isSending ? "Sending..." : "Send SMS"}
                </button>

                <button
                  className="bday-email-btn"
                  onClick={() => handleSendEmail(s)}
                >
                  Send Email
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="bday-empty">No birthdays found.</p>
        )}
      </div>
    </div>
  );
}
