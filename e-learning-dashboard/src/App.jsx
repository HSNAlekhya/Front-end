import { useMemo, useState } from "react";
import "./App.css";

const initialCourses = [
  {
    id: 1,
    title: "Complete React Development",
    category: "Development",
    instructor: "Sarah Johnson",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    progress: 75,
    completed: 18,
    lessons: 24,
    duration: "12 hours",
    level: "Intermediate",
    color: "purple",
    description:
      "Learn React fundamentals, components, hooks, state management, and modern frontend development.",
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    category: "Design",
    instructor: "Michael Chen",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    progress: 45,
    completed: 9,
    lessons: 20,
    duration: "8 hours",
    level: "Beginner",
    color: "pink",
    description:
      "Explore design principles, wireframes, prototypes, and user-centered design.",
  },
  {
    id: 3,
    title: "Python Programming Masterclass",
    category: "Programming",
    instructor: "David Miller",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800",
    progress: 90,
    completed: 27,
    lessons: 30,
    duration: "15 hours",
    level: "Intermediate",
    color: "blue",
    description:
      "Build a strong foundation in Python, functions, object-oriented programming, and projects.",
  },
  {
    id: 4,
    title: "Digital Marketing Essentials",
    category: "Marketing",
    instructor: "Emily Wilson",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    progress: 100,
    completed: 16,
    lessons: 16,
    duration: "6 hours",
    level: "Beginner",
    color: "orange",
    description:
      "Learn SEO, content marketing, social media strategies, and digital campaign fundamentals.",
  },
  {
    id: 5,
    title: "Data Analytics with Python",
    category: "Programming",
    instructor: "Alex Morgan",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    progress: 25,
    completed: 5,
    lessons: 20,
    duration: "10 hours",
    level: "Beginner",
    color: "green",
    description:
      "Understand data analysis, visualization, and working with datasets using Python.",
  },
  {
    id: 6,
    title: "Advanced Web Design",
    category: "Design",
    instructor: "Sophia Brown",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    progress: 60,
    completed: 12,
    lessons: 20,
    duration: "9 hours",
    level: "Advanced",
    color: "teal",
    description:
      "Improve your web design skills through layouts, responsive design, and visual systems.",
  },
];

const initialCertificates = [
  {
    id: 1,
    title: "HTML & CSS Fundamentals",
    issuer: "LearnSpace Academy",
    date: "August 2026",
    code: "LS-HTML-2026-001",
    icon: "🌐",
  },
  {
    id: 2,
    title: "JavaScript Essentials",
    issuer: "LearnSpace Academy",
    date: "September 2026",
    code: "LS-JS-2026-002",
    icon: "⚡",
  },
];

const menuItems = [
  { id: "Dashboard", icon: "▦" },
  { id: "My Courses", icon: "▤" },
  { id: "Certificates", icon: "♧" },
  { id: "My Progress", icon: "◷" },
];

