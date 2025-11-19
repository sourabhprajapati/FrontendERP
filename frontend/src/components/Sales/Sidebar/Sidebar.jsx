// Sidebar.jsx
import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom"; // Added useLocation
import './Sidebar.css';
import logo from '../../../assets/logo.jpg';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineAutorenew } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

const MENU_ITEMS = [
  { 
    name: "Add new School",
    icon: IoIosAddCircleOutline,
    path: "/Newschool"
  },
  { 
    name: "Renewal School", 
    icon: MdOutlineAutorenew, 
    path: "/Renewal" 
  },
  { 
    name: "Profile", 
    icon: CgProfile,
    path: "/Profile" // optional: add later if needed
  },
  { 
    name: "Reports", 
    icon: BsGraphUpArrow, 
    subItems: [
      { name: "Approved Request", icon: ChevronRight, path: "/ApproveRequest1" },
      { name: "Reject Request", icon: ChevronRight, path: "/Reject" },
      { name: "All School", icon: ChevronRight, path: "/reports/all" }, 
    ] 
  },
];

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("Reports"); // Open Reports by default (optional)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation(); // To close sidebar on route change

  // Close sidebar when clicking outside (mobile)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !e.target.closest(".nav-toggle-btn")
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isSidebarOpen]);

  // Auto-close sidebar on mobile when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Auto-hide mobile sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = (name) => {
    if (name === "Reports") {
      setActiveMenu(prev => prev === "Reports" ? null : "Reports");
    }
  };

  const isExpanded = (name) => name === "Reports" ? activeMenu === "Reports" : false;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="nav-toggle-btn"
        onClick={() => setIsSidebarOpen(prev => !prev)}
        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
      >
        <Menu size={28} />
      </button>

      {/* Backdrop */}
      <div
        className={`sidebar-backdrop ${isSidebarOpen ? "visible" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`mittsure-sidebar ${isSidebarOpen ? "sidebar-expanded" : ""}`}
      >
        {/* Logo */}
        <div className="sidebar-header">
          <img src={logo} alt="MittSure Logo" className="logo-image" />
        </div>

        {/* Navigation */}
        <nav className="sidebar-menu">
          {MENU_ITEMS.map((item) => {
            const expanded = isExpanded(item.name);

            return (
              <div key={item.name} className="menu-group">
                {/* Main Menu Item */}
                <motion.div
                  className={`menu-button ${expanded ? 'menu-active' : ''} ${item.subItems ? 'has-children' : ''}`}
                  onClick={() => !item.path && toggleMenu(item.name)}
                  whileHover={{ x: item.path || item.subItems ? 4 : 0 }}
                  whileTap={{ scale: item.path || item.subItems ? 0.98 : 1 }}
                >
                  {item.path ? (
                    <Link to={item.path} className="menu-link">
                      <div className="menu-content">
                        <item.icon size={20} className="menu-icon-left" />
                        <span className="menu-text">{item.name}</span>
                      </div>
                    </Link>
                  ) : (
                    <div className="menu-content">
                      <item.icon size={20} className="menu-icon-left" />
                      <span className="menu-text">{item.name}</span>
                    </div>
                  )}

                  {item.subItems && (
                    <motion.div
                      animate={{ rotate: expanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="dropdown-indicator"
                    >
                      <ChevronRight size={16} />
                    </motion.div>
                  )}
                </motion.div>

                {/* Submenu */}
                <AnimatePresence>
                  {item.subItems && expanded && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="submenu-list"
                    >
                      {item.subItems.map((subItem, index) => (
                        <motion.li
                          key={index}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          {subItem.path ? (
                            <Link to={subItem.path} className="submenu-item submenu-link">
                              {subItem.icon && <subItem.icon size={16} className="submenu-icon" />}
                              <span>{subItem.name}</span>
                            </Link>
                          ) : (
                            <div className="submenu-item">
                              {subItem.icon && <subItem.icon size={16} className="submenu-icon" />}
                              <span>{subItem.name}</span>
                            </div>
                          )}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;