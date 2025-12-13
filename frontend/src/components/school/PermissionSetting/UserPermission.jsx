//permissionsetting.jsx

import React, { useState, useMemo } from "react";
import {
  ChevronLeft, Shield, Users, CheckSquare,
  Building2, CreditCard, BookOpen, IdCard, Smartphone,
  Calendar, MessageSquare, HelpCircle, UserPlus, GraduationCap,
  FileText, Clock, Settings, Archive, Printer, BarChart3,
  Check, X, Search, Save, RotateCcw
} from "lucide-react";

import "./PermissionSetting.css";

/* ================= MODULE DATA ================= */

const PERMISSION_MODULES = [
  { id: "hostel", name: "Hostel", icon: Building2, permissions: ["Hostel"] },
  { id: "fee", name: "Instalment Fee Collection", icon: CreditCard, permissions: ["Instalment Fee Collection"] },
  { id: "lesson", name: "Lesson Plan", icon: BookOpen, permissions: ["Menu Lesson Plan", "Daily Lesson Plan", "Unit Daily Plan"] },
  { id: "admit", name: "Manage Admit Card", icon: IdCard, permissions: ["Add Admit Card", "Edit Admit Card", "Print Admit Card"] },
  {
    id: "app", name: "Manage App", icon: Smartphone,
    permissions: [
      "Add eLearning", "View eLearning", "Delete Learn", "Delete Learn Report",
      "Gallery", "Marks Work Notice", "Notes", "Contact Push Notifi",
      "Updates", "Video Syllabus", "View/Edit Gallery",
      "Notice Board Images", "Directory", "Add Calendar", "Video Gallery",
      "View/Edit Homework", "Add WhatsApp/Zoom Meeting", "View WhatsApp/Zoom Meeting"
    ]
  },
  { id: "attendance", name: "Manage Attendance", icon: Calendar, permissions: ["Mark Attendance"] },
  {
    id: "communication", name: "Manage Communication", icon: MessageSquare,
    permissions: [
      "Message Template", "Group Message", "Random Message", "Class Wise Message",
      "Staff Communication", "Route Wise Message", "Student Misc Message", "Enquiry Communication"
    ]
  },
  { id: "enquiry", name: "Manage Enquiry", icon: HelpCircle, permissions: ["Add Enquiry", "Show Enquiry"] },
  {
    id: "staff", name: "Manage Staff", icon: UserPlus,
    permissions: ["Add Class Teacher", "Edit Class Teacher", "Apply Leave", "Leave Requests", "Half Leave Report", "Staff Enquiry", "Add Employee", "Edit Employee"]
  },
  {
    id: "student", name: "Manage Student", icon: GraduationCap,
    permissions: [
      "Exam Student", "Class Transfer", "Manage PPMC/AQ Rules", "View Performance",
      "Add Student", "Transfer Details", "Student Roll No",
      "Class Promotion", "Generate/Rename", "Edit Generate Allocate"
    ]
  },
  { id: "tc", name: "Manage TC", icon: FileText, permissions: ["Edit View", "SIc, Struck Off", "TC Generate"] },
  {
    id: "timetable", name: "Manage Timetable", icon: Clock,
    permissions: ["Timetable Setting", "Print Timetable", "My Timetable", "Generate Timetable", "Individual Timetable"]
  },
  {
    id: "master", name: "Master Settings", icon: Settings,
    permissions: [
      "Auto Message Setting", "Change Password", "Caste Master", "Leave Master",
      "Test Paper Generator", "Late Master", "School Advertising",
      "Transport Master", "Sms Engine", "Pass/Detain Setting", "Student Updates"
    ]
  },
  { id: "previous", name: "Previous Session", icon: Archive, permissions: ["Previous Attendance Report", "Previous Exam Report"] },
  {
    id: "print", name: "Print Document", icon: Printer,
    permissions: [
      "Print Marksheet", "Tuition Fee Certificate", "Birth/Health/Bank Certificate",
      "Exam Marks + Stock", "Detailed Marks", "Admission Certificate",
      "Student Sche/Values", "Student Overall Performance", "Marks Remark", "Generate Rank"
    ]
  },
  {
    id: "reports", name: "Reports", icon: BarChart3,
    permissions: ["Graphical Reports", "General Reports", "Stock Reports", "SC Reports", "Transport Reports", "Interview Report"]
  }
];

const ROLE_TYPES = [
  { value: "", label: "Select Role..." },
  { value: "admin", label: "Admin" },
  { value: "principal", label: "Principal" },
  { value: "teacher", label: "Teacher" },
  { value: "class_teacher", label: "Class Teacher" },
  { value: "accountant", label: "Accountant" },
  { value: "librarian", label: "Librarian" },
  { value: "receptionist", label: "Receptionist" },
  { value: "transport", label: "Transport Manager" },
  { value: "hostel", label: "Hostel Warden" }
];

