// Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BarChart2, ChevronRight, ChevronsRight, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import './Sidebar.css';
import logo from '../../../assets/logo.jpg';

// Icons
import { BiSolidSchool } from "react-icons/bi";
import { HiOfficeBuilding } from "react-icons/hi";
import { MdAppSettingsAlt } from "react-icons/md";
import { FaSms } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { PiStudentBold } from "react-icons/pi";
import { HiAcademicCap } from "react-icons/hi";
import { MdCoPresent } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa";
import { IoCash } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";
import { PiExamFill } from "react-icons/pi";
import { GrDocumentTest } from "react-icons/gr";
import { CiCreditCard1 } from "react-icons/ci";
import { BiSolidCertification } from "react-icons/bi";
import { TbReportSearch } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { BiDetail } from "react-icons/bi";

const SIDEBAR_ITEMS = [
  { name: "Dashboard", icon: BarChart2, path: "/schoolHome" },
  {
    name: "School Info",
    icon: BiSolidSchool,
    subItems: [
      { name: "School Information", icon: ChevronsRight, path: "/schoolInfo" },
      // { name: "School Document", icon: ChevronsRight, path: "/Document" },
      { name: "Bank Information", icon: ChevronsRight, path: '/BankDetail' },
    ],
  },
  {
    name: "Front Office",
    icon: HiOfficeBuilding,
    subItems: [
      { name: "Admission Enquiry", icon: ChevronsRight,path: "/AdmissionEnquiry" },
      { name: "Visitor Enquiry", icon: ChevronsRight, path: "/Visitors" },
      { name: "Complain Enquiry", icon: ChevronsRight, path: "/ComplaintForm" },
      { name: "Concession Request", icon: ChevronsRight , path: "/ConcessionsForm"},
      { name: "All Enquiry", icon: ChevronsRight, path: "/Enquiry" },
    ],
  },
  // {
  //   name: "Manage App",
  //   icon: MdAppSettingsAlt,
  //   subItems: [
  //     { name: "View Digital Content", icon: ChevronsRight },
  //     { name: "Online Exam Guide", icon: ChevronsRight },
  //     { name: "Online Exam", icon: ChevronsRight },
  //     { name: "Online Exam result", icon: ChevronsRight },
  //     { name: "Gallery", icon: ChevronsRight },
  //     { name: "Add Online Session", icon: ChevronsRight },
  //     { name: "View Online Session", icon: ChevronsRight },
  //     { name: "View Mitt Online Chat", icon: ChevronsRight },
  //     { name: "Homework", icon: ChevronsRight },
  //     { name: "Manual / Notes", icon: ChevronsRight },
  //     { name: "Syllabus", icon: ChevronsRight },
  //     { name: "Student Leave Request", icon: ChevronsRight },
  //   ],
  // },
 
  {
    name: "Staff info",
    icon: IoPeople,
    subItems: [
      { name: "Staff Attendance", icon: ChevronsRight, path: "/StaffAttendance" },
      { name: "Add Employee", icon: ChevronsRight , path: "/Staff"},
      { name: "Edit/View Employee", icon: ChevronsRight , path: "/EditEmployee"},
      { name: "Assign ClassTeacher", icon: ChevronsRight,path: "/AssignClassTeacher" },
      { name: "Edit/View ClassTeacher", icon: ChevronsRight,path: "/EditClassTeacher" },
      { name: "Staff Birthday", icon: ChevronsRight,path: "/StaffBirthday" },
      { name: "Staff anniversary", icon: ChevronsRight,path: "/StaffAnniversary" },
      { name: "Apply Leave", icon: ChevronsRight,path: "/ApplyLeave" },
      { name: "All Leave request", icon: ChevronsRight , path: "/AllLeaveRequests"},
      { name: "Inactive Report", icon: ChevronsRight,path: "/InactiveReport" },
    ],
  },
  {
    name: "Student info",
    icon: PiStudentBold,
    subItems: [
      { name: "Add Student", icon: ChevronsRight,  path: "/StudentAdmissionForm"},
      { name: "Edit/View Students", icon: ChevronsRight,path: "/StudentDetails" },
      { name: "Student Performance", icon: ChevronsRight },
      { name: "Class/Section Transfer", icon: ChevronsRight },
      { name: "Update roll number", icon: ChevronsRight },
      { name: "Students Birthday", icon: ChevronsRight },
      { name: "Documents", icon: ChevronsRight },
      { name: "Student promotion", icon: ChevronsRight },
      { name: "Student ExtraValues", icon: ChevronsRight },
      { name: "Student Attendance", icon: ChevronsRight ,path: "/StudentAttendance"},
    ],
  },
  {
    name: "Academics",
    icon: HiAcademicCap,
    subItems: [
      { name: "Class Master", icon: ChevronsRight },
      { name: "Subject Master", icon: ChevronsRight },
    ],
  },
  {
    name: "Attendance",
    icon: MdCoPresent,
    subItems: [
      { name: "Student Attendance", icon: ChevronsRight,path: "/StudentAttendance" },
      { name: "Student Leave", icon: ChevronsRight, path: "/StudentLeave" },
      { name: "Attendance Report", icon: ChevronsRight, path: "/AttendanceReport" },
    ],
  },
  {
    name: "Time table",
    icon: FaBusinessTime,
    subItems: [
      { name: "Settings", icon: ChevronsRight , path: "/Settings"},
      { name: "Class TimeTable", icon: ChevronsRight,path: "/ClassTimeTable" },
      { name: "Teacher TimeTable", icon: ChevronsRight,path: "/TeacherTimeTable" },
    ],
  },
  {
    name: "Fee Collection",
    icon: IoCash,
    subItems: [
      { name: "Collect Fee", icon: ChevronsRight,  path: "/CollectFee" },
      // { name: "Payment Receipt", icon: ChevronsRight ,path: "/PaymentReceipt"},
      { name: "Cheque", icon: ChevronsRight, path: "/Cheques" },
      // { name: "Demand Notice", icon: ChevronsRight },
      // { name: "Fee Setting", icon: ChevronsRight },
    ],
  },
  // External Links - Open in new tab
  {
    name: "Digital Content",
    icon: FaVideo,
    url: "https://mittlearn.com",
  },
  {
    name: "Lesson Plan",
    icon: MdPlayLesson,
    url: "https://mittlearn.com",
  },
  {
    name: "Exam Master",
    icon: PiExamFill,
    subItems: [
      { name: "Semester/Term Master", icon: ChevronsRight, path: "/AddSemester" },
      { name: "Exam Setting", icon: ChevronsRight ,path: "/ExamSetting"},
    ],
  },
  { name: "TPG", icon: GrDocumentTest },
  {
    name: "Admit Card",
    icon: CiCreditCard1,
    subItems: [
      { name: "Add admit Card", icon: ChevronsRight, path: "/AdmitCard" },
      // { name: "View/Print admit card", icon: ChevronsRight },
    ],
  },
  {
    name: "Certificates",
    icon: BiSolidCertification,
    subItems: [
      { name: "StudentCertificate", icon: ChevronsRight,path: "/StudentCertificate" },
      { name: "StaffCertificate", icon: ChevronsRight ,path: "/StaffCertificate"},
      { name: " Student Id", icon: ChevronsRight, path: "/StudentId" },
      { name: "Staff Id", icon: ChevronsRight ,path: "/StaffId"},
      // { name: "Fee Setting Cancel TC report", icon: ChevronsRight },
      // { name: "Previous Session", icon: ChevronsRight },
      // { name: "Sports Certificates", icon: ChevronsRight },
    ],
  },
  {
    name: "Reports",
    icon: TbReportSearch,
    subItems: [
      { name: "Graphical Report", icon: ChevronsRight },
      { name: "General Report", icon: ChevronsRight },
      { name: "Student Report", icon: ChevronsRight },
      { name: "Transport Report", icon: ChevronsRight },
      { name: "Fee Report", icon: ChevronsRight },
      { name: "SMS Report", icon: ChevronsRight },
    ],
  },
  {
    name: "Session Wise Details",
    icon: BiDetail,
    subItems: [
      { name: "Session Wise Attendance Record", icon: ChevronsRight,path: "/PreviousAttendanceRecord" },
      { name: "Session Wise Student Fee Collection Report", icon: ChevronsRight ,path: "/PreviousFeeRecord"},
    ],
  },
  {
    name: "Settings",
    icon: IoSettings,
    subItems: [
      { name: "Permission Setting", icon: ChevronsRight,path: "/PermissionSetting" },
      { name: "Auto Message Setting", icon: ChevronsRight,path: "/MessageSettings" },
      { name: "Student Master", icon: ChevronsRight , path: "/StudentLoginCredential"},
      { name: "Staff Master", icon: ChevronsRight ,path: "/StaffLogin"},
    ],
  },
   {
    name: "SMS",
    icon: FaSms,
    subItems: [
      { name: "Communication Guide", icon: ChevronsRight },
      { name: "Message Packs", icon: ChevronsRight },
      { name: "Group Message", icon: ChevronsRight },
      { name: "Random Message", icon: ChevronsRight },
      { name: "Class Wise Message", icon: ChevronsRight },
      { name: "Student Wise Message", icon: ChevronsRight },
      { name: "Staff Communication", icon: ChevronsRight },
      { name: "Enquiry Communication", icon: ChevronsRight },
      { name: "Root Wise Message", icon: ChevronsRight },
    ],
  },
];

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className="sidebar">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" className="logo-icon" />
      </div>

      {/* Sidebar Navigation */}
      <nav className="sidebar-nav">
        {SIDEBAR_ITEMS.map((item) => (
          <div key={item.name} className="menu-item-wrapper">
            {/* Case 1: Internal Route */}
            {item.path && (
              <motion.div
                className={`menu-item ${item.subItems ? 'has-submenu' : ''}`}
                onClick={() => item.subItems && setOpenDropdown(openDropdown === item.name ? null : item.name)}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `flex items-center w-full ${isActive ? 'active' : ''}`}
                >
                  <item.icon size={20} className="menu-icon" />
                  <span className="menu-label">{item.name}</span>
                </NavLink>
                {item.subItems && (
                  <motion.div
                    className="submenu-arrow"
                    animate={{ rotate: openDropdown === item.name ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight size={16} />
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Case 2: External URL (mittlearn.com) */}
            {item.url && (
              <motion.a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="menu-item"
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <item.icon size={20} className="menu-icon" />
                  <span className="menu-label">{item.name}</span>
                </div>
                <ExternalLink size={14} className="ml-2 opacity-70" />
              </motion.a>
            )}

            {/* Case 3: Dropdown Menu (no path, has subItems) */}
            {!item.path && !item.url && (
              <motion.div
                className={`menu-item ${openDropdown === item.name ? 'active has-submenu' : ''} ${item.subItems ? 'has-submenu' : ''}`}
                onClick={() => item.subItems && setOpenDropdown(openDropdown === item.name ? null : item.name)}
              >
                <div className="flex items-center">
                  <item.icon size={20} className="menu-icon" />
                  <span className="menu-label">{item.name}</span>
                </div>
                {item.subItems && (
                  <motion.div
                    className="submenu-arrow"
                    animate={{ rotate: openDropdown === item.name ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight size={16} />
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Submenu */}
            <AnimatePresence>
              {item.subItems && openDropdown === item.name && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="submenu"
                >
                  {item.subItems.map((subItem, index) => (
                    <li key={index}>
                      {subItem.path ? (
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) => `submenu-link ${isActive ? 'active' : ''}`}
                        >
                          {subItem.icon && <subItem.icon size={16} />}
                          <span>{subItem.name}</span>
                        </NavLink>
                      ) : (
                        <div className="submenu-link">
                          {subItem.icon && <subItem.icon size={16} />}
                          <span>{subItem.name}</span>
                        </div>
                      )}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;