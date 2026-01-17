import React, { useState } from "react";
import "./ExamSetting.css";

import PeriodicTest from "./tabs/PeriodicTest";
import HeaderDetails from "./tabs/HeaderDetails";
import MarksDetails from "./tabs/MarksDetails";
import SubjectDetails from "./tabs/SubjectDetails";
import ExtraFieldDetails from "./tabs/ExtraFieldDetails";
import OtherFieldDetails from "./tabs/OtherFieldDetails";
import SignatureDetails from "./tabs/SignatureDetails";
import OtherDetails from "./tabs/OtherDetails";
import MarksheetDesign from "./tabs/MarksheetDesign";

const tabs = [
  "Periodic Test",
  "Header Details",
  "Marks Details",
  "Subject Details",
  "Extra Field Details",
  "Other Field Details",
  "Signature Details",
  "Other Details",
  "Marksheet Design",
];

export default function ExamSetting() {
  const [activeTab, setActiveTab] = useState("Periodic Test");
  const [showTabs, setShowTabs] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // ✅ EDIT MODE

  const renderTab = () => {
    const commonProps = { isEditMode };

    switch (activeTab) {
      case "Periodic Test":
        return <PeriodicTest {...commonProps} />;
      case "Header Details":
        return <HeaderDetails {...commonProps} />;
      case "Marks Details":
        return <MarksDetails {...commonProps} />;
      case "Subject Details":
        return <SubjectDetails {...commonProps} />;
      case "Extra Field Details":
        return <ExtraFieldDetails {...commonProps} />;
      case "Other Field Details":
        return <OtherFieldDetails {...commonProps} />;
      case "Signature Details":
        return <SignatureDetails {...commonProps} />;
      case "Other Details":
        return <OtherDetails {...commonProps} />;
      case "Marksheet Design":
        return <MarksheetDesign {...commonProps} />;
      default:
        return null;
    }
  };

  const handleSaveOrUpdate = () => {
    if (isEditMode) {
      console.log("UPDATE exam settings");
      // 🔜 API CALL: updateExamSetting()
    } else {
      console.log("ADD new exam settings");
      // 🔜 API CALL: addExamSetting()
    }
  };

  return (
    <div className="exam-setting-wrapper">
      <div className="exam-card">
        <div className="exam-header">
          <h3>Exam Setting</h3>

          <div className="exam-links">
            <a
              onClick={() => {
                setShowTabs(true);
                setIsEditMode(true);
                setActiveTab("Periodic Test");
              }}
            >
              Edit Exam Setting
            </a>
          </div>
        </div>

        {/* CLASS SELECT */}
        <div className="class-section">
          <h4>Select Class</h4>

          <div className="class-grid">
            {["Nursery", "LKG", "UKG", "1st", "2nd", "3rd", "4th", "5th"].map(
              (cls) => (
                <label key={cls}>
                  <input type="radio" name="class" /> {cls}
                </label>
              )
            )}
          </div>

          <button
            className="btn-primary"
            onClick={() => {
              setShowTabs(true);
              setIsEditMode(false);
              setActiveTab("Periodic Test");
            }}
          >
            Proceed
          </button>
        </div>

        {/* TABS */}
        {showTabs && (
          <>
            <div className="exam-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={activeTab === tab ? "tab active" : "tab"}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

           <div className="tab-body">
  {renderTab()}

  <div style={{ textAlign: "center", marginTop: 20 }}>
    {isEditMode && (
      <button className="btn-primary" onClick={handleSaveOrUpdate}>
        Update Settings
      </button>
    )}

    {!isEditMode && (
      <button className="btn-primary" onClick={handleSaveOrUpdate}>
        Add Settings
      </button>
    )}
  </div>
</div>

          </>
        )}
      </div>
    </div>
  );
}
