import { useMemo, useState } from "react";
import "./App.css";

const courses = [
  {
    id: 1,
    code: "CS101",
    name: "Web Development",
    instructor: "Dr. Priya Sharma",
    credits: 4,
    attendance: 92,
    grade: "A",
    marks: 88,
    progress: 82,
    icon: "💻",
  },
  {
    id: 2,
    code: "CS102",
    name: "Database Management",
    instructor: "Prof. Raj Kumar",
    credits: 4,
    attendance: 87,
    grade: "A",
    marks: 84,
    progress: 76,
    icon: "🗄️",
  },
  {
    id: 3,
    code: "CS103",
    name: "Data Structures",
    instructor: "Dr. Anil Reddy",
    credits: 3,
    attendance: 78,
    grade: "B+",
    marks: 79,
    progress: 68,
    icon: "🧩",
  },
  {
    id: 4,
    code: "CS104",
    name: "Computer Networks",
    instructor: "Prof. Sneha Rao",
    credits: 3,
    attendance: 90,
    grade: "A",
    marks: 91,
    progress: 88,
    icon: "🌐",
  },
  {
    id: 5,
    code: "CS105",
    name: "Operating Systems",
    instructor: "Dr. Ravi Teja",
    credits: 4,
    attendance: 82,
    grade: "B+",
    marks: 81,
    progress: 72,
    icon: "⚙️",
  },
  {
    id: 6,
    code: "CS106",
    name: "Software Engineering",
    instructor: "Prof. Lakshmi",
    credits: 3,
    attendance: 95,
    grade: "A+",
    marks: 94,
    progress: 91,
    icon: "🚀",
  },
];