function App() {
  const [page, setPage] = useState("Dashboard");
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [lessonCourse, setLessonCourse] = useState(null);
  const [lessonNumber, setLessonNumber] = useState(1);

  const certificates = initialCertificates;

  const completedCourses = courses.filter(
    (course) => course.progress === 100
  ).length;

  const overallProgress = Math.round(
    courses.reduce((total, course) => total + course.progress, 0) /
      courses.length
  );

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || course.category === category;

      const matchesPage =
        page !== "My Courses" || course.progress < 100;

      return matchesSearch && matchesCategory && matchesPage;
    });
  }, [courses, search, category, page]);

  function notify(text) {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2800);
  }

  function continueLearning(course) {
    setLessonCourse(course);
    setLessonNumber(course.completed + 1);
    setSelectedCourse(null);
  }

  function completeLesson() {
    if (!lessonCourse) return;

    setCourses((previous) =>
      previous.map((course) => {
        if (course.id !== lessonCourse.id) return course;

        const completed = Math.min(
          course.completed + 1,
          course.lessons
        );

        return {
          ...course,
          completed,
          progress: Math.round((completed / course.lessons) * 100),
        };
      })
    );

    setLessonCourse(null);
    notify("Lesson progress updated successfully!");
  }

  function downloadCertificate(certificate) {
    const certificateText = [
      "CERTIFICATE OF COMPLETION",
      "",
      `This certificate is awarded for completing: ${certificate.title}`,
      `Issued by: ${certificate.issuer}`,
      `Completion date: ${certificate.date}`,
      `Certificate ID: ${certificate.code}`,
      "",
      "Note: This is a sample certificate generated by a frontend demo.",
    ].join("\n");

    const blob = new Blob([certificateText], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${certificate.title
      .toLowerCase()
      .replaceAll(" ", "-")}-certificate.txt`;

    link.click();
    URL.revokeObjectURL(url);

    notify("Sample certificate downloaded!");
  }

  function renderCourses() {
    return (
      <>
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR LEARNING JOURNEY</p>
            <h2>
              {page === "My Courses"
                ? "My Courses"
                : "Explore Your Courses"}
            </h2>
            <p className="muted">
              Keep learning and move closer to your goals.
            </p>
          </div>

          <span className="course-count">
            {filteredCourses.length} courses
          </span>
        </div>

        <div className="filters">
          <div className="search-box">
            <span>⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search courses or instructors..."
              aria-label="Search courses"
            />
          </div>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Filter by category"
          >
            <option value="All">All Categories</option>
            <option value="Development">Development</option>
            <option value="Programming">Programming</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="empty-state">
            <span>🔎</span>
            <h3>No courses found</h3>
            <p>Try another search term or category.</p>
            <button
              className="secondary-button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="course-grid">
            {filteredCourses.map((course) => (
              <article className="course-card" key={course.id}>
                <div className="course-image">
                  <img src={course.image} alt={course.title} />
                  <span className={`category-tag ${course.color}`}>
                    {course.category}
                  </span>
                  {course.progress === 100 && (
                    <span className="finished-tag">✓ Completed</span>
                  )}
                </div>

                <div className="course-body">
                  <div className="course-meta">
                    <span>◷ {course.duration}</span>
                    <span>{course.level}</span>
                  </div>

                  <h3>{course.title}</h3>
                  <p className="instructor">
                    Instructor: {course.instructor}
                  </p>

                  <div className="progress-label">
                    <span>Course progress</span>
                    <strong>{course.progress}%</strong>
                  </div>

                  <div
                    className="progress-track"
                    role="progressbar"
                    aria-valuenow={course.progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label={`${course.title} progress`}
                  >
                    <div
                      className="progress-fill"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <p className="lesson-count">
                    {course.completed} of {course.lessons} lessons completed
                  </p>

                  <div className="course-actions">
                    <button
                      className="primary-button"
                      onClick={() => continueLearning(course)}
                    >
                      {course.progress === 100
                        ? "Review Course"
                        : "Continue Learning"}
                    </button>

                    <button
                      className="icon-button"
                      onClick={() => setSelectedCourse(course)}
                      aria-label={`View details for ${course.title}`}
                      title="Course details"
                    >
                      ↗
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </>
    );
  }

  function renderCertificates() {
    return (
      <>
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR ACHIEVEMENTS</p>
            <h2>My Certificates</h2>
            <p className="muted">
              Celebrate the skills and courses you have completed.
            </p>
          </div>
          <span className="course-count">
            {certificates.length} certificates
          </span>
        </div>

        <div className="certificate-grid">
          {certificates.map((certificate) => (
            <article className="certificate-card" key={certificate.id}>
              <div className="certificate-art">
                <span className="certificate-icon">
                  {certificate.icon}
                </span>
                <span className="certificate-seal">★</span>
                <p>LEARNSPACE ACADEMY</p>
                <h3>Certificate of Completion</h3>
                <span>AWARDED TO THE LEARNER</span>
              </div>

              <div className="certificate-details">
                <h3>{certificate.title}</h3>
                <p>{certificate.issuer}</p>
                <div className="certificate-date">
                  <span>Completed</span>
                  <strong>{certificate.date}</strong>
                </div>
                <button
                  className="primary-button full-width"
                  onClick={() => downloadCertificate(certificate)}
                >
                  ↓ Download Sample Certificate
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="info-banner">
          <span>🏆</span>
          <div>
            <h3>Keep building your achievements!</h3>
            <p>
              Complete an enrolled course to increase your progress and
              work toward more certificates.
            </p>
          </div>
        </div>
      </>
    );
  }

  function renderProgress() {
    return (
      <>
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR PERFORMANCE</p>
            <h2>Learning Progress</h2>
            <p className="muted">
              Track your course completion and learning activity.
            </p>
          </div>
        </div>

        <div className="stats-grid">
          <StatCard
            icon="▤"
            label="Enrolled Courses"
            value={courses.length}
            color="purple"
          />
          <StatCard
            icon="✓"
            label="Completed Courses"
            value={completedCourses}
            color="green"
          />
          <StatCard
            icon="◷"
            label="Overall Progress"
            value={`${overallProgress}%`}
            color="blue"
          />
          <StatCard
            icon="♧"
            label="Certificates"
            value={certificates.length}
            color="orange"
          />
        </div>

        <section className="panel progress-panel">
          <h3>Course-by-course progress</h3>

          {courses.map((course) => (
            <div className="progress-row" key={course.id}>
              <img src={course.image} alt="" />
              <div className="progress-row-content">
                <div className="progress-row-title">
                  <strong>{course.title}</strong>
                  <span>{course.progress}%</span>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <small>
                  {course.completed} / {course.lessons} lessons completed
                </small>
              </div>
            </div>
          ))}
        </section>
      </>
    );
  }

  function renderDashboard() {
    return (
      <>
        <section className="welcome-banner">
          <div className="welcome-content">
            <span className="welcome-label">THURSDAY, OCTOBER 8, 2026</span>
            <h2>Welcome back, Alekhya! 👋</h2>
            <p>
              Every lesson takes you one step closer to your goals.
              Keep up the great work!
            </p>

            <button
              className="welcome-button"
              onClick={() => {
                setPage("My Courses");
                setCategory("All");
                setSearch("");
              }}
            >
              Continue Learning <span>→</span>
            </button>
          </div>

          <div className="welcome-illustration" aria-hidden="true">
            <span className="illustration-circle">🎓</span>
            <span className="floating-star">✦</span>
            <span className="floating-book">📚</span>
          </div>
        </section>

        <div className="stats-grid">
          <StatCard
            icon="▤"
            label="Enrolled Courses"
            value={courses.length}
            color="purple"
            note="+2 this month"
          />
          <StatCard
            icon="✓"
            label="Completed Courses"
            value={completedCourses}
            color="green"
            note="Great achievement!"
          />
          <StatCard
            icon="◷"
            label="Overall Progress"
            value={`${overallProgress}%`}
            color="blue"
            note="Across all courses"
          />
          <StatCard
            icon="♧"
            label="Certificates"
            value={certificates.length}
            color="orange"
            note="Achievements earned"
          />
        </div>

        <div className="section-heading dashboard-heading">
          <div>
            <h2>Continue Learning</h2>
            <p className="muted">
              Pick up where you left off.
            </p>
          </div>

          <button
            className="text-button"
            onClick={() => setPage("My Courses")}
          >
            View all courses →
          </button>
        </div>

        <div className="course-grid">
          {courses
            .filter((course) => course.progress < 100)
            .slice(0, 3)
            .map((course) => (
              <article className="course-card" key={course.id}>
                <div className="course-image">
                  <img src={course.image} alt={course.title} />
                  <span className={`category-tag ${course.color}`}>
                    {course.category}
                  </span>
                </div>

                <div className="course-body">
                  <div className="course-meta">
                    <span>◷ {course.duration}</span>
                    <span>{course.level}</span>
                  </div>

                  <h3>{course.title}</h3>
                  <p className="instructor">
                    Instructor: {course.instructor}
                  </p>

                  <div className="progress-label">
                    <span>Progress</span>
                    <strong>{course.progress}%</strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <button
                    className="primary-button full-width"
                    onClick={() => continueLearning(course)}
                  >
                    Continue Learning →
                  </button>
                </div>
              </article>
            ))}
        </div>

        <section className="panel achievement-panel">
          <div>
            <p className="eyebrow">YOUR ACHIEVEMENTS</p>
            <h3>You're making progress!</h3>
            <p className="muted">
              You have earned {certificates.length} sample certificates.
              Keep learning to unlock more achievements.
            </p>
          </div>

          <button
            className="secondary-button"
            onClick={() => setPage("Certificates")}
          >
            View Certificates
          </button>
        </section>
      </>
    );
  }

  return (
    <div className="app-layout">
      {sidebarOpen && (
        <button
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <span className="brand-icon">L</span>
          <span>
            Learn<span className="brand-highlight">Space</span>
          </span>
        </div>

        <div className="student-card">
          <div className="avatar">AG</div>
          <div>
            <strong>Alekhya Gorthi</strong>
            <span>Student Account</span>
          </div>
        </div>

        <p className="menu-label">LEARNING MENU</p>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${
                page === item.id ? "nav-active" : ""
              }`}
              onClick={() => {
                setPage(item.id);
                setSearch("");
                setCategory("All");
                setSidebarOpen(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.id}</span>
              {page === item.id && <span className="active-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <span className="help-icon">💡</span>
            <h4>Need some help?</h4>
            <p>Keep learning. Your next achievement is waiting!</p>
            <button
              onClick={() =>
                notify("Help: Continue Learning opens your enrolled courses.")
              }
            >
              Learning tips →
            </button>
          </div>

          <button
            className={`nav-item ${page === "Settings" ? "nav-active" : ""}`}
            onClick={() => {
              setPage("Settings");
              setSidebarOpen(false);
            }}
          >
            <span className="nav-icon">⚙</span>
            Settings
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
          >
            ☰
          </button>

          <div className="breadcrumb">
            <span>LearnSpace</span>
            <span>/</span>
            <strong>{page}</strong>
          </div>

          <div className="topbar-actions">
            <button
              className="notification-button"
              onClick={() => {
                setShowNotifications((previous) => !previous);
                setShowProfile(false);
              }}
              aria-label="Notifications"
            >
              ♧<span className="notification-dot" />
            </button>

            <button
              className="topbar-profile"
              onClick={() => {
                setShowProfile((previous) => !previous);
                setShowNotifications(false);
              }}
            >
              <span className="avatar small-avatar">AG</span>
              <span className="profile-name">Alekhya Gorthi</span>
              <span>⌄</span>
            </button>

            {showNotifications && (
              <div className="popover notification-popover">
                <h3>Notifications</h3>
                <p>📚 Your React course is {courses[0].progress}% complete.</p>
                <p>🏆 You have {certificates.length} sample certificates.</p>
                <p>✨ Keep learning to reach your goals!</p>
              </div>
            )}

            {showProfile && (
              <div className="popover profile-popover">
                <div className="avatar">AG</div>
                <h3>Alekhya Gorthi</h3>
                <p>student@example.com</p>
                <button
                  className="secondary-button full-width"
                  onClick={() => {
                    setShowProfile(false);
                    setPage("Profile");
                  }}
                >
                  View Profile
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="page-content">
          {page === "Dashboard" && renderDashboard()}
          {page === "My Courses" && renderCourses()}
          {page === "Certificates" && renderCertificates()}
          {page === "My Progress" && renderProgress()}

          {page === "Settings" && (
            <section className="panel settings-panel">
              <p className="eyebrow">PREFERENCES</p>
              <h2>Settings</h2>
              <p className="muted">
                Manage your learning experience.
              </p>

              <label className="setting-row">
                <span>
                  <strong>Course reminders</strong>
                  <small>Receive reminders to continue learning.</small>
                </span>
                <input type="checkbox" defaultChecked />
              </label>

              <label className="setting-row">
                <span>
                  <strong>Learning updates</strong>
                  <small>Receive updates about your courses.</small>
                </span>
                <input type="checkbox" defaultChecked />
              </label>

              <label className="setting-row">
                <span>
                  <strong>Achievement notifications</strong>
                  <small>Get notified when you reach milestones.</small>
                </span>
                <input type="checkbox" defaultChecked />
              </label>

              <button
                className="primary-button"
                onClick={() => notify("Settings saved for this session.")}
              >
                Save Settings
              </button>
            </section>
          )}

          {page === "Profile" && (
            <section className="panel profile-panel">
              <div className="large-avatar">AG</div>
              <h2>Alekhya Gorthi</h2>
              <p className="muted">E-Learning Student</p>
              <div className="profile-details">
                <p><strong>Email:</strong> student@example.com</p>
                <p><strong>Enrolled courses:</strong> {courses.length}</p>
                <p><strong>Certificates:</strong> {certificates.length}</p>
                <p><strong>Overall progress:</strong> {overallProgress}%</p>
              </div>
              <button
                className="secondary-button"
                onClick={() => setPage("Dashboard")}
              >
                Back to Dashboard
              </button>
            </section>
          )}
        </div>
      </main>

      {selectedCourse && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedCourse(null)}
        >
          <section
            className="modal course-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-modal-title"
          >
            <button
              className="modal-close"
              onClick={() => setSelectedCourse(null)}
              aria-label="Close"
            >
              ×
            </button>

            <img src={selectedCourse.image} alt="" />
            <p className="eyebrow">{selectedCourse.category}</p>
            <h2 id="course-modal-title">{selectedCourse.title}</h2>
            <p className="muted">{selectedCourse.description}</p>
            <p><strong>Instructor:</strong> {selectedCourse.instructor}</p>
            <p><strong>Duration:</strong> {selectedCourse.duration}</p>
            <p><strong>Level:</strong> {selectedCourse.level}</p>
            <p><strong>Progress:</strong> {selectedCourse.progress}%</p>

            <button
              className="primary-button full-width"
              onClick={() => continueLearning(selectedCourse)}
            >
              Open Course
            </button>
          </section>
        </div>
      )}

      {lessonCourse && (
        <div className="modal-backdrop">
          <section className="modal lesson-modal" role="dialog" aria-modal="true">
            <button
              className="modal-close"
              onClick={() => setLessonCourse(null)}
              aria-label="Close"
            >
              ×
            </button>

            <p className="eyebrow">NOW LEARNING</p>
            <h2>{lessonCourse.title}</h2>
            <div className="lesson-placeholder">
              <span>▶</span>
              <p>Lesson {Math.min(lessonNumber, lessonCourse.lessons)}</p>
              <small>Sample lesson preview</small>
            </div>

            <p className="muted">
              This is a demonstration lesson screen. A real course can
              display video, reading materials, and quizzes here.
            </p>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${lessonCourse.progress}%` }}
              />
            </div>

            <p className="muted">
              Current progress: {lessonCourse.progress}%
            </p>

            {lessonCourse.progress < 100 ? (
              <button
                className="primary-button full-width"
                onClick={completeLesson}
              >
                Mark Lesson as Completed ✓
              </button>
            ) : (
              <button
                className="primary-button full-width"
                onClick={() => {
                  setLessonCourse(null);
                  notify("You have completed this course!");
                }}
              >
                Finish Review
              </button>
            )}
          </section>
        </div>
      )}

      {message && (
        <div className="toast" role="status">
          <span>✓</span> {message}
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color, note }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span className={`stat-icon ${color}`}>{icon}</span>
        <span className="stat-decoration">↗</span>
      </div>
      <p>{label}</p>
      <h3>{value}</h3>
      <span className="stat-note">{note || "Updated just now"}</span>
    </article>
  );
}

export default App;