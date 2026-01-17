import React from "react";
import "./AddSemester.css";

const classList = [
  "12Class", "Nursary", "LKG",
  "UKG", "1ST", "2ND",
  "3RD", "4TH", "5TH",
  "6TH", "7TH", "8TH",
  "9TH", "10TH", "11TH",
  "12TH"
];

const AddSemester = () => {
  return (
    <div className="semCm__container">
      <h2 className="semCm__title">Add Semester</h2>

      <div className="semCm__card">
        <div className="semCm__cardHeader">Add Semester</div>

        <div className="semCm__cardBody">

          <div className="semCm__formBlock">
            <label className="semCm__label required">
              Select Class *
            </label>

            <div className="semCm__checkboxGrid">
              {classList.map((cls, index) => (
                <label key={index} className="semCm__checkboxItem">
                  <input type="checkbox" />
                  <span>{cls}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="semCm__formRow">
            <label className="semCm__label required">
              Enter Semester Name *
            </label>
            <input type="text" placeholder="e.g. First Term" />
          </div>

          <div className="semCm__formRow">
            <label className="semCm__label">
              Percentage (Weightage of Term for Marksheet)
            </label>
            <input type="number" defaultValue={0} />
          </div>

          <div className="semCm__divider" />

          <div className="semCm__buttonWrapper">
            <button>
              <span className="plus">+</span> Submit Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddSemester;
