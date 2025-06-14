import React, { useState, useMemo, useEffect } from "react";

interface Course {
  id: number;
  title: string;
  category: string;
  level: string;
  description: string;
  imageUrl: string;
  progress: number; // 0-100
}

interface Notification {
  id: number;
  message: string;
  date: string;
  read: boolean;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
}

const coursesData: Course[] = [
  {
    id: 1,
    title: "React for Beginners",
    category: "Development",
    level: "Beginner",
    description: "Learn React basics, JSX, hooks, and component lifecycle.",
    imageUrl:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2a441678-230a-4184-8cb8-ddec0b7666ac.png",
    progress: 40,
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    category: "Development",
    level: "Advanced",
    description: "Deep dive into modern JavaScript ES6+ features and patterns.",
    imageUrl:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7a0403fc-431f-4673-be7b-c3b101cbf877.png",
    progress: 10,
  },
  {
    id: 3,
    title: "UI/UX Design Essentials",
    category: "Design",
    level: "Intermediate",
    description:
      "Master the basics of user interface and user experience design.",
    imageUrl:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bcfd7f33-483a-44f5-bc34-699a5c9017d6.png",
    progress: 80,
  },
  {
    id: 4,
    title: "Data Science with Python",
    category: "Data Science",
    level: "Beginner",
    description:
      "Start your journey with Python for data analysis and visualization.",
    imageUrl:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a631711d-73e0-4d89-a988-624bc394386a.png",
    progress: 5,
  },
  {
    id: 5,
    title: "Machine Learning A-Z",
    category: "Data Science",
    level: "Advanced",
    description: "Comprehensive course covering algorithms and use cases.",
    imageUrl:
      "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3262101d-3dd3-468a-a22a-6a0b3750088a.png",
    progress: 0,
  },
];

const notificationsData: Notification[] = [
  {
    id: 1,
    message: 'New course "React Native" added!',
    date: "2024-06-01",
    read: false,
  },
  {
    id: 2,
    message: "Achievement unlocked: Completed 3 courses.",
    date: "2024-05-20",
    read: true,
  },
  {
    id: 3,
    message: "Upcoming webinar: Modern UI/UX Trends, June 15.",
    date: "2024-06-05",
    read: false,
  },
];

const achievementsData: Achievement[] = [
  {
    id: 1,
    title: "React for Beginners - Completed",
    description: "Successfully completed React fundamentals course.",
    date: "2024-05-10",
  },
  {
    id: 2,
    title: "UI/UX Design Essentials - Passed",
    description: "Achieved 85% score on UI/UX design project.",
    date: "2024-05-15",
  },
];

