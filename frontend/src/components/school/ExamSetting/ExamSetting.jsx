import React, { useState } from 'react';
import { Search, Plus, Settings, ChevronRight, BookOpen, Calendar, FileText, Users, CheckCircle } from 'lucide-react';
import './ExamSetting.css';

const ExamSetting = () => {
  const [formData, setFormData] = useState({
    testName: 'PT',
    numberOfTests: '0',
    reflectiveMarks: '0',
    finalEvaluation: 'Select Here',
    headerLine1: '',
    headerLine2: '',
    headerLine3: '',
    applySchoolHeader: 'yes',
    showStudentImage: 'yes',
    allowExamFullName: 'no',
    marksEntryFormat: 'marks',
    includeABMax: 'no',
    rankBasis: 'totalMarks',
    showCoScholastic: 'yes',
    showExamNameWithMarks: 'no',
    roundOffMarks: 'no',
    includeMLMax: 'no',
    finalMarksBasis: 'totalTerm',
    showScholasticGrade: 'yes',
    gradeScaleFormat: 'horizontal',
    roundOffPercentage: 'no',
    showCoScholasticArea: 'yes',
    coHeaderTermNameAt: 'beginning',
    coHeaderText: '',
    coAreaContain: 'eachTerm',
    otherShowArea: 'yes',
    otherHeaderText: '',
    otherHeaderTermNameAt: 'beginning',
    otherAreaContain: 'eachTerm',
    addShowArea: 'no',
    addHeaderText: '',
    subjectGroupPosition: 'top',
    showExtraFieldTable: 'no',
    extraTablePosition: 'top',
    extraTableFormat: 'format1',
    showOtherValue: 'no',
    showOtherDetails: 'no',
    termTotalEnabled: 'yes',
    termTotalLabel: 'Total',
    termGradeEnabled: 'yes',
    termGradeLabel: 'Grade',
    finalTotalEnabled: 'yes',
    finalTotalLabel: 'Final Total',
    finalGradeEnabled: 'yes',
    finalGradeLabel: 'Final Grade',
    finalPercentEnabled: 'yes',
    finalPercentLabel: 'Final Percentage',
    rowTotalEnabled: 'yes',
    rowTotalLabel: 'Total',
    rowPercentEnabled: 'yes',
    rowPercentLabel: '%',
    rowGradeEnabled: 'yes',
    rowGradeLabel: 'Overall Grade',
    totalWhere: 'eachExam',
    percentWhere: 'eachExam',
    totalRowWhere: 'termAndFinal',
    percentRowWhere: 'termAndFinal',
    gradeShownIn: 'finalTotal',
    gradeRowWhere: 'finalGrade',
    profileFontSize: 13,
    profileFontWeight: 'bold',
    headerFontSize: 14,
    headerFontWeight: 'bold',
    headerBgColor: '#f1f5f9',
    headerFontColor: '#0f172a',
    subjectFontSize: 12,
    subjectFontWeight: 'normal',
    marksFontSize: 12,
    marksFontWeight: 'normal',
    tableBorderStyle: 'solid',
    tableBorderColor: '#e5e7eb',
    rowStriping: 'light',
    showGridLines: 'yes',
    passColor: '#16a34a',
    failColor: '#dc2626',
    highlightTopper: 'yes',
    watermarkText: '',
    watermarkOpacity: 10,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [showTabs, setShowTabs] = useState(false);
  const [activeTab, setActiveTab] = useState('periodic');
  const [subjectInnerTab, setSubjectInnerTab] = useState('coScholastic');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedApplyClass, setSelectedApplyClass] = useState(null);
  const classes = [
    { id: '1', name: '126' }, { id: 'grade4', name: 'grade 426' }, { id: '11b', name: '11b26' }, { id: '23', name: '2326' },
    { id: '2', name: '226' }, { id: '8', name: '826' }, { id: 'prep', name: 'prep26' }, { id: '2nd-class', name: '2nd class..26' },
    { id: 'R', name: 'R26' }, { id: 'class4', name: 'class 426' }, { id: '1st', name: '1st26' }, { id: '4th-sem', name: '4th sem26' },
    { id: 'THIRD', name: 'THIRD26' }, { id: '5', name: '526' }, { id: 'nursery12', name: 'nursery1226' }, { id: 'nur', name: 'nur26' },
    { id: 'II', name: 'II26' }, { id: '66', name: '6626' }, { id: 'playgroup', name: 'playgroup26' }, { id: '11th-B', name: '11th B26' },
  ];
  const otherDetailRows = [
    { id: 1, label: "Each term will contain total of its exam", nameKey: "termTotalLabel", yesNoKey: "termTotalEnabled", extraType: "totalWhere" },
    { id: 2, label: "Each term will contain grade", nameKey: "termGradeLabel", yesNoKey: "termGradeEnabled", extraType: null },
    { id: 3, label: "Marksheet will contain final total (in last column)", nameKey: "finalTotalLabel", yesNoKey: "finalTotalEnabled", extraType: null },
    { id: 4, label: "Marksheet will contain final grade (in last column)", nameKey: "finalGradeLabel", yesNoKey: "finalGradeEnabled", extraType: "gradeShownIn" },
    { id: 5, label: "Marksheet will contain final percentage (in last column)", nameKey: "finalPercentLabel", yesNoKey: "finalPercentEnabled", extraType: "percentWhere" },
    { id: 6, label: "Marksheet will contain total (in last row)", nameKey: "rowTotalLabel", yesNoKey: "rowTotalEnabled", extraType: "totalRowWhere" },
    { id: 7, label: "Marksheet will contain percentage (in last row)", nameKey: "rowPercentLabel", yesNoKey: "rowPercentEnabled", extraType: "percentRowWhere" },
    { id: 8, label: "Marksheet will contain grade (in last row)", nameKey: "rowGradeLabel", yesNoKey: "rowGradeEnabled", extraType: "gradeRowWhere" },
  ];
  const [classSignRows, setClassSignRows] = useState([
    { id: 1, rank: 1, name: "", className: "", type: "manual", file: null, alignment: "left" },
    { id: 2, rank: 2, name: "", className: "", type: "manual", file: null, alignment: "left" },
    { id: 3, rank: 3, name: "", className: "", type: "manual", file: null, alignment: "left" },
    { id: 4, rank: 4, name: "", className: "", type: "manual", file: null, alignment: "left" },
  ]);
  const [otherSignRows, setOtherSignRows] = useState([
    { id: 1, rank: 1, name: "", type: "manual", file: null, alignment: "left" },
    { id: 2, rank: 2, name: "", type: "manual", file: null, alignment: "left" },
    { id: 3, rank: 3, name: "", type: "manual", file: null, alignment: "left" },
  ]);
  const [extraRows, setExtraRows] = useState([
    { id: 1, key: 'height', label: 'Height', enabled: false, rank: 1 },
    { id: 2, key: 'weight', label: 'Weight', enabled: false, rank: 2 },
    { id: 3, key: 'bloodGroup', label: 'Blood Group', enabled: false, rank: 3 },
    { id: 4, key: 'vision', label: 'Vision', enabled: false, rank: 4 },
    { id: 5, key: 'attendance', label: 'Attendance', enabled: false, rank: 5, termScope: 'all' },
  ]);
  const otherValueRows = [
    { id: 1, key: 'remark', label: 'REMARK' },
    { id: 2, key: 'result', label: 'RESULT' },
    { id: 3, key: 'rank', label: 'RANK' },
    { id: 4, key: 'promotion', label: 'PROMOTION' },
    { id: 5, key: 'note', label: 'NOTE' },
    { id: 6, key: 'attendance', label: 'ATTENDANCE (Last Term Only)' }
  ];
  const [otherValueConfig, setOtherValueConfig] = useState(
    otherValueRows.map((r, i) => ({
      ...r,
      selected: i < 4,
      rank: String(i + 1),
      labelForMarksheet: r.label,
      basis: 'erp',
      manualValue: ''
    }))
  );
  const toggleExtraRow = (index, enabled) => {
    const updatedRows = [...extraRows];
    updatedRows[index].enabled = enabled;
    setExtraRows(updatedRows);
  };
  const updateExtraRow = (index, key, value) => {
    const updatedRows = [...extraRows];
    updatedRows[index][key] = value;
    setExtraRows(updatedRows);
  };
  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const tabs = [
    { id: 'periodic', name: 'Periodic Test', icon: Calendar },
    { id: 'header', name: 'Header Details', icon: FileText },
    { id: 'marks', name: 'Marks Details', icon: BookOpen },
    { id: 'subject', name: 'Subject Details', icon: Settings },
    { id: 'extra', name: 'Extra Field Details', icon: Plus },
    { id: 'other', name: 'Other Field Details', icon: FileText },
    { id: 'signature', name: 'Signature Details', icon: Users },
    { id: 'otherdetails', name: 'Other Details', icon: Settings },
    { id: 'marksheet', name: 'Marksheet Design', icon: FileText },
  ];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  return (
    <div className="exam-setting-container26">
      {/* Header */}
      <div className="page-header26">
        <div className="header-content26">
          <div className="header-title-section26">
            <BookOpen className="header-icon26" />
            <div>
              <h1 className="page-title26">Exam Setting</h1>
              <p className="page-subtitle26">Configure and manage examination settings</p>
            </div>
          </div>
          <div className="header-actions26">
            <button className="btn-secondary26"><Settings size={18} /> Edit Bulk Exam Setting</button>
            <button className="btn-primary26"><Plus size={18} /> Edit Exam Setting</button>
            <button className="btn-secondary26" onClick={() => setShowApplyModal(true)}><CheckCircle size={18} /> Apply Same Setting</button>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="main-content26">
        {/* Class Selection */}
        <div className="section-card26 class-selection-section26">
          <div className="section-header26">
            <h2 className="section-title26">Select Class</h2>
            <div className="search-box26">
              <Search className="search-icon26" size={18} />
              <input
                type="text"
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input26"
              />
            </div>
          </div>
          <div className="class-grid26">
            {filteredClasses.map((cls) => (
              <button
                key={cls.id}
                className={`class-card26 ${selectedClass === cls.id ? 'active26' : ''}`}
                onClick={() => setSelectedClass(cls.id)}
              >
                <span className="class-name26">{cls.name}</span>
                {selectedClass === cls.id && <ChevronRight className="check-icon26" size={16} />}
              </button>
            ))}
          </div>
          <button
            className="btn-proceed26"
            onClick={() => selectedClass && setShowTabs(true)}
          >
            Proceed <ChevronRight size={18} />
          </button>
        </div>
        {/* Tabs & Forms */}
        {showTabs && (
          <div className="section-card26 configuration-section26">
            {/* Tabs */}
            <div className="tabs-container26">
              <div className="tabs-scroll26">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      className={`tab26 ${activeTab === tab.id ? 'active26' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <Icon size={16} />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Periodic Test */}
            {activeTab === 'periodic' && (
              <div className="form-content26">
                <div className="form-grid26">
                  <div className="form-group26">
                    <label className="form-label26 required26">Enter Test Name</label>
                    <input type="text" name="testName" value={formData.testName} onChange={handleInputChange} className="form-input26" placeholder="e.g., Periodic Test" />
                  </div>
                  <div className="form-group26">
                    <label className="form-label26 required26">Enter No. Of Test</label>
                    <input type="number" name="numberOfTests" value={formData.numberOfTests} onChange={handleInputChange} className="form-input26" />
                  </div>
                  <div className="form-group26">
                    <label className="form-label26 required26">Reflective Marks</label>
                    <input type="number" name="reflectiveMarks" value={formData.reflectiveMarks} onChange={handleInputChange} className="form-input26" />
                  </div>
                  <div className="form-group26">
                    <label className="form-label26">How Many Test You Want To Include For Final Evaluation</label>
                    <select name="finalEvaluation" value={formData.finalEvaluation} onChange={handleInputChange} className="form-select26">
                      <option>Select Here</option>
                      <option>All Tests</option>
                      <option>Best 2 Tests</option>
                      <option>Best 3 Tests</option>
                      <option>Average of All</option>
                    </select>
                  </div>
                </div>
                <div className="form-actions26">
                  <button className="btn-save26"><Plus size={18} /> Add Settings</button>
                </div>
              </div>
            )}
            {/* Header Details */}
            {activeTab === 'header' && (
              <div className="form-content26">
                <div className="form-grid26">
                  <div className="form-group26">
                    <label className="form-label26 required26">Marksheet Header Line 1</label>
                    <input type="text" name="headerLine1" value={formData.headerLine1} onChange={handleInputChange} className="form-input26" />
                  </div>
                  <div className="form-group26">
                    <label className="form-label26">Marksheet Header Line 2</label>
                    <input type="text" name="headerLine2" value={formData.headerLine2} onChange={handleInputChange} className="form-input26" />
                  </div>
                  <div className="form-group26">
                    <label className="form-label26">Marksheet Header Line 3</label>
                    <input type="text" name="headerLine3" value={formData.headerLine3} onChange={handleInputChange} className="form-input26" />
                  </div>
                  <div className="form-group26">
                    <label className="form-label26 required26">Apply School Header In Marksheet</label>
                    <div className="radio-row26">
                      {['yes', 'no'].map(v => (
                        <label key={v} className="radio-pill26">
                          <input type="radio" name="applySchoolHeader" value={v} checked={formData.applySchoolHeader === v} onChange={handleInputChange} />
                          <span>{v === 'yes' ? 'Yes' : 'No'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group26">
                    <label className="form-label26 required26">Show Student Image</label>
                    <div className="radio-row26">
                      {['yes', 'no'].map(v => (
                        <label key={v} className="radio-pill26">
                          <input type="radio" name="showStudentImage" value={v} checked={formData.showStudentImage === v} onChange={handleInputChange} />
                          <span>{v === 'yes' ? 'Yes' : 'No'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group26">
                    <label className="form-label26">Allow Exam Full Name In Marksheet</label>
                    <div className="radio-row26">
                      {['yes', 'no'].map(v => (
                        <label key={v} className="radio-pill26">
                          <input type="radio" name="allowExamFullName" value={v} checked={formData.allowExamFullName === v} onChange={handleInputChange} />
                          <span>{v === 'yes' ? 'Yes' : 'No'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="form-actions26">
                  <button className="btn-save26"><Plus size={18} /> Add Settings</button>
                </div>
              </div>
            )}
            {/* Marks Details */}
            {activeTab === 'marks' && (
              <div className="form-content26">
                <div className="form-grid26">
                  <div className="form-group26">
                    <label className="form-label26 required26">Marks will be entered in form of</label>
                    <div className="radio-row26">
                      {['marks', 'grade'].map(v => (
                        <label key={v} className="radio-pill26">
                          <input type="radio" name="marksEntryFormat" value={v} checked={formData.marksEntryFormat === v} onChange={handleInputChange} />
                          <span>{v === 'marks' ? 'Marks' : 'Grade'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group26">
                    <label className="form-label26 required26">In case of Absent (AB), include max marks in marksheet</label>
                    <div className="radio-row26">
                      {['yes', 'no'].map(v => (
                        <label key={v} className="radio-pill26">
                          <input type="radio" name="includeABMax" value={v} checked={formData.includeABMax === v} onChange={handleInputChange} />
                          <span>{v === 'yes' ? 'Yes' : 'No'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group26">
                    <label className="form-label26 required26">Rank must be generated on basis of</label>
                    <div className="radio-row26">
                      {['totalMarks', 'percentage'].map(v => (
                        <label key={v} className="radio-pill26">
                          <input type="radio" name="rankBasis" value={v} checked={formData.rankBasis === v} onChange={handleInputChange} />
                          <span>{v === 'totalMarks' ? 'Total Marks' : 'Percentage'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group26">
                    <label className="form-label26 required26">Final marks should be</label>
                    <div className="radio-row26">
                      {['totalTerm', 'avgTerm', 'percentTerm'].map(v => (
                        <label key={v} className="radio-pill26">
                          <input type="radio" name="finalMarksBasis" value={v} checked={formData.finalMarksBasis === v} onChange={handleInputChange} />
                          <span>{v === 'totalTerm' ? "Total of Term's Marks" : v === 'avgTerm' ? "Average of Term's Marks" : "Percentage of Term's Marks"}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group26">
                    <label className="form-label26">Show Co‑Scholastic grade scale in marksheet</label>
                    <div className="radio-row26">
                      {['yes', 'no'].map(v => (
                        <label key={v} className="radio-pill26">
                          <input type="radio" name="showCoScholastic" value={v} checked={formData.showCoScholastic === v} onChange={handleInputChange} />
                          <span>{v === 'yes' ? 'Yes' : 'No'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group26">
                    <label className="form-label26">Show Scholastic grade scale in marksheet</label>
                    <div className="radio-row26">
                      {['yes', 'no'].map(v => (
                        <label key={v} className="radio-pill26">
                          <input type="radio" name="showScholasticGrade" value={v} checked={formData.showScholasticGrade === v} onChange={handleInputChange} />
                          <span>{v === 'yes' ? 'Yes' : 'No'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group26">
                    <label className="form-label26">Want to show exam marks with exam name</label>
                    <div className="radio-row26">
                      {['yes', 'no'].map(v => (
                        <label key={v} className="radio-pill26">
                          <input type="radio" name="showExamNameWithMarks" value={v} checked={formData.showExamNameWithMarks === v} onChange={handleInputChange} />
                          <span>{v === 'yes' ? 'Yes' : 'No'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group26">
                    <label className="form-label26">Grade scale format should be</label>
                    <div className="radio-row26">
                      {['horizontal', 'vertical'].map(v => (
                        <label key={v} className="radio-pill26">
                          <input type="radio" name="gradeScaleFormat" value={v} checked={formData.gradeScaleFormat === v} onChange={handleInputChange} />
                          <span>{v === 'horizontal' ? 'Horizontally' : 'Vertically'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group26">
                    <label className="form-label26">Round off marks</label>
                    <div className="radio-row26">
                      {['yes', 'no'].map(v => (
                        <label key={v} className="radio-pill26">
                          <input type="radio" name="roundOffMarks" value={v} checked={formData.roundOffMarks === v} onChange={handleInputChange} />
                          <span>{v === 'yes' ? 'Yes' : 'No'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group26">
                    <label className="form-label26">Round off percentage</label>
                    <div className="radio-row26">
                      {['yes', 'no'].map(v => (
                        <label key={v} className="radio-pill26">
                          <input type="radio" name="roundOffPercentage" value={v} checked={formData.roundOffPercentage === v} onChange={handleInputChange} />
                          <span>{v === 'yes' ? 'Yes' : 'No'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="form-actions26">
                  <button className="btn-save26"><Plus size={18} /> Add Settings</button>
                </div>
              </div>
            )}
            {/* Subject Details */}
            {activeTab === 'subject' && (
              <div className="form-content26">
                <div className="inner-tabs26">
                  <button className={`inner-tab26 ${subjectInnerTab === 'coScholastic' ? 'active26' : ''}`} onClick={() => setSubjectInnerTab('coScholastic')}>Co‑scholastic Subject</button>
                  <button className={`inner-tab26 ${subjectInnerTab === 'other' ? 'active26' : ''}`} onClick={() => setSubjectInnerTab('other')}>Other Subject</button>
                  <button className={`inner-tab26 ${subjectInnerTab === 'additional' ? 'active26' : ''}`} onClick={() => setSubjectInnerTab('additional')}>Additional Subject</button>
                  <button className={`inner-tab26 ${subjectInnerTab === 'groupPosition' ? 'active26' : ''}`} onClick={() => setSubjectInnerTab('groupPosition')}>Subject Group Position Setting</button>
                </div>
                {/* Co-scholastic */}
                {subjectInnerTab === 'coScholastic' && (
                  <>
                    <div className="form-grid26">
                      <div className="form-group26">
                        <label className="form-label26 required26">Show Co‑scholastic Area</label>
                        <div className="radio-row26">
                          {['yes', 'no'].map(v => (
                            <label key={v} className="radio-pill26">
                              <input type="radio" name="showCoScholasticArea" value={v} checked={formData.showCoScholasticArea === v} onChange={handleInputChange} />
                              <span>{v === 'yes' ? 'Yes' : 'No'}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="form-group26">
                        <label className="form-label26">Header for Co‑scholastic Area</label>
                        <input type="text" name="coHeaderText" value={formData.coHeaderText} onChange={handleInputChange} className="form-input26" placeholder="e.g., Co‑Scholastic Areas" />
                      </div>
                    </div>
                    <div className="form-grid26">
                      <div className="form-group26">
                        <label className="form-label26 required26">Co‑scholastic Header contain term name at</label>
                        <div className="radio-row26">
                          {['beginning', 'end', 'none'].map(v => (
                            <label key={v} className="radio-pill26">
                              <input type="radio" name="coHeaderTermNameAt" value={v} checked={formData.coHeaderTermNameAt === v} onChange={handleInputChange} />
                              <span>{v === 'beginning' ? 'Beginning of header' : v === 'end' ? 'End of header' : "Don't add term name"}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="form-group26">
                        <label className="form-label26 required26">Co‑scholastic Area contain</label>
                        <div className="radio-row26">
                          {['eachTerm', 'lastTerm'].map(v => (
                            <label key={v} className="radio-pill26">
                              <input type="radio" name="coAreaContain" value={v} checked={formData.coAreaContain === v} onChange={handleInputChange} />
                              <span>{v === 'eachTerm' ? 'Each Term' : 'Last Term'}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="form-actions26">
                      <button className="btn-save26"><Plus size={18} /> Add Settings</button>
                    </div>
                  </>
                )}
                {/* Other Subject */}
                {subjectInnerTab === 'other' && (
                  <>
                    <div className="form-grid26">
                      <div className="form-group26">
                        <label className="form-label26 required26">Show Other Subject Area</label>
                        <div className="radio-row26">
                          {['yes', 'no'].map(v => (
                            <label key={v} className="radio-pill26">
                              <input type="radio" name="otherShowArea" value={v} checked={formData.otherShowArea === v} onChange={handleInputChange} />
                              <span>{v === 'yes' ? 'Yes' : 'No'}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="form-group26">
                        <label className="form-label26">Header for Other Subject Area</label>
                        <input type="text" name="otherHeaderText" value={formData.otherHeaderText} onChange={handleInputChange} className="form-input26" placeholder="e.g., Other Subjects" />
                      </div>
                    </div>
                    <div className="form-grid26">
                      <div className="form-group26">
                        <label className="form-label26 required26">Other Subject contain term name at</label>
                        <div className="radio-row26">
                          {['beginning', 'end', 'none'].map(v => (
                            <label key={v} className="radio-pill26">
                              <input type="radio" name="otherHeaderTermNameAt" value={v} checked={formData.otherHeaderTermNameAt === v} onChange={handleInputChange} />
                              <span>{v === 'beginning' ? 'Beginning of header' : v === 'end' ? 'End of header' : "Don't add term name"}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="form-group26">
                        <label className="form-label26 required26">Other Subject Area contain</label>
                        <div className="radio-row26">
                          {['eachTerm', 'lastTerm'].map(v => (
                            <label key={v} className="radio-pill26">
                              <input type="radio" name="otherAreaContain" value={v} checked={formData.otherAreaContain === v} onChange={handleInputChange} />
                              <span>{v === 'eachTerm' ? 'Each Term' : 'Last Term'}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="form-actions26">
                      <button className="btn-save26"><Plus size={18} /> Add Settings</button>
                    </div>
                  </>
                )}
                {/* Additional Subject */}
                {subjectInnerTab === 'additional' && (
                  <>
                    <div className="form-grid26">
                      <div className="form-group26">
                        <label className="form-label26 required26">Show Additional Subject Area</label>
                        <div className="radio-row26">
                          {['yes', 'no'].map(v => (
                            <label key={v} className="radio-pill26">
                              <input type="radio" name="addShowArea" value={v} checked={formData.addShowArea === v} onChange={handleInputChange} />
                              <span>{v === 'yes' ? 'Yes' : 'No'}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="form-group26">
                        <label className="form-label26">Header for Additional Subject Area</label>
                        <input type="text" name="addHeaderText" value={formData.addHeaderText} onChange={handleInputChange} className="form-input26" placeholder="e.g., Additional Subject" />
                      </div>
                    </div>
                    <div className="form-actions26">
                      <button className="btn-save26"><Plus size={18} /> Add Settings</button>
                    </div>
                  </>
                )}
                {/* Group Position */}
                {subjectInnerTab === 'groupPosition' && (
                  <>
                    <div className="form-grid26">
                      <div className="form-group26">
                        <label className="form-label26">Subject Group Position</label>
                        <div className="radio-row26">
                          {['top', 'down'].map(v => (
                            <label key={v} className="radio-pill26">
                              <input type="radio" name="subjectGroupPosition" value={v} checked={formData.subjectGroupPosition === v} onChange={handleInputChange} />
                              <span>{v === 'top' ? 'Top' : 'Down'}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="form-actions26">
                      <button className="btn-save26"><Plus size={18} /> Add Settings</button>
                    </div>
                  </>
                )}
              </div>
            )}
            {/* Extra Field Details */}
            {activeTab === 'extra' && (
              <div className="form-content26">
                <div className="form-grid26">
                  <div className="form-group26">
                    <label className="form-label26 required26">
                      Want to show extra field table (i.e. Height, Weight)
                    </label>
                    <div className="radio-row26">
                      {['yes', 'no'].map((v) => (
                        <label key={v} className="radio-pill26">
                          <input
                            type="radio"
                            name="showExtraFieldTable"
                            value={v}
                            checked={formData.showExtraFieldTable === v}
                            onChange={handleInputChange}
                          />
                          <span>{v === 'yes' ? 'Yes' : 'No'}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                {formData.showExtraFieldTable === 'yes' && (
                  <>
                    <div className="design-section26">
                      <h3 className="design-title26">Extra Field Table Layout</h3>
                      <div className="form-grid26">
                        <div className="form-group26">
                          <label className="form-label26">Place of extra field table</label>
                          <div className="radio-row26">
                            {['top', 'bottom'].map((pos) => (
                              <label key={pos} className="radio-pill26 small-pill26">
                                <input
                                  type="radio"
                                  name="extraTablePosition"
                                  value={pos}
                                  checked={formData.extraTablePosition === pos}
                                  onChange={handleInputChange}
                                />
                                <span>{pos === 'top' ? 'Top' : 'Bottom'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="form-group26">
                          <label className="form-label26">Select design format</label>
                          <div className="radio-row26">
                            {['format1', 'format2'].map((f) => (
                              <label key={f} className="radio-pill26 small-pill26">
                                <input
                                  type="radio"
                                  name="extraTableFormat"
                                  value={f}
                                  checked={formData.extraTableFormat === f}
                                  onChange={handleInputChange}
                                />
                                <span>{f === 'format1' ? 'Format 1' : 'Format 2'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="design-section26">
                      <h3 className="design-title26">Extra Fields</h3>
                      <div className="extra-table26">
                        <div className="extra-head26">
                          <span>Select</span>
                          <span>Name</span>
                          <span>Rank</span>
                          <span>Extra Setting</span>
                        </div>
                        {extraRows.map((row, i) => (
                          <div className="extra-row26" key={row.id}>
                            <span>
                              <input
                                type="checkbox"
                                checked={row.enabled}
                                onChange={(e) => toggleExtraRow(i, e.target.checked)}
                              />
                            </span>
                            <span className="other-label26">{row.label}</span>
                            <span>
                              <input
                                className="form-input26"
                                value={row.rank}
                                onChange={(e) => updateExtraRow(i, 'rank', e.target.value)}
                              />
                            </span>
                            <span>
                              {row.key === 'attendance' ? (
                                <div className="radio-row26">
                                  {['all', 'last'].map((v) => (
                                    <label key={v} className="radio-pill26 small-pill26">
                                      <input
                                        type="radio"
                                        checked={row.termScope === v}
                                        onChange={() => updateExtraRow(i, 'termScope', v)}
                                      />
                                      <span>{v === 'all' ? 'All Term' : 'Last Term'}</span>
                                    </label>
                                  ))}
                                </div>
                              ) : (
                                <span className="other-extra-empty26">—</span>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                <div className="form-actions26">
                  <button className="btn-save26">
                    <Plus size={18} /> Add Settings
                  </button>
                </div>
              </div>
            )}
            {/* Other Field Details */}
            {activeTab === 'other' && (
              <>
                <div className="extra-field-row26">
                  <div className="extra-field-label26">
                    Want to show other value (i.e. Rank, Result)
                    <span className="required26"> *</span>
                  </div>
                  <div className="extra-field-options26">
                    <label className="radio-pill26">
                      <input
                        type="radio"
                        name="showOtherValue"
                        value="yes"
                        checked={formData.showOtherValue === 'yes'}
                        onChange={handleInputChange}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-pill26">
                      <input
                        type="radio"
                        name="showOtherValue"
                        value="no"
                        checked={formData.showOtherValue === 'no'}
                        onChange={handleInputChange}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
                {formData.showOtherValue === 'yes' && (
                  <div className="design-section26 other-value-table26">
                    <div className="other-head26">
                      <span>Select</span>
                      <span>Name</span>
                      <span>Rank</span>
                      <span>Label for marksheet</span>
                      <span>Shown on basis of</span>
                      <span>Value (only if manually entered)</span>
                    </div>
                    {otherValueConfig.map((row, idx) => (
                      <div className="other-row26" key={row.id}>
                        <span>
                          <input
                            type="checkbox"
                            checked={row.selected}
                            onChange={(e) => {
                              const copy = [...otherValueConfig];
                              copy[idx].selected = e.target.checked;
                              setOtherValueConfig(copy);
                            }}
                          />
                        </span>
                        <span className="other-label26">{row.label}</span>
                        <span>
                          <input
                            className="form-input26"
                            value={row.rank}
                            onChange={(e) => {
                              const copy = [...otherValueConfig];
                              copy[idx].rank = e.target.value;
                              setOtherValueConfig(copy);
                            }}
                          />
                        </span>
                        <span>
                          <input
                            className="form-input26"
                            value={row.labelForMarksheet}
                            onChange={(e) => {
                              const copy = [...otherValueConfig];
                              copy[idx].labelForMarksheet = e.target.value;
                              setOtherValueConfig(copy);
                            }}
                          />
                        </span>
                        <span>
                          <div className="radio-row26">
                            {['erp', 'manual'].map((b) => (
                              <label key={b} className="radio-pill26 small-pill26">
                                <input
                                  type="radio"
                                  checked={row.basis === b}
                                  onChange={() => {
                                    const copy = [...otherValueConfig];
                                    copy[idx].basis = b;
                                    setOtherValueConfig(copy);
                                  }}
                                />
                                <span>{b === 'erp' ? 'ERP' : 'Manual'}</span>
                              </label>
                            ))}
                          </div>
                        </span>
                        <span>
                          <input
                            className="form-input26"
                            value={row.manualValue}
                            onChange={(e) => {
                              const copy = [...otherValueConfig];
                              copy[idx].manualValue = e.target.value;
                              setOtherValueConfig(copy);
                            }}
                            placeholder="Enter value when Manual is selected"
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="form-actions26">
                  <button className="btn-save26">
                    <Plus size={18} /> Add Settings
                  </button>
                </div>
              </>
            )}
            {/* Signature Details */}
            {activeTab === 'signature' && (
              <div className="form-content26 signature-tab26">
                <h3 className="sig-section-title26">Class Teacher Signature Details</h3>
                <div className="sig-table26">
                  <div className="sig-head26">
                    <span>Rank</span><span>Sign. Name</span><span>Class Name</span><span>Type</span><span>Upload file (Image)</span><span>Alignment</span>
                  </div>
                  {classSignRows.map((row, i) => (
                    <div className="sig-row26" key={row.id}>
                      <span className="sig-rank26">{i + 1}</span>
                      <span><input className="form-input26" value={row.name} onChange={e => {
                        const c = [...classSignRows];
                        c[i].name = e.target.value;
                        setClassSignRows(c);
                      }} placeholder="e.g., Class Teacher" /></span>
                      <span><input className="form-input26" value={row.className} onChange={e => {
                        const c = [...classSignRows];
                        c[i].className = e.target.value;
                        setClassSignRows(c);
                      }} placeholder="e.g., 9-A" /></span>
                      <span>
                        <div className="radio-row26">
                          {['manual', 'image'].map(t => (
                            <label key={t} className="radio-pill26 small-pill26">
                              <input type="radio" checked={row.type === t} onChange={() => {
                                const c = [...classSignRows];
                                c[i].type = t;
                                setClassSignRows(c);
                              }} />
                              <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
                            </label>
                          ))}
                        </div>
                      </span>
                      <span><input type="file" accept="image/*" className="file-input26" onChange={e => {
                        const c = [...classSignRows];
                        c[i].file = e.target.files?.[0] || null;
                        setClassSignRows(c);
                      }} /></span>
                      <span>
                        <div className="radio-row26">
                          {['left', 'center', 'right'].map(a => (
                            <label key={a} className="radio-pill26 small-pill26">
                              <input type="radio" checked={row.alignment === a} onChange={() => {
                                const c = [...classSignRows];
                                c[i].alignment = a;
                                setClassSignRows(c);
                              }} />
                              <span>{a.charAt(0).toUpperCase() + a.slice(1)}</span>
                            </label>
                          ))}
                        </div>
                      </span>
                    </div>
                  ))}
                </div>
                <h3 className="sig-section-title26">Other Signature Details</h3>
                <div className="sig-table26">
                  <div className="sig-head26">
                    <span>Rank</span><span>Sign. Name</span><span>Type</span><span>Upload file (Image)</span><span>Alignment</span>
                  </div>
                  {otherSignRows.map((row, i) => (
                    <div className="sig-row26" key={row.id}>
                      <span className="sig-rank26">{i + 1}</span>
                      <span><input className="form-input26" value={row.name} onChange={e => {
                        const c = [...otherSignRows];
                        c[i].name = e.target.value;
                        setOtherSignRows(c);
                      }} placeholder="e.g., Principal" /></span>
                      <span>
                        <div className="radio-row26">
                          {['manual', 'image'].map(t => (
                            <label key={t} className="radio-pill26 small-pill26">
                              <input type="radio" checked={row.type === t} onChange={() => {
                                const c = [...otherSignRows];
                                c[i].type = t;
                                setOtherSignRows(c);
                              }} />
                              <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
                            </label>
                          ))}
                        </div>
                      </span>
                      <span><input type="file" accept="image/*" className="file-input26" onChange={e => {
                        const c = [...otherSignRows];
                        c[i].file = e.target.files?.[0] || null;
                        setOtherSignRows(c);
                      }} /></span>
                      <span>
                        <div className="radio-row26">
                          {['left', 'center', 'right'].map(a => (
                            <label key={a} className="radio-pill26 small-pill26">
                              <input type="radio" checked={row.alignment === a} onChange={() => {
                                const c = [...otherSignRows];
                                c[i].alignment = a;
                                setOtherSignRows(c);
                              }} />
                              <span>{a.charAt(0).toUpperCase() + a.slice(1)}</span>
                            </label>
                          ))}
                        </div>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="form-actions26">
                  <button className="btn-save26"><Plus size={18} /> Add Settings</button>
                </div>
              </div>
            )}


{/* Other Details Tab */}
{activeTab === 'otherdetails' && (
  <div className="form-content26 other-details-tab26">
    <div className="other-table26">
      <div className="other-head26">
        <span>S.No.</span>
        <span>Detail</span>
        <span>Yes / No</span>
        <span>If Yes, Then Name</span>
        <span>Extra Setting</span>
      </div>
      {otherDetailRows.map((row, index) => (
        <div className="other-row26" key={row.id}>
          {/* S.No. */}
          <span className="other-serial26">{index + 1}</span>

          {/* Detail Text */}
          <span className="other-label26">{row.label}</span>

          {/* Yes/No Radio */}
          <span>
            <div className="radio-row26">
              {['yes', 'no'].map((v) => (
                <label key={v} className="radio-pill26 small-pill26">
                  <input
                    type="radio"
                    name={`yesNo-${row.yesNoKey}`}
                    value={v}
                    checked={formData[row.yesNoKey] === v}
                    onChange={handleInputChange}
                  />
                  <span>{v === 'yes' ? 'Yes' : 'No'}</span>
                </label>
              ))}
            </div>
          </span>

          {/* If Yes, Then Name (Input) */}
          <span>
            <input
              type="text"
              className="form-input26"
              name={row.nameKey}
              value={formData[row.nameKey]}
              onChange={handleInputChange}
              disabled={formData[row.yesNoKey] !== 'yes'}
            />
          </span>

          {/* Extra Setting (केवल कुछ rows में) */}
          <span>
            {row.extraType && formData[row.yesNoKey] === 'yes' ? (
              <div className="radio-row26">
                {row.extraType === 'totalWhere' && (
                  <>
                    <label className="radio-pill26 small-pill26">
                      <input type="radio" name="totalWhere" value="eachExam" checked={formData.totalWhere === 'eachExam'} onChange={handleInputChange} />
                      <span>Each Exam</span>
                    </label>
                    <label className="radio-pill26 small-pill26">
                      <input type="radio" name="totalWhere" value="eachTermFinal" checked={formData.totalWhere === 'eachTermFinal'} onChange={handleInputChange} />
                      <span>Each Term & Final Total</span>
                    </label>
                    <label className="radio-pill26 small-pill26">
                      <input type="radio" name="totalWhere" value="lastTerm" checked={formData.totalWhere === 'lastTerm'} onChange={handleInputChange} />
                      <span>Last Term</span>
                    </label>
                    <label className="radio-pill26 small-pill26">
                      <input type="radio" name="totalWhere" value="finalTotal" checked={formData.totalWhere === 'finalTotal'} onChange={handleInputChange} />
                      <span>In Final Total</span>
                    </label>
                  </>
                )}
                {row.extraType === 'percentWhere' && (
                  <>
                    <label className="radio-pill26 small-pill26">
                      <input type="radio" name="percentWhere" value="eachExam" checked={formData.percentWhere === 'eachExam'} onChange={handleInputChange} />
                      <span>Each Exam</span>
                    </label>
                    <label className="radio-pill26 small-pill26">
                      <input type="radio" name="percentWhere" value="eachTermFinal" checked={formData.percentWhere === 'eachTermFinal'} onChange={handleInputChange} />
                      <span>Each Term & Final Total</span>
                    </label>
                    <label className="radio-pill26 small-pill26">
                      <input type="radio" name="percentWhere" value="lastTerm" checked={formData.percentWhere === 'lastTerm'} onChange={handleInputChange} />
                      <span>Last Term</span>
                    </label>
                    <label className="radio-pill26 small-pill26">
                      <input type="radio" name="percentWhere" value="finalTotal" checked={formData.percentWhere === 'finalTotal'} onChange={handleInputChange} />
                      <span>In Final Total</span>
                    </label>
                  </>
                )}
                {row.extraType === 'gradeShownIn' && (
                  <>
                    <label className="radio-pill26 small-pill26">
                      <input type="radio" name="gradeShownIn" value="finalTotal" checked={formData.gradeShownIn === 'finalTotal'} onChange={handleInputChange} />
                      <span>Final Total</span>
                    </label>
                    <label className="radio-pill26 small-pill26">
                      <input type="radio" name="gradeShownIn" value="finalGrade" checked={formData.gradeShownIn === 'finalGrade'} onChange={handleInputChange} />
                      <span>Final Grade</span>
                    </label>
                  </>
                )}
                {row.extraType === 'totalRowWhere' && (
                  <>
                    <label className="radio-pill26 small-pill26">
                      <input type="radio" name="totalRowWhere" value="termAndFinal" checked={formData.totalRowWhere === 'termAndFinal'} onChange={handleInputChange} />
                      <span>Term & Final</span>
                    </label>
                    {/* अगर और ऑप्शन हों तो ऐड करें */}
                  </>
                )}
                {row.extraType === 'percentRowWhere' && (
                  <>
                    <label className="radio-pill26 small-pill26">
                      <input type="radio" name="percentRowWhere" value="termAndFinal" checked={formData.percentRowWhere === 'termAndFinal'} onChange={handleInputChange} />
                      <span>Term & Final</span>
                    </label>
                  </>
                )}
                {row.extraType === 'gradeRowWhere' && (
                  <>
                    <label className="radio-pill26 small-pill26">
                      <input type="radio" name="gradeRowWhere" value="finalGrade" checked={formData.gradeRowWhere === 'finalGrade'} onChange={handleInputChange} />
                      <span>Final Grade</span>
                    </label>
                  </>
                )}
              </div>
            ) : (
              <span className="other-extra-empty26">—</span>
            )}
          </span>
        </div>
      ))}
    </div>

    <div className="form-actions26">
      <button className="btn-save26">
        <Plus size={18} /> Add Settings
      </button>
    </div>
  </div>
)}



            {/* Marksheet Design */}
            {activeTab === 'marksheet' && (
              <div className="form-content26">
                <div className="design-section26">
                  <h3 className="design-title26">Student Profile</h3>
                  <div className="form-grid26">
                    <div className="form-group26">
                      <label className="form-label26">Font size</label>
                      <input type="number" className="form-input26" name="profileFontSize" value={formData.profileFontSize} onChange={handleInputChange} />
                    </div>
                    <div className="form-group26">
                      <label className="form-label26">Font weight</label>
                      <div className="radio-row26">
                        <label className="radio-pill26 small-pill26">
                          <input type="radio" name="profileFontWeight" value="bold" checked={formData.profileFontWeight === 'bold'} onChange={handleInputChange} />
                          <span>Bold</span>
                        </label>
                        <label className="radio-pill26 small-pill26">
                          <input type="radio" name="profileFontWeight" value="normal" checked={formData.profileFontWeight === 'normal'} onChange={handleInputChange} />
                          <span>Normal</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="design-section26">
                  <h3 className="design-title26">Table Header</h3>
                  <div className="form-grid26">
                    <div className="form-group26">
                      <label className="form-label26">Font size</label>
                      <input type="number" className="form-input26" name="headerFontSize" value={formData.headerFontSize} onChange={handleInputChange} />
                    </div>
                    <div className="form-group26">
                      <label className="form-label26">Font weight</label>
                      <div className="radio-row26">
                        <label className="radio-pill26 small-pill26">
                          <input type="radio" name="headerFontWeight" value="bold" checked={formData.headerFontWeight === 'bold'} onChange={handleInputChange} />
                          <span>Bold</span>
                        </label>
                        <label className="radio-pill26 small-pill26">
                          <input type="radio" name="headerFontWeight" value="normal" checked={formData.headerFontWeight === 'normal'} onChange={handleInputChange} />
                          <span>Normal</span>
                        </label>
                      </div>
                    </div>
                    <div className="form-group26">
                      <label className="form-label26">Header background color</label>
                      <input type="color" className="color-input26" name="headerBgColor" value={formData.headerBgColor} onChange={handleInputChange} />
                    </div>
                    <div className="form-group26">
                      <label className="form-label26">Header font color</label>
                      <input type="color" className="color-input26" name="headerFontColor" value={formData.headerFontColor} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
                <div className="design-section26">
                  <h3 className="design-title26">Subject Column</h3>
                  <div className="form-grid26">
                    <div className="form-group26">
                      <label className="form-label26">Font size</label>
                      <input type="number" className="form-input26" name="subjectFontSize" value={formData.subjectFontSize} onChange={handleInputChange} />
                    </div>
                    <div className="form-group26">
                      <label className="form-label26">Font weight</label>
                      <div className="radio-row26">
                        <label className="radio-pill26 small-pill26">
                          <input type="radio" name="subjectFontWeight" value="normal" checked={formData.subjectFontWeight === 'normal'} onChange={handleInputChange} />
                          <span>Normal</span>
                        </label>
                        <label className="radio-pill26 small-pill26">
                          <input type="radio" name="subjectFontWeight" value="bold" checked={formData.subjectFontWeight === 'bold'} onChange={handleInputChange} />
                          <span>Bold</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="design-section26">
                  <h3 className="design-title26">Marks Column</h3>
                  <div className="form-grid26">
                    <div className="form-group26">
                      <label className="form-label26">Font size</label>
                      <input type="number" className="form-input26" name="marksFontSize" value={formData.marksFontSize} onChange={handleInputChange} />
                    </div>
                    <div className="form-group26">
                      <label className="form-label26">Font weight</label>
                      <div className="radio-row26">
                        <label className="radio-pill26 small-pill26">
                          <input type="radio" name="marksFontWeight" value="normal" checked={formData.marksFontWeight === 'normal'} onChange={handleInputChange} />
                          <span>Normal</span>
                        </label>
                        <label className="radio-pill26 small-pill26">
                          <input type="radio" name="marksFontWeight" value="bold" checked={formData.marksFontWeight === 'bold'} onChange={handleInputChange} />
                          <span>Bold</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="design-section26">
                  <h3 className="design-title26">Table Layout & Borders</h3>
                  <div className="form-grid26">
                    <div className="form-group26">
                      <label className="form-label26">Border style</label>
                      <select name="tableBorderStyle" className="form-select26" value={formData.tableBorderStyle} onChange={handleInputChange}>
                        <option value="solid">Solid</option>
                        <option value="dashed">Dashed</option>
                        <option value="none">No border</option>
                      </select>
                    </div>
                    <div className="form-group26">
                      <label className="form-label26">Border color</label>
                      <input type="color" className="color-input26" name="tableBorderColor" value={formData.tableBorderColor} onChange={handleInputChange} />
                    </div>
                    <div className="form-group26">
                      <label className="form-label26">Row striping</label>
                      <select name="rowStriping" className="form-select26" value={formData.rowStriping} onChange={handleInputChange}>
                        <option value="none">None</option>
                        <option value="light">Light</option>
                        <option value="strong">Strong</option>
                      </select>
                    </div>
                    <div className="form-group26">
                      <label className="form-label26">Show grid lines</label>
                      <div className="radio-row26">
                        <label className="radio-pill26 small-pill26">
                          <input type="radio" name="showGridLines" value="yes" checked={formData.showGridLines === 'yes'} onChange={handleInputChange} />
                          <span>Yes</span>
                        </label>
                        <label className="radio-pill26 small-pill26">
                          <input type="radio" name="showGridLines" value="no" checked={formData.showGridLines === 'no'} onChange={handleInputChange} />
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="design-section26">
                  <h3 className="design-title26">Result Highlight</h3>
                  <div className="form-grid26">
                    <div className="form-group26">
                      <label className="form-label26">Pass colour</label>
                      <input type="color" className="color-input26" name="passColor" value={formData.passColor} onChange={handleInputChange} />
                    </div>
                    <div className="form-group26">
                      <label className="form-label26">Fail colour</label>
                      <input type="color" className="color-input26" name="failColor" value={formData.failColor} onChange={handleInputChange} />
                    </div>
                    <div className="form-group26">
                      <label className="form-label26">Highlight toppers</label>
                      <div className="radio-row26">
                        <label className="radio-pill26 small-pill26">
                          <input type="radio" name="highlightTopper" value="yes" checked={formData.highlightTopper === 'yes'} onChange={handleInputChange} />
                          <span>Yes</span>
                        </label>
                        <label className="radio-pill26 small-pill26">
                          <input type="radio" name="highlightTopper" value="no" checked={formData.highlightTopper === 'no'} onChange={handleInputChange} />
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="design-section26">
                  <h3 className="design-title26">Watermark</h3>
                  <div className="form-grid26">
                    <div className="form-group26">
                      <label className="form-label26">Watermark text</label>
                      <input type="text" className="form-input26" name="watermarkText" value={formData.watermarkText} onChange={handleInputChange} placeholder="e.g., CONFIDENTIAL / SCHOOL NAME" />
                    </div>
                    <div className="form-group26">
                      <label className="form-label26">Opacity (0–100)</label>
                      <input type="number" className="form-input26" name="watermarkOpacity" value={formData.watermarkOpacity} onChange={handleInputChange} min={0} max={100} />
                    </div>
                  </div>
                </div>
                <div className="form-actions26">
                  <button className="btn-save26">
                    <Plus size={18} />
                    Save Marksheet Design
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamSetting;