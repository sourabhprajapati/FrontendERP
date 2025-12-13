//STUDENTlOGINCREDENTIAL.JSX

import { useState } from "react";
import "./StudentLoginCredential.css";

export default function StudentLoginCredential() {
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="credential-page22">

      {/* SEARCH PANEL */}
      {!showResult && (
        <div className="search-wrapper22">

          <div className="search-card22">
            <h3>Search Student By Name</h3>
            <div className="search-row22">
              <input placeholder="Student Name / Sr No" />
              <button onClick={() => setShowResult(true)}>Search</button>
            </div>
          </div>

          <div className="search-card22">
            <h3>Search Student By Class & Section</h3>
            <div className="search-grid22">
              <select>
                <option>Select Class</option>
                <option>1</option>
                <option>2</option>
              </select>

              <select>
                <option>Select Section</option>
                <option>A</option>
                <option>B</option>
              </select>

              <button onClick={() => setShowResult(true)}>Search</button>
            </div>
          </div>

        </div>
      )}

      {/* RESULT PANEL */}
      {showResult && (
        <div className="result-wrapper22">

          {/* SCHOOL HEADER */}
          <div className="school-header22">
            <h2>Mitdemo School</h2>
            <p>13/2004, test, 9784386409</p>
          </div>

          {/* ACTION BAR */}
          <div className="action-bar22">
            <button className="share22">Share Login Credentials With Parents</button>
            <button className="block22">Login Block</button>
          </div>

          {/* TABLE */}
          <div className="table-wrap22">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>User Name</th>
                  <th>Password</th>
                  <th>Mobile</th>
                  <th>Password Reset</th>
                  <th>Block</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mohit</td>
                  <td>1</td>
                  <td>A</td>
                  <td>MIT3094989</td>
                  <td>T3GWXVEL</td>
                  <td>8077081456</td>
                  <td><button className="reset22">Reset</button></td>
                  <td><button className="blk22">Block</button></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* BACK */}
          <div className="back-wrap22">
            <button onClick={() => setShowResult(false)}>← Back to Search</button>
          </div>

        </div>
      )}

    </div>
  );
}