/* ================= MODULE CARD ================= */

const ModuleCard = ({
  module,
  selectedPermissions,
  onTogglePermission,
  onSelectAllModule,
  isModuleFullySelected,
  isModulePartiallySelected
}) => {
  const Icon = module.icon;

  return (
    <div className="perm-module-card">
      <div className="perm-module-header">
        <button
          className={`perm-module-checkbox ${isModuleFullySelected ? "checked" : ""} ${isModulePartiallySelected ? "partial" : ""}`}
          onClick={() => onSelectAllModule(module.id)}
        >
          {isModuleFullySelected && <Check size={14} />}
          {isModulePartiallySelected && !isModuleFullySelected && <div className="partial-indicator" />}
        </button>

        <div className="perm-module-icon"><Icon size={18} /></div>
        <h3 className="perm-module-title">{module.name}</h3>

        <span className="perm-module-count">
          {module.permissions.filter(p => selectedPermissions.has(`${module.id}:${p}`)).length}
          /{module.permissions.length}
        </span>
      </div>

      <div className="perm-permissions-grid">
        {module.permissions.map(permission => {
          const key = `${module.id}:${permission}`;
          const isSelected = selectedPermissions.has(key);

          return (
            <label key={key} className={`perm-permission-item ${isSelected ? "selected" : ""}`}>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onTogglePermission(module.id, permission)}
              />
              <span className={`perm-checkbox-custom ${isSelected ? "checked" : ""}`}>
                {isSelected && <Check size={12} />}
              </span>
              <span>{permission}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */

export default function UserPermission() {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const totalPermissions = useMemo(
    () => PERMISSION_MODULES.reduce((acc, m) => acc + m.permissions.length, 0),
    []
  );

  const filteredModules = useMemo(() => {
    if (!searchQuery) return PERMISSION_MODULES;
    const q = searchQuery.toLowerCase();
    return PERMISSION_MODULES.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.permissions.some(p => p.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const togglePermission = (moduleId, permission) => {
    const key = `${moduleId}:${permission}`;
    const newSet = new Set(selectedPermissions);
    newSet.has(key) ? newSet.delete(key) : newSet.add(key);
    setSelectedPermissions(newSet);
  };

  const selectAllModule = (moduleId) => {
    const module = PERMISSION_MODULES.find(m => m.id === moduleId);
    if (!module) return;

    const keys = module.permissions.map(p => `${moduleId}:${p}`);
    const allSelected = keys.every(k => selectedPermissions.has(k));

    const newSet = new Set(selectedPermissions);
    keys.forEach(k => allSelected ? newSet.delete(k) : newSet.add(k));
    setSelectedPermissions(newSet);
  };

  const selectAll = () => {
    const allKeys = PERMISSION_MODULES.flatMap(m =>
      m.permissions.map(p => `${m.id}:${p}`)
    );
    setSelectedPermissions(new Set(allKeys));
  };

  const deselectAll = () => setSelectedPermissions(new Set());

  return (
    <div className="perm-page">

      {/* HEADER */}
      <header className="perm-header">
        <button onClick={() => window.history.back()} className="perm-back-btn">
          <ChevronLeft size={18} /> BACK
        </button>
        <h1><Shield size={24} /> User Permission Management</h1>
      </header>

      {/* STATS */}
      <div className="perm-stats-grid">
        <div className="perm-stat-card blue">Total Roles: {ROLE_TYPES.length - 1}</div>
        <div className="perm-stat-card green">Selected: {selectedPermissions.size}</div>
        <div className="perm-stat-card purple">Modules: {filteredModules.length}</div>
        <div className="perm-stat-card orange">Total Permissions: {totalPermissions}</div>
      </div>

      {/* CONTROLS */}
      <div className="perm-controls-card">
        <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
          {ROLE_TYPES.map(role => (
            <option key={role.value} value={role.value}>{role.label}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <button onClick={selectAll}>Select All</button>
        <button onClick={deselectAll}>Clear</button>
      </div>

      {/* MODULES */}
      <div className="perm-modules-grid">
        {filteredModules.map(module => (
          <ModuleCard
            key={module.id}
            module={module}
            selectedPermissions={selectedPermissions}
            onTogglePermission={togglePermission}
            onSelectAllModule={selectAllModule}
            isModuleFullySelected={module.permissions.every(p => selectedPermissions.has(`${module.id}:${p}`))}
            isModulePartiallySelected={
              module.permissions.some(p => selectedPermissions.has(`${module.id}:${p}`)) &&
              !module.permissions.every(p => selectedPermissions.has(`${module.id}:${p}`))
            }
          />
        ))}
      </div>

    </div>
  );
}