const categories = ["All", "Development", "Design", "Data Science"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export const LearningHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData);

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".header-controls") && !target.closest(".panel")) {
        setShowNotifications(false);
        setShowAchievements(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter and search courses
  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "All" || course.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchTerm, selectedCategory, selectedLevel]);

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Mark notifications read handler
  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background:rgba(249, 250, 251, 0.51);
          color: #111827;
        }
        /* Header full width with padding */
        .full-width-header {
          position: sticky;
          top: 0;
          background: #ede9de;
          color: black;
          padding: 12px 24px;
          box-shadow: 0 2px 10px rgba(79,70,229,0.3);
          z-index: 110;
          display: flex;
          justify-content: center;
          width: 100vw;
          left: 0;
          overflow-x: hidden;
        }
        .header-inner-container {
          max-width: 1200px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .header-logo-container {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
          user-select: none;
        }
        .header-logo {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 800;
          font-size: 20px;
          color: #4f46e5;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .header-title {
          font-weight: 700;
          font-size: 1.5rem;
          white-space: nowrap;
        }
        .header-search-input {
          flex: 1 1 300px;
          max-width: 480px;
          min-width: 220px;
          padding: 10px 16px;
          border-radius: 12px;
          border: none;
          font-size: 1rem;
          transition: box-shadow 0.3s ease;
        }
        .header-search-input:focus {
          outline: none;
          box-shadow: 0 0 15px rgb(201, 199, 255);
        }
        .header-controls {
          display: flex;
          gap: 24px;
          align-items: center;
          white-space: nowrap;
          position: relative;
          z-index: 210; /* Higher z-index to overlay main content */
        }
        .icon-button {
          background: transparent;
          border: none;
          cursor: pointer;
          color: black;
          font-weight: 600;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: 12px;
          padding: 6px 14px;
          transition: background-color 0.3s ease;
          position: relative;
        }
        .icon-button .material-icons {
          font-size: 24px;
        }
        .icon-button:hover,
        .icon-button:focus {
          background-color: rgba(255, 255, 255, 0.53);
          outline: none;
        }
        .badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background-color: #ef4444;
          color: white;
          border-radius: 50%;
          font-size: 0.65rem;
          width: 18px;
          height: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
          pointer-events: none;
          user-select: none;
          transition: transform 0.3s ease;
          transform-origin: center;
        }
        .badge-pop {
          animation: popScale 0.4s ease forwards;
        }
        @keyframes popScale {
          0% {
            transform: scale(0);
          }
          70% {
            transform: scale(1.4);
          }
          100% {
            transform: scale(1);
          }
        }
        /* Centered Panel styling */
        .panel {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 50vw;
          max-width: 600px;
          max-height: 70vh;
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
          overflow-y: auto;
          padding: 24px 32px;
          z-index: 9999;
          transform: translate(-50%, -50%);
          animation: fadeInScale 0.3s ease forwards;
          color: #111827;
          will-change: transform, opacity;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translate(-50%, -60%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        .panel h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 24px;
          text-align: center;
        }
        .notification-list, .achievement-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .notification-item, .achievement-item {
          background: #f3f4f6;
          border-radius: 14px;
          padding: 16px 20px;
          box-shadow: 0 0 12px rgba(0,0,0,0.07);
        }
        .notification-item.unread {
          background: #e0e7ff;
          font-weight: 600;
        }
        .notification-date, .achievement-date {
          font-size: 0.75rem;
          color: #6b7280;
          margin-top: 8px;
        }
        /* Sidebar and main content layout */
        .main-content-container {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 32px;
          max-width: 1200px;
          margin: 24px auto 32px;
          padding: 0 24px 32px;
        }
        @media (max-width: 768px) {
          .main-content-container {
            display: block;
            margin: 24px auto 32px;
            padding: 0 16px 32px;
          }
          .sidebar {
            position: relative;
            top: auto;
            margin-bottom: 32px;
          }
        }
        .sidebar {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          gap: 24px;
          height: fit-content;
          position: sticky;
          top: 120px; /* account for larger header + spacing */
        }
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .filter-group label {
          font-weight: 600;
          font-size: 1.05rem;
          color: #374151;
        }
        .filter-options {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .filter-button {
          padding: 8px 16px;
          border-radius: 12px;
          cursor: pointer;
          border: 1.5px solid #d1d5db;
          background-color: #f3f4f6;
          font-weight: 600;
          font-size: 0.9rem;
          color: #4b5563;
          user-select: none;
          transition: background-color 0.3s ease, border-color 0.3s ease,color 0.3s ease;
        }
        .filter-button:hover {
          background-color: #e0e7ff;
          border-color: #746b66;
          color: #8f8984;
        }
        .filter-button.selected {
          background-color: #8f8984;
          border-color: #746b66;
          color: #ffffff;
          cursor: default;
        }
        /* Courses grid */
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(280px,1fr));
          gap: 32px;
        }
        .course-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.07);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .course-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.15);
        }
        .course-image {
          border-radius: 16px 16px 0 0;
          width: 100%;
          height: 140px;
          object-fit: cover;
        }
        .course-content {
          padding: 20px 24px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .course-title {
          font-weight: 700;
          font-size: 1.1rem;
          color: #111827;
          margin-bottom: 8px;
        }
        .course-category-level {
          font-size: 0.85rem;
          color: #6b7280;
          margin-bottom: 12px;
          font-weight: 600;
        }
        .course-description {
          flex-grow: 1;
          font-size: 0.9rem;
          color: #4b5563;
          margin-bottom: 16px;
        }
        .progress-bar-container {
          background-color: #e5e7eb;
          border-radius: 8px;
          height: 12px;
          width: 100%;
          overflow: hidden;
          margin-top: auto;
        }
        .progress-bar {
          height: 100%;
          background-color:#8f8984;
          border-radius: 8px 0 0 8px;
          transition: width 0.4s ease;
        }
        .empty-state {
          text-align: center;
          padding: 80px 0;
          color: #9ca3af;
          font-size: 1.25rem;
          user-select: none;
        }
        /* Responsive header adjustments */
        @media (max-width: 640px) {
          .header-inner-container {
            flex-wrap: wrap;
            gap: 12px;
          }
          .header-logo-container,
          .header-controls {
            flex: 1 1 100%;
            justify-content: center;
          }
          .header-title {
            display: none;
          }
          .header-search-input {
            flex: 1 1 100%;
            max-width: 100%;
          }
          .icon-button {
            padding: 10px 8px;
          }
        }
      `}</style>

      {/* Full width header */}
      <header
        className="full-width-header"
        role="banner"
        aria-label="Main site header"
      >
        <div className="header-inner-container">
          <div className="header-logo-container">
            {/* <div className="header-logo" aria-hidden="true">
              LH
            </div> */}
            <img
              src={`${process.env.PUBLIC_URL}/logo.jpg`}
              alt="Your Company Logo"
              className="header-logo"
            />

            <h1 className="header-title">Learning Hub</h1>
          </div>
          <input
            type="search"
            placeholder="Search courses"
            className="header-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search courses"
            autoComplete="off"
          />
          <nav className="header-controls" aria-label="User actions">
            <div>
              <button
                className="icon-button"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowAchievements(false);
                }}
                aria-haspopup="true"
                aria-expanded={showNotifications}
                aria-label={`Notifications (${unreadCount} unread)`}
              >
                <span className="material-icons" aria-hidden="true">
                  notifications
                </span>
                Notifications
                {unreadCount > 0 && (
                  <span
                    className="badge badge-pop"
                    aria-live="polite"
                    aria-label={`${unreadCount} unread notifications`}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div
                  className="panel"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Notifications panel"
                >
                  <h2>Notifications</h2>
                  {notifications.length === 0 && <p>No notifications</p>}
                  <div className="notification-list">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`notification-item ${
                          n.read ? "" : "unread"
                        }`}
                      >
                        <p>{n.message}</p>
                        <time className="notification-date" dateTime={n.date}>
                          {new Date(n.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                    ))}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      style={{
                        marginTop: "12px",
                        backgroundColor: "#4f46e5",
                        border: "none",
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                      onClick={markAllRead}
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
              )}
            </div>

            <div>
              <button
                className="icon-button"
                onClick={() => {
                  setShowAchievements(!showAchievements);
                  setShowNotifications(false);
                }}
                aria-haspopup="true"
                aria-expanded={showAchievements}
                aria-label="Achievements"
              >
                <span className="material-icons" aria-hidden="true">
                  emoji_events
                </span>
                Achievements
              </button>
              {showAchievements && (
                <div
                  className="panel"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Achievements panel"
                >
                  <h2>Achievements</h2>
                  {achievementsData.length === 0 && <p>No achievements yet</p>}
                  <div className="achievement-list">
                    {achievementsData.map((a) => (
                      <div key={a.id} className="achievement-item">
                        <p style={{ fontWeight: "700" }}>{a.title}</p>
                        <p>{a.description}</p>
                        <time className="achievement-date" dateTime={a.date}>
                          {new Date(a.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Sidebar + main content container */}
      <main className="main-content-container">
        <aside className="sidebar" aria-label="Filters">
          <div
            className="filter-group"
            role="region"
            aria-labelledby="category-filter-label"
          >
            <label id="category-filter-label">Category</label>
            <div className="filter-options" role="list">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-button ${
                    selectedCategory === cat ? "selected" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={selectedCategory === cat}
                  role="listitem"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div
            className="filter-group"
            role="region"
            aria-labelledby="level-filter-label"
          >
            <label id="level-filter-label">Level</label>
            <div className="filter-options" role="list">
              {levels.map((level) => (
                <button
                  key={level}
                  className={`filter-button ${
                    selectedLevel === level ? "selected" : ""
                  }`}
                  onClick={() => setSelectedLevel(level)}
                  aria-pressed={selectedLevel === level}
                  role="listitem"
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section aria-label="Courses and activity content">
          {filteredCourses.length > 0 ? (
            <div className="courses-grid" aria-live="polite">
              {filteredCourses.map((course) => (
                <article
                  key={course.id}
                  className="course-card"
                  tabIndex={0}
                  aria-labelledby={`course-title-${course.id}`}
                >
                  <img
                    src={course.imageUrl}
                    alt={`Course cover: ${course.title}`}
                    className="course-image"
                    width={280}
                    height={140}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8de7f923-9b26-4ccd-a8f1-f9fd1d773e5f.png";
                    }}
                  />
                  <div className="course-content">
                    <h3
                      id={`course-title-${course.id}`}
                      className="course-title"
                    >
                      {course.title}
                    </h3>
                    <div
                      className="course-category-level"
                      aria-label="Category and level"
                    >
                      {course.category} &middot; {course.level}
                    </div>
                    <p className="course-description">{course.description}</p>
                    <div
                      className="progress-bar-container"
                      aria-label={`Progress: ${course.progress} percent`}
                    >
                      <div
                        className="progress-bar"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state" role="alert">
              No courses match your search and filter criteria.
            </div>
          )}
        </section>
      </main>

      {/* Material Icons Link */}
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
        aria-hidden="true"
      />
    </>
  );
};

export default LearningHub;
