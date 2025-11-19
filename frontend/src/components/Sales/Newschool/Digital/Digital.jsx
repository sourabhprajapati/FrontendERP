import React, { useState } from 'react';
import './Digital.css';

const Digital = () => {
  const allClasses = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'NURSERY', 'LKG', 'UKG'];
  const bookSeriesOptions = ['B4 EMAGIX', 'Olympiad'];
  const subjectOptions = ['Hindi', 'English', 'Mathematics', 'Science', 'EVS'];

  // State for selected classes in school section
  const [selectedClasses, setSelectedClasses] = useState([]);
  
  // State for assigned classes in digital content section
  const [assignedClasses, setAssignedClasses] = useState([]);

  // Handle class selection in school section
  const handleClassSelection = (className) => {
    if (selectedClasses.includes(className)) {
      setSelectedClasses(selectedClasses.filter(cls => cls !== className));
    } else {
      setSelectedClasses([...selectedClasses, className]);
    }
  };

  // Handle update button click
  const handleUpdate = () => {
    if (selectedClasses.length === 0) return;

    // Create new class assignments
    const newAssignments = selectedClasses.map(className => ({
      className,
      bookSeries: [{
        series: '',
        subjects: ['']
      }]
    }));

    setAssignedClasses([...assignedClasses, ...newAssignments]);
    setSelectedClasses([]);
  };

  // Add more book series to a specific class
  const addBookSeries = (classIndex) => {
    const updatedClasses = [...assignedClasses];
    updatedClasses[classIndex].bookSeries.push({
      series: '',
      subjects: ['']
    });
    setAssignedClasses(updatedClasses);
  };

  // Add more subjects to a specific book series in a class
  const addSubject = (classIndex, seriesIndex) => {
    const updatedClasses = [...assignedClasses];
    updatedClasses[classIndex].bookSeries[seriesIndex].subjects.push('');
    setAssignedClasses(updatedClasses);
  };

  // Handle book series change
  const handleBookSeriesChange = (classIndex, seriesIndex, value) => {
    const updatedClasses = [...assignedClasses];
    updatedClasses[classIndex].bookSeries[seriesIndex].series = value;
    setAssignedClasses(updatedClasses);
  };

  // Handle subject change for a book series
  const handleSubjectChange = (classIndex, seriesIndex, subjectIndex, value) => {
    const updatedClasses = [...assignedClasses];
    updatedClasses[classIndex].bookSeries[seriesIndex].subjects[subjectIndex] = value;
    setAssignedClasses(updatedClasses);
  };

  // Remove book series
  const removeBookSeries = (classIndex, seriesIndex) => {
    const updatedClasses = [...assignedClasses];
    updatedClasses[classIndex].bookSeries = updatedClasses[classIndex].bookSeries.filter((_, index) => index !== seriesIndex);
    setAssignedClasses(updatedClasses);
  };

  // Remove subject from a book series
  const removeSubject = (classIndex, seriesIndex, subjectIndex) => {
    const updatedClasses = [...assignedClasses];
    updatedClasses[classIndex].bookSeries[seriesIndex].subjects = 
      updatedClasses[classIndex].bookSeries[seriesIndex].subjects.filter((_, index) => index !== subjectIndex);
    setAssignedClasses(updatedClasses);
  };

  // Remove class from digital content section
  const removeClass = (classIndex) => {
    const updatedClasses = assignedClasses.filter((_, index) => index !== classIndex);
    setAssignedClasses(updatedClasses);
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Final Data:', assignedClasses);
    
    // Here you would typically send the data to your backend
    alert('Data submitted successfully! ');
    
    // You can also format the data for display
    const formattedData = assignedClasses.map(classData => ({
      class: classData.className,
      assignments: classData.bookSeries.map(seriesData => ({
        bookSeries: seriesData.series,
        subjects: seriesData.subjects.filter(subject => subject !== '')
      })).filter(assignment => assignment.bookSeries !== '')
    }));

    console.log('Formatted Data:', formattedData);
  };

  // Check if form has valid data to submit
  const hasValidData = assignedClasses.some(classData => 
    classData.bookSeries.some(seriesData => 
      seriesData.series !== '' && seriesData.subjects.some(subject => subject !== '')
    )
  );

  return (
    <div className="container">
      {/* School Assigned Classes Section */}
      <div className="school-classes">
        <h2>School Assigned Classes</h2>
        <div className="classes-grid">
          {allClasses.map((className, index) => (
            <div key={index} className="class-checkbox">
              <input
                type="checkbox"
                id={`class-${index}`}
                checked={selectedClasses.includes(className)}
                onChange={() => handleClassSelection(className)}
              />
              <label htmlFor={`class-${index}`}>{className}</label>
            </div>
          ))}
        </div>
        <button 
          className="update-btn" 
          onClick={handleUpdate}
          disabled={selectedClasses.length === 0}
        >
          Update ({selectedClasses.length} selected)
        </button>
      </div>

      {/* Digital Content Assignment Section */}
      <div className="digital-content">
        <h2>Digital Content Assignment</h2>
        
        {assignedClasses.length === 0 ? (
          <div className="no-classes">No classes assigned yet. Select classes above and click Update.</div>
        ) : (
          assignedClasses.map((classData, classIndex) => (
            <div key={classIndex} className="class-section">
              <div className="class-header">
                {classData.className}
                <button 
                  className="remove-btn" 
                  onClick={() => removeClass(classIndex)}
                  style={{float: 'right'}}
                >
                  Remove Class
                </button>
              </div>
              
              {/* Book Series Sections */}
              {classData.bookSeries.map((seriesData, seriesIndex) => (
                <div key={seriesIndex} className="bookseries-section">
                  <div className="bookseries-header">
                    <span>Book Series #{seriesIndex + 1}</span>
                    {classData.bookSeries.length > 1 && (
                      <button 
                        className="remove-btn"
                        onClick={() => removeBookSeries(classIndex, seriesIndex)}
                      >
                        Remove Series
                      </button>
                    )}
                  </div>
                  
                  {/* Book Series Dropdown */}
                  <div className="dropdown-container">
                    <select 
                      className="bookseries-dropdown"
                      value={seriesData.series}
                      onChange={(e) => handleBookSeriesChange(classIndex, seriesIndex, e.target.value)}
                    >
                      <option value="">Select Book Series</option>
                      {bookSeriesOptions.map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Subjects for this Book Series */}
                  <div className="subjects-container">
                    <div className="section-title">Subjects for {seriesData.series || 'Selected Series'}</div>
                    {seriesData.subjects.map((subject, subjectIndex) => (
                      <div key={subjectIndex} className="dropdown-container">
                        <select 
                          className="subject-dropdown"
                          value={subject}
                          onChange={(e) => handleSubjectChange(classIndex, seriesIndex, subjectIndex, e.target.value)}
                        >
                          <option value="">Select Subject</option>
                          {subjectOptions.map((option, optionIndex) => (
                            <option key={optionIndex} value={option}>{option}</option>
                          ))}
                        </select>
                        {seriesData.subjects.length > 1 && (
                          <button 
                            className="remove-btn"
                            onClick={() => removeSubject(classIndex, seriesIndex, subjectIndex)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button 
                      className="add-more-btn" 
                      onClick={() => addSubject(classIndex, seriesIndex)}
                    >
                      Add More Subjects
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Add More Book Series Button */}
              <button 
                className="add-more-btn" 
                onClick={() => addBookSeries(classIndex)}
              >
                Add More Book Series
              </button>
            </div>
          ))
        )}
      </div>

      {/* Submit Section */}
      <div className="submit-section">
        <button 
          className="submit-btn" 
          onClick={handleSubmit}
          disabled={!hasValidData}
        >
          Submit 
        </button>
        {!hasValidData && assignedClasses.length > 0 && (
          <p style={{color: '#666', marginTop: '10px'}}>
            Please assign at least one book series with subjects to enable submission.
          </p>
        )}
      </div>
    </div>
  );
};

export default Digital;