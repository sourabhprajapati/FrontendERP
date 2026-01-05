import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome, FiUser, FiCalendar, FiBook, FiBookOpen,
  FiCheckSquare, FiClipboard, FiCreditCard, FiLogOut, FiMenu, FiX
} from "react-icons/fi";
import "./Sidebar.css";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: <FiHome /> },
  { to: "/st_studentdetails", label: "Student Details", icon: <FiUser /> },
  { to: "/St_classtimetable", label: "Class Timetable", icon: <FiCalendar /> },
  { to: "/subjects", label: "Subjects", icon: <FiBook /> },
  { to: "/homework", label: "Homework", icon: <FiBookOpen /> },
  { to: "/attendance", label: "Attendance", icon: <FiCheckSquare /> },
  { to: "/leaves", label: " Apply Leave", icon: <FiClipboard /> },
  { to: "/feedetails", label: "Fee Details", icon: <FiCreditCard /> },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleNav = () => setOpen(false);

  return (
    <>
      {/* Hamburger for small screens */}
      <button className="sidebar-hamburger13" onClick={() => setOpen(v => !v)}>
        {open ? <FiX /> : <FiMenu />}
      </button>

      <aside className={`sidebar13${open ? " open13" : ""}`}>
        <div className="sidebar-header13">
          <span className="sidebar-logo13">SP</span>
          <span className="sidebar-title13 mitt13">MITTSURE</span>
        </div>

        <nav className="sidebar-nav13">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link13 active13"
                  : "sidebar-link13"
              }
              end
              onClick={handleNav}
            >
              <span className="sidebar-icon13">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer13 last13">
          <NavLink
            to="/logout"
            className="sidebar-link13 logout13"
            onClick={handleNav}
          >
            <span className="sidebar-icon13">
              <FiLogOut />
            </span>
            Log Out
          </NavLink>
        </div>

        <div className="sidebar-footer13 copyright13">
          &copy; 2025 Student ERP
        </div>
      </aside>

      {open && (
        <div
          className="sidebar-overlay13"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