const activities = [
  {
    title: "Web Development marks updated",
    time: "2 hours ago",
    icon: "📝",
  },
  {
    title: "Database assignment submitted",
    time: "Yesterday",
    icon: "📤",
  },
  {
    title: "New course material available",
    time: "2 days ago",
    icon: "📚",
  },
  {
    title: "Attendance updated",
    time: "3 days ago",
    icon: "📅",
  },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredCourses = useMemo(() => {
    return courses.filter(
      (course) =>
        course.name.toLowerCase().includes(search.toLowerCase()) ||
        course.code.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const averageMarks = Math.round(
    courses.reduce((sum, course) => sum + course.marks, 0) / courses.length
  );

  const averageAttendance = Math.round(
    courses.reduce((sum, course) => sum + course.attendance, 0) /
      courses.length
  );

  const openPage = (page) => {
    setActivePage(page);
    setMenuOpen(false);
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className={`sidebar ${menuOpen ? "show" : ""}`}>
        <div className="logo">
          <div className="logo-icon">🎓</div>
          <div>
            <h2>EduTrack</h2>
            <span>Student Portal</span>
          </div>
        </div>

        <nav>
          <button
            className={activePage === "Dashboard" ? "active" : ""}
            onClick={() => openPage("Dashboard")}
          >
            <span>📊</span>
            Dashboard
          </button>

          <button
            className={activePage === "Courses" ? "active" : ""}
            onClick={() => openPage("Courses")}
          >
            <span>📚</span>
            Courses
          </button>

          <button
            className={activePage === "Marks" ? "active" : ""}
            onClick={() => openPage("Marks")}
          >
            <span>📈</span>
            Marks
          </button>

          <button
            className={activePage === "Attendance" ? "active" : ""}
            onClick={() => openPage("Attendance")}
          >
            <span>📅</span>
            Attendance
          </button>

          <button
            className={activePage === "Profile" ? "active" : ""}
            onClick={() => openPage("Profile")}
          >
            <span>👤</span>
            Profile
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="help-box">
            <div className="help-icon">💡</div>
            <h4>Need Help?</h4>
            <p>Contact your academic advisor.</p>
            <button>Contact Support</button>
          </div>

          <button className="logout">
            <span>🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <div>
            <h1>
              {activePage === "Dashboard"
                ? "Good Morning, Alekhya! 👋"
                : activePage}
            </h1>
            <p>
              {activePage === "Dashboard"
                ? "Here's what's happening with your studies today."
                : `Manage your ${activePage.toLowerCase()} information.`}
            </p>
          </div>

          <div className="topbar-right">
            <button className="notification">
              🔔
              <span></span>
            </button>

            <div
              className="profile-mini"
              onClick={() => openPage("Profile")}
            >
              <div className="avatar">AG</div>
              <div>
                <strong>Alekhya Gorthi</strong>
                <small>B.Tech - CSE</small>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard */}
        {activePage === "Dashboard" && (
          <Dashboard
            courses={courses}
            averageMarks={averageMarks}
            averageAttendance={averageAttendance}
            openPage={openPage}
            setSelectedCourse={setSelectedCourse}
          />
        )}

        {/* Courses */}
        {activePage === "Courses" && (
          <section className="page-section">
            <div className="section-heading">
              <div>
                <h2>My Courses</h2>
                <p>Courses enrolled for the current semester</p>
              </div>

              <div className="search-box">
                🔍
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="course-grid">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={() => setSelectedCourse(course)}
                />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="empty-state">
                <div>🔍</div>
                <h3>No courses found</h3>
                <p>Try searching with a different course name.</p>
              </div>
            )}
          </section>
        )}

        {/* Marks */}
        {activePage === "Marks" && (
          <MarksPage courses={courses} averageMarks={averageMarks} />
        )}

        {/* Attendance */}
        {activePage === "Attendance" && (
          <AttendancePage
            courses={courses}
            averageAttendance={averageAttendance}
          />
        )}

        {/* Profile */}
        {activePage === "Profile" && <ProfilePage />}
      </main>

      {/* Course Modal */}
      {selectedCourse && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedCourse(null)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setSelectedCourse(null)}
            >
              ×
            </button>

            <div className="modal-icon">{selectedCourse.icon}</div>

            <h2>{selectedCourse.name}</h2>
            <p className="modal-code">{selectedCourse.code}</p>

            <div className="modal-info">
              <div>
                <span>Instructor</span>
                <strong>{selectedCourse.instructor}</strong>
              </div>

              <div>
                <span>Credits</span>
                <strong>{selectedCourse.credits}</strong>
              </div>

              <div>
                <span>Marks</span>
                <strong>{selectedCourse.marks}%</strong>
              </div>

              <div>
                <span>Grade</span>
                <strong>{selectedCourse.grade}</strong>
              </div>
            </div>

            <div className="progress-section">
              <div>
                <span>Course Progress</span>
                <strong>{selectedCourse.progress}%</strong>
              </div>

              <div className="progress-bar">
                <span
                  style={{ width: `${selectedCourse.progress}%` }}
                ></span>
              </div>
            </div>

            <button
              className="primary-btn"
              onClick={() => setSelectedCourse(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Dashboard({
  courses,
  averageMarks,
  averageAttendance,
  openPage,
  setSelectedCourse,
}) {
  return (
    <section className="dashboard">
      {/* Stats */}
      <div className="stats-grid">
        <StatCard
          icon="📚"
          title="Total Courses"
          value={courses.length}
          subtitle="Current semester"
        />

        <StatCard
          icon="📈"
          title="Average Marks"
          value={`${averageMarks}%`}
          subtitle="+4.5% from last semester"
        />

        <StatCard
          icon="📅"
          title="Attendance"
          value={`${averageAttendance}%`}
          subtitle="Above required 75%"
        />

        <StatCard
          icon="🏆"
          title="Current GPA"
          value="8.7"
          subtitle="Excellent performance"
        />
      </div>

      <div className="dashboard-grid">
        {/* Courses */}
        <div className="dashboard-card courses-card">
          <div className="card-header">
            <div>
              <h2>My Courses</h2>
              <p>Your current semester courses</p>
            </div>

            <button onClick={() => openPage("Courses")}>
              View All →
            </button>
          </div>

          <div className="course-list">
            {courses.slice(0, 4).map((course) => (
              <div
                className="course-row"
                key={course.id}
                onClick={() => setSelectedCourse(course)}
              >
                <div className="course-icon">{course.icon}</div>

                <div className="course-details">
                  <strong>{course.name}</strong>
                  <span>
                    {course.code} • {course.credits} Credits
                  </span>
                </div>

                <div className="course-grade">
                  <strong>{course.grade}</strong>
                  <span>{course.marks}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance */}
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h2>Attendance</h2>
              <p>Current attendance percentage</p>
            </div>

            <button onClick={() => openPage("Attendance")}>
              Details →
            </button>
          </div>

          <div className="attendance-circle">
            <div className="circle-inner">
              <strong>{averageAttendance}%</strong>
              <span>Overall</span>
            </div>
          </div>

          <div className="attendance-note">
            <span>✓</span>
            You're above the minimum required attendance.
          </div>
        </div>
      </div>

      {/* Marks + Activities */}
      <div className="dashboard-grid bottom-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h2>Marks Overview</h2>
              <p>Performance by subject</p>
            </div>

            <button onClick={() => openPage("Marks")}>
              View Details →
            </button>
          </div>

          <div className="marks-chart">
            {courses.slice(0, 5).map((course) => (
              <div className="bar-item" key={course.id}>
                <div className="bar-wrapper">
                  <div
                    className="bar"
                    style={{ height: `${course.marks}%` }}
                  >
                    <span>{course.marks}</span>
                  </div>
                </div>
                <small>{course.code}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h2>Recent Activity</h2>
              <p>Your latest updates</p>
            </div>
          </div>

          <div className="activity-list">
            {activities.map((activity, index) => (
              <div className="activity" key={index}>
                <div className="activity-icon">{activity.icon}</div>

                <div>
                  <strong>{activity.title}</strong>
                  <span>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>

      <div>
        <span>{title}</span>
        <h2>{value}</h2>
        <small>{subtitle}</small>
      </div>
    </div>
  );
}

function CourseCard({ course, onClick }) {
  return (
    <div className="course-card" onClick={onClick}>
      <div className="course-card-top">
        <div className="large-course-icon">{course.icon}</div>

        <span className="grade-badge">{course.grade}</span>
      </div>

      <span className="course-code">{course.code}</span>

      <h3>{course.name}</h3>

      <p>{course.instructor}</p>

      <div className="course-card-info">
        <span>📅 {course.attendance}% Attendance</span>
        <strong>{course.marks}%</strong>
      </div>

      <div className="progress-bar">
        <span style={{ width: `${course.progress}%` }}></span>
      </div>

      <button>View Course →</button>
    </div>
  );
}

function MarksPage({ courses, averageMarks }) {
  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <h2>Marks & Grades</h2>
          <p>Your academic performance for this semester</p>
        </div>

        <div className="average-box">
          Average <strong>{averageMarks}%</strong>
        </div>
      </div>

      <div className="marks-table-card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Internal</th>
                <th>Mid Exam</th>
                <th>Final</th>
                <th>Total</th>
                <th>Grade</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course) => {
                const internal = Math.round(course.marks * 0.25);
                const mid = Math.round(course.marks * 0.3);
                const final = course.marks - internal - mid;

                return (
                  <tr key={course.id}>
                    <td>
                      <strong>{course.name}</strong>
                      <span>{course.code}</span>
                    </td>

                    <td>{internal}/25</td>
                    <td>{mid}/30</td>
                    <td>{final}/45</td>
                    <td>
                      <strong>{course.marks}%</strong>
                    </td>

                    <td>
                      <span className="table-grade">
                        {course.grade}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function AttendancePage({ courses, averageAttendance }) {
  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <h2>Attendance</h2>
          <p>Track your attendance for each course</p>
        </div>

        <div className="average-box">
          Overall <strong>{averageAttendance}%</strong>
        </div>
      </div>

      <div className="attendance-grid">
        {courses.map((course) => {
          const status =
            course.attendance >= 85
              ? "Good"
              : course.attendance >= 75
              ? "Warning"
              : "Low";

          return (
            <div className="attendance-card" key={course.id}>
              <div className="attendance-card-top">
                <div className="course-icon">{course.icon}</div>

                <span className={`status ${status.toLowerCase()}`}>
                  {status}
                </span>
              </div>

              <h3>{course.name}</h3>
              <p>{course.code}</p>

              <div className="attendance-number">
                {course.attendance}%
              </div>

              <div className="progress-bar attendance-progress">
                <span
                  style={{ width: `${course.attendance}%` }}
                ></span>
              </div>

              <div className="attendance-days">
                <span>Present</span>
                <strong>
                  {Math.round(course.attendance * 0.22)}/22
                </strong>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ProfilePage() {
  return (
    <section className="page-section">
      <div className="profile-header-card">
        <div className="profile-avatar-large">AG</div>

        <div>
          <h2>Alekhya Gorthi</h2>
          <p>Computer Science & Engineering</p>
          <span>Student ID: STU2025CS001</span>
        </div>

        <button className="edit-btn">✏️ Edit Profile</button>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <h3>Personal Information</h3>

          <div className="profile-info">
            <div>
              <span>Full Name</span>
              <strong>Alekhya Gorthi</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>alehkya@example.com</strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>+91 98765 43210</strong>
            </div>

            <div>
              <span>Date of Birth</span>
              <strong>15 August 2003</strong>
            </div>

            <div>
              <span>Gender</span>
              <strong>Female</strong>
            </div>

            <div>
              <span>City</span>
              <strong>Andhra Pradesh, India</strong>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <h3>Academic Information</h3>

          <div className="profile-info">
            <div>
              <span>Student ID</span>
              <strong>STU2025CS001</strong>
            </div>

            <div>
              <span>Program</span>
              <strong>B.Tech CSE</strong>
            </div>

            <div>
              <span>Year</span>
              <strong>Final Year</strong>
            </div>

            <div>
              <span>Semester</span>
              <strong>8th Semester</strong>
            </div>

            <div>
              <span>Current GPA</span>
              <strong>8.7 / 10</strong>
            </div>

            <div>
              <span>Academic Status</span>
              <strong className="good-text">Good Standing</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;