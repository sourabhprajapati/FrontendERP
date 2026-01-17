import { useState, useEffect } from "react";
import axios from "axios";
import { FiCalendar, FiList, FiClock } from "react-icons/fi";
import "./St_ClassTimeTable.css";

const todayDate = new Date().toLocaleDateString("en-GB");

export default function StudentClassTimeTable() {
  const [mode, setMode] = useState("today");
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [weeklyTimetable, setWeeklyTimetable] = useState([]);
  const [todaySlots, setTodaySlots] = useState([]);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const student = {
        class: "3",
        section: "A",
        school: "60d5f3f77a5e4b3e8c8e8b3a",
      };

      const className = `${student.class}-${student.section}`.trim();

      const res = await axios.get(
        `http://localhost:5000/api/timetables/${student.school}/${className}`
      );

      const weekly = res.data.map((d) => ({
        day: d.day.trim(),
        slots: d.schedule.map((s) => ({
          time: s.time,
          subject: s.subject || "-",
          teacher: s.teacher || "",
        })),
      }));

      setWeeklyTimetable(weekly);

      const today = new Date().toLocaleString("en-GB", { weekday: "long" });
      const todayData = weekly.find((d) => d.day === today);
      setTodaySlots(todayData?.slots || []);
    } catch (err) {
      console.error("Failed to load timetable", err);
    }
  };

  let timetableData = [];
  if (mode === "weekly") timetableData = weeklyTimetable;
  else if (mode === "date") {
    const dayName = new Date(selectedDate).toLocaleString("en-GB", {
      weekday: "long",
    });
    const dayData = weeklyTimetable.find((d) => d.day === dayName);
    timetableData = [{ day: selectedDate, slots: dayData?.slots || [] }];
  } else timetableData = [{ day: "Today's Timetable", slots: todaySlots }];

  return (
    <div className="timetable-page">
      <h2 className="timetable-title">
        <FiClock /> Class Timetable
      </h2>

      {/* ===== CONTROLS ===== */}
      <div className="timetable-controls">
        <button
          className={`tt-btn ${mode === "weekly" ? "active" : ""}`}
          onClick={() => setMode("weekly")}
        >
          <FiList /> Weekly
        </button>

        <button
          className={`tt-btn ${mode === "today" ? "active" : ""}`}
          onClick={() => {
            setMode("today");
            setSelectedDate(todayDate);
          }}
        >
          <FiClock /> Today
        </button>

        <button
          className={`tt-btn ${mode === "date" ? "active" : ""}`}
          onClick={() => setMode("date")}
        >
          <FiCalendar /> By Date
        </button>

        {mode === "date" && (
          <input
            type="date"
            className="tt-date"
            onChange={(e) =>
              setSelectedDate(
                new Date(e.target.value).toLocaleDateString("en-GB")
              )
            }
          />
        )}
      </div>

      {/* ===== TIMETABLE ===== */}
      <div className="timetable-grid">
        {mode === "weekly" ? (
          <div className="tt-week-grid">
            {weeklyTimetable.length === 0 ? (
              <p>No timetable available</p>
            ) : (
              weeklyTimetable.map((dayData, i) => (
                <div key={i} className="tt-card">
                  <div className="tt-card-day">{dayData.day}</div>

                  {dayData.slots.length === 0 ? (
                    <p>No classes</p>
                  ) : (
                    <ul className="tt-slot-list">
                      {dayData.slots.map((slot, si) => (
                        <li key={si} className="tt-slot">
                          <span className="tt-time">{slot.time}</span>
                          <span className="tt-subject">{slot.subject}</span>
                          <span className="tt-teacher">{slot.teacher}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="tt-day-grid">
            {timetableData.map((dayData, i) => (
              <div key={i} className="tt-card tt-singlecard">
                <div className="tt-card-day">
                  {mode === "date" ? `Date: ${dayData.day}` : dayData.day}
                </div>

                {dayData.slots.length === 0 ? (
                  <p>No classes</p>
                ) : (
                  <ul className="tt-slot-list">
                    {dayData.slots.map((slot, si) => (
                      <li key={si} className="tt-slot">
                        <span className="tt-time">{slot.time}</span>
                        <span className="tt-subject">{slot.subject}</span>
                        <span className="tt-teacher">{slot.teacher}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
