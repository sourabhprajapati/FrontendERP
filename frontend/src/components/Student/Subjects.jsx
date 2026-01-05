import "./Subjects.css";
import SubjectsProgressTable from "./SubjectsProgressTable";
import { useEffect, useRef, useState } from "react";

const subjects = [
  {
    title: "Hindi",
    subtitle: "Hindi Vasudha",
    image: "/images/Hindi vasudha-1_Cover.jpg",
  },
  {
    title: "English",
    subtitle: "English Knights",
    image : "/images/English knights-1 Cover.jpg",
  },
  {
    title: "Mathematics",
    subtitle: "Number Players",
    image: "/images/Number Players 1 Cover.jpg",
  },
  {
    title: "Science",
    subtitle: "Science Marvels",
    image: "/images/Science Marvel-1_Cover.jpg",
  },
  {
    title: "Social Studies",
    subtitle: "Discover The World",
    image: "/images/Discover the World 1 Cover.jpg",
  },
  {
    title: "General Knowledge",
    subtitle: "The wise quacks",
    image: "/images/The Wise Quacks (GK) 1 Cover.jpg",
  },
  {
    title: "Hindi Grammar",
    subtitle: "Vyakran Sudha",
    image: "/images/Vyakran Sudha 1 Cover.jpg",
  },
  {
    title: "English Grammar",
    subtitle: "The Grammar Fledge",
    image: "/images/English Grammar Fledge-1_Cover.jpg",
  },
  {
    title: "Moral Value",
    subtitle: "Shaping Values",
    image: "/images/Shaping Values class 1_Cover.jpg",
  },
  {
    title: "Computer World",
    subtitle: "Tech Ninja",
    image: "/images/Tech Ninja Class-1 Cover.jpg",
  },
];

const continueWatching = [
  // no content by default
 
];

export default function Subjects() {
  const [continueWatchingHeight, setContinueWatchingHeight] = useState(0);
  const [activeTab, setActiveTab] = useState('subjects');
  const continueRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      if (continueRef.current) {
        const height = continueRef.current.offsetHeight;
        setContinueWatchingHeight(height);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const hasScrollbar = continueWatchingHeight > window.innerHeight * 0.6;

  return (
    <div className="subjects-main-row">
      <div className="subjects-container">
        <div className="subject-title">My Courses</div>
        <div className="subject-sub">ACADEMIC</div>
        <div className="subjects-grid">
          {subjects.map((sub, i) => (
            <div className="subject-card" key={i}>
              <img className="subject-img" src={sub.image} alt={sub.title} />
              <div className="subject-card-body">
                <div className="subject-name">{sub.title}</div>
                <div className="subject-subtitle">{sub.subtitle}</div>
                <button className="course-btn">View Course</button>
                <button className="content-btn">View Content</button>
              </div>
            </div>
          ))}
        </div>
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === 'subjects' ? 'active' : ''}`}
            onClick={() => setActiveTab('subjects')}
          >
            Subjects
          </button>
          <button
            className={`tab-button ${activeTab === 'talent-box' ? 'active' : ''}`}
            onClick={() => setActiveTab('talent-box')}
          >
            Talent Box
          </button>
        </div>

        {/* Progress Table below the cards grid */}
        {activeTab === 'subjects' && (
          <SubjectsProgressTable hasScrollbar={hasScrollbar} />
        )}
        {activeTab === 'talent-box' && (
          <SubjectsProgressTable hasScrollbar={hasScrollbar} />
        )}
      </div>
      <aside className="continue-column" ref={continueRef}>
        <div className="continue-title">Continue Watching</div>
        {continueWatching.length === 0 ? (
          <div className="continue-null">Nothing to continue. Explore more!</div>
        ) : (
          <ul>
            {continueWatching.map((item, i) => (
              <li key={i} className="continue-card">
                {/* watched items */}
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}
