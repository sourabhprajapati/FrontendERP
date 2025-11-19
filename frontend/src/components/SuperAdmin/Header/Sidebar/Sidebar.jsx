// Sidebar.jsx
import React, { useState } from "react";
import { BarChart2, ChevronRight, ChevronsRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import './Sidebar.css';
import logo from '../../../../assets/logo.jpg'; 
import { GrCloudSoftware } from "react-icons/gr";
import { MdViewModule } from "react-icons/md";
import { HiDocumentReport } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import { FaSchool } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { FaSms } from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { VscLayoutActivitybarRight } from "react-icons/vsc";
import { FaTable } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";
import { MdOutlineEmojiPeople } from "react-icons/md";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  { 
    name: "Dashboard", 
    icon: BarChart2, 
    path: "/superAdminDash"  
  },
  { 
    name: "Sales Executive",
    icon: MdOutlineEmojiPeople,
    subItems: [
      { name: "Add Sales Executive", path: "/addSalesExecutive", icon: ChevronsRight },
      { name: "View/Edit Sales Executive", icon: ChevronsRight },  
      { name: "School belong to SE", icon: ChevronsRight },
      { 
        name: "Login Master", 
        path: "/SalesExecutivePage",   // NEW LINK
        icon: ChevronsRight 
      },
    ]   
  },
  // ... rest unchanged
  { 
    name: "ERP Generator", 
    icon: GrCloudSoftware, 
    subItems: [
      { name: "Renew School", icon: ChevronsRight },
      { name: "Add new School", icon: ChevronsRight },
      { name: "School Module Permission", icon: ChevronsRight },
      { name: "Pending/Approve School", icon: ChevronsRight , path: "/Request"},
    ] 
  },
  { 
    name: "Module Permission", 
    icon: MdViewModule, 
    subItems: [
        { name: "Login Master for Admin",  path: "/MasterUserPage",  icon: ChevronsRight},
        { name: "Module Permission For Admin", icon: ChevronsRight},
        { name: "Active/Inactive Admin", icon: ChevronsRight},
    ] 
  },
  { 
    name: "School Report", 
    icon: HiDocumentReport, 
    subItems: [
        { name: "Detail report", icon: ChevronsRight},
        { name: "Active/Inactive report", icon: ChevronsRight}
    ] 
  },
  { 
    name: "Settings",
    icon: IoIosSettings,
    subItems: [
      { name: "Add State", icon: ChevronsRight },
      { name: "Add District", icon: ChevronsRight }, 
      { name: "Director Permission", icon: ChevronsRight },
      { name: "App Banner", icon: ChevronsRight }
    ]   
  },
  { 
    name: "School",
    icon: FaSchool,
    subItems: [
      { name: "Add School", icon: ChevronsRight },
      { name: "Active / Inactive Request", icon: ChevronsRight }, 
      { name: "Pending Renewal Request", icon: ChevronsRight },
      { name: "Change SMS Gateway", icon: ChevronsRight },
      { name: "Pending New Request", icon: ChevronsRight }, 
    ]   
  },
  { 
    name: "Services",
    icon: RiCustomerService2Fill,
    subItems: [
      { name: "Add Service Executive", icon: ChevronsRight},
      { name: "Executive Wise Schools", icon: ChevronsRight},  
      { name: "School Wise Exective", icon: ChevronsRight},
    ]   
  },
  { 
    name: "Notification", 
    icon: IoIosNotifications, 
    subItems: [
      { name: "To Admin / Teacher App", icon: ChevronsRight },
      { name: "To Student App", icon: ChevronsRight }, 
    ] 
  },
  { 
    name: "SMS", 
    icon: FaSms, 
    subItems: [
      { name: "Add Message Pack", icon: ChevronsRight }, 
      { name: "SMS Top Up", icon: ChevronsRight },
      { name: "Pocket SMS Recharge", icon: ChevronsRight },
      { name: "Add Message", icon: ChevronsRight }
    ] 
  },
  { name: "Lesson Plan", icon: MdPlayLesson },
  { name: "Digital Content", icon: FaVideo },
  { name: "Talent Box", icon: FaBoxOpen },
  { name: "DLT", icon: FaSms },
  { 
    name: "Activity", 
    icon: VscLayoutActivitybarRight, 
    subItems: [
      { name: "Add Activity", icon: ChevronsRight }, 
      { name: "View/Edit/ Delete Activity", icon: ChevronsRight },
      { name: "Activity Ordering", icon: ChevronsRight },
    ] 
  },
  { name: "Planner", icon: FaTable },
  { 
    name: "Reports", 
    icon: BiSolidReport, 
    subItems: [
        { name: "School Reports", icon: ChevronsRight},
        { name: "SMS Reports", icon: ChevronsRight },
    ] 
  },
  { 
    name: "School Report", 
    icon: HiDocumentReport, 
    subItems: [
      { name: "Date Wise Registration", icon: ChevronsRight }, 
    ] 
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
            
            {/* Main Menu Item */}
            {item.path ? (
              <Link
                to={item.path}
                className={`menu-item ${openDropdown === item.name ? 'active' : ''}`}
                onClick={() => setOpenDropdown(null)}
              >
                <div className="flex items-center">
                  <item.icon size={20} className="menu-icon" />
                  <span className="menu-label">{item.name}</span>
                </div>
              </Link>
            ) : (
              <motion.div
                className={`menu-item ${openDropdown === item.name ? 'active has-submenu' : (item.subItems ? 'has-submenu' : '')}`}
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
                        <Link
                          to={subItem.path}
                          className="submenu-link"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {subItem.icon && <subItem.icon size={16} className="text-gray-400" />}
                          <span>{subItem.name}</span>
                        </Link>
                      ) : (
                        <div className="submenu-link" style={{ cursor: "default", opacity: 0.7 }}>
                          {subItem.icon && <subItem.icon size={16} className="text-gray-400" />}
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