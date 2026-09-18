import { useState } from "react";
import "./App.css";

const weeklyActivity = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 60 },
  { day: "Wed", minutes: 35 },
  { day: "Thu", minutes: 75 },
  { day: "Fri", minutes: 50 },
  { day: "Sat", minutes: 90 },
  { day: "Sun", minutes: 40 },
];

const activities = [
  {
    id: 1,
    name: "Running",
    icon: "🏃",
    category: "Cardio",
    duration: "35 min",
    calories: "320 kcal",
    level: "Medium",
  },
  {
    id: 2,
    name: "Cycling",
    icon: "🚴",
    category: "Cardio",
    duration: "45 min",
    calories: "410 kcal",
    level: "High",
  },
  {
    id: 3,
    name: "Walking",
    icon: "🚶",
    category: "Walking",
    duration: "30 min",
    calories: "180 kcal",
    level: "Low",
  },
  {
    id: 4,
    name: "Strength Training",
    icon: "🏋️",
    category: "Strength",
    duration: "50 min",
    calories: "390 kcal",
    level: "High",
  },
  {
    id: 5,
    name: "Yoga",
    icon: "🧘",
    category: "Flexibility",
    duration: "40 min",
    calories: "220 kcal",
    level: "Low",
  },
  {
    id: 6,
    name: "Swimming",
    icon: "🏊",
    category: "Cardio",
    duration: "45 min",
    calories: "350 kcal",
    level: "Medium",
  },
];

const recentWorkouts = [
  {
    name: "Morning Run",
    icon: "🏃",
    date: "Today, 7:30 AM",
    duration: "35 min",
    calories: "320 kcal",
  },
  {
    name: "Strength Training",
    icon: "🏋️",
    date: "Yesterday, 6:00 PM",
    duration: "50 min",
    calories: "390 kcal",
  },
  {
    name: "Cycling",
    icon: "🚴",
    date: "Sep 15, 2026",
    duration: "45 min",
    calories: "410 kcal",
  },
  {
    name: "Yoga Session",
    icon: "🧘",
    date: "Sep 14, 2026",
    duration: "40 min",
    calories: "220 kcal",
  },
];

const goals = [
  {
    title: "Weekly Workouts",
    current: 5,
    target: 7,
    unit: "workouts",
    icon: "🏋️",
  },
  {
    title: "Calories Burned",
    current: 2850,
    target: 4000,
    unit: "kcal",
    icon: "🔥",
  },
  {
    title: "Daily Steps",
    current: 8200,
    target: 10000,
    unit: "steps",
    icon: "👟",
  },
  {
    title: "Active Minutes",
    current: 395,
    target: 500,
    unit: "minutes",
    icon: "⏱️",
  },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showWorkoutMessage, setShowWorkoutMessage] = useState(false);

  const filteredActivities = activities.filter((activity) =>
    activity.name.toLowerCase().includes(search.toLowerCase())
  );

  const navigateTo = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const handleStartWorkout = () => {
    setShowWorkoutMessage(true);

    setTimeout(() => {
      setShowWorkoutMessage(false);
    }, 3000);
  };

  return (
    <div className="app">
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="logo">
          <div className="logo-icon">⚡</div>
          <div>
            <h2>FitTrack</h2>
            <span>Fitness Tracker</span>
          </div>
        </div>

        <nav className="navigation">
          <p className="nav-title">MAIN MENU</p>

          <button
            className={activePage === "Dashboard" ? "nav-item active" : "nav-item"}
            onClick={() => navigateTo("Dashboard")}
          >
            <span>📊</span>
            Dashboard
          </button>

          <button
            className={activePage === "Workouts" ? "nav-item active" : "nav-item"}
            onClick={() => navigateTo("Workouts")}
          >
            <span>🏋️</span>
            Workouts
          </button>

          <button
            className={activePage === "Progress" ? "nav-item active" : "nav-item"}
            onClick={() => navigateTo("Progress")}
          >
            <span>📈</span>
            Progress
          </button>

          <button
            className={activePage === "Goals" ? "nav-item active" : "nav-item"}
            onClick={() => navigateTo("Goals")}
          >
            <span>🎯</span>
            Goals
          </button>

          <button
            className={activePage === "Activities" ? "nav-item active" : "nav-item"}
            onClick={() => navigateTo("Activities")}
          >
            <span>🔥</span>
            Activities
          </button>

          <p className="nav-title second-title">ACCOUNT</p>

          <button
            className={activePage === "Profile" ? "nav-item active" : "nav-item"}
            onClick={() => navigateTo("Profile")}
          >
            <span>👤</span>
            Profile
          </button>

          <button
            className={activePage === "Settings" ? "nav-item active" : "nav-item"}
            onClick={() => navigateTo("Settings")}
          >
            <span>⚙️</span>
            Settings
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="mini-profile">
            <div className="profile-avatar">AG</div>
            <div>
              <strong>Alex Green</strong>
              <span>Fitness Member</span>
            </div>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <div className="page-heading">
            <h1>{activePage}</h1>
            <p>
              {activePage === "Dashboard"
                ? "Track your fitness journey and stay active."
                : `Manage your ${activePage.toLowerCase()} information.`}
            </p>
          </div>

          <div className="topbar-actions">
            <button className="notification-button">
              🔔
              <span className="notification-dot"></span>
            </button>

            <div className="top-profile">
              <div className="profile-avatar">AG</div>
              <div>
                <strong>Alex Green</strong>
                <span>Member</span>
              </div>
            </div>
          </div>
        </header>

        <div className="content">
          {activePage === "Dashboard" && (
            <Dashboard
              onStartWorkout={handleStartWorkout}
              showWorkoutMessage={showWorkoutMessage}
              navigateTo={navigateTo}
            />
          )}

          {activePage === "Workouts" && (
            <Workouts onStartWorkout={handleStartWorkout} />
          )}

          {activePage === "Progress" && <Progress />}

          {activePage === "Goals" && <Goals />}

          {activePage === "Activities" && (
            <Activities
              search={search}
              setSearch={setSearch}
              filteredActivities={filteredActivities}
            />
          )}

          {activePage === "Profile" && <Profile />}

          {activePage === "Settings" && <Settings />}
        </div>
      </main>
    </div>
  );
}

function Dashboard({
  onStartWorkout,
  showWorkoutMessage,
  navigateTo,
}) {
  return (
    <>
      <section className="welcome-banner">
        <div>
          <span className="welcome-label">GOOD MORNING 👋</span>
          <h2>Keep moving, Alex!</h2>
          <p>
            You're doing great. Stay consistent and reach your fitness goals.
          </p>

          <button className="primary-button" onClick={onStartWorkout}>
            Start Workout →
          </button>
        </div>

        <div className="banner-icon">🏃‍♂️</div>
      </section>

      {showWorkoutMessage && (
        <div className="success-message">
          ✅ Workout session started! Let's get moving.
        </div>
      )}

      <section className="stats-grid">
        <StatCard
          icon="🏋️"
          title="Workouts Completed"
          value="24"
          change="+12%"
          text="vs last month"
        />

        <StatCard
          icon="🔥"
          title="Calories Burned"
          value="8,420"
          change="+18%"
          text="vs last month"
        />

        <StatCard
          icon="⏱️"
          title="Active Minutes"
          value="395"
          change="+9%"
          text="this week"
        />

        <StatCard
          icon="🔥"
          title="Current Streak"
          value="12"
          change="days"
          text="Keep it going!"
        />
      </section>

      <div className="dashboard-grid">
        <section className="card activity-chart-card">
          <div className="card-header">
            <div>
              <h3>Weekly Activity</h3>
              <p>Your active minutes this week</p>
            </div>

            <select className="period-select">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>

          <div className="chart">
            <div className="chart-y-axis">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            <div className="chart-area">
              <div className="grid-line line-1"></div>
              <div className="grid-line line-2"></div>
              <div className="grid-line line-3"></div>
              <div className="grid-line line-4"></div>

              <div className="bars">
                {weeklyActivity.map((item) => (
                  <div className="bar-wrapper" key={item.day}>
                    <span className="bar-value">{item.minutes}</span>
                    <div
                      className="bar"
                      style={{
                        height: `${item.minutes}%`,
                      }}
                    ></div>
                    <span className="bar-label">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="card goals-card">
          <div className="card-header">
            <div>
              <h3>Today's Goals</h3>
              <p>Keep pushing forward</p>
            </div>

            <button
              className="view-link"
              onClick={() => navigateTo("Goals")}
            >
              View All
            </button>
          </div>

          <div className="goal-list">
            {goals.slice(0, 3).map((goal) => {
              const percentage = Math.round(
                (goal.current / goal.target) * 100
              );

              return (
                <div className="goal-item" key={goal.title}>
                  <div className="goal-icon">{goal.icon}</div>

                  <div className="goal-info">
                    <div className="goal-title-row">
                      <strong>{goal.title}</strong>
                      <span>{percentage}%</span>
                    </div>

                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>

                    <small>
                      {goal.current.toLocaleString()} /{" "}
                      {goal.target.toLocaleString()} {goal.unit}
                    </small>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="card recent-card">
        <div className="card-header">
          <div>
            <h3>Recent Workouts</h3>
            <p>Your latest fitness activities</p>
          </div>

          <button
            className="view-link"
            onClick={() => navigateTo("Workouts")}
          >
            View All
          </button>
        </div>

        <div className="workout-list">
          {recentWorkouts.map((workout) => (
            <div className="workout-row" key={workout.name}>
              <div className="workout-icon">{workout.icon}</div>

              <div className="workout-name">
                <strong>{workout.name}</strong>
                <span>{workout.date}</span>
              </div>

              <div className="workout-detail">
                <span>Duration</span>
                <strong>{workout.duration}</strong>
              </div>

              <div className="workout-detail">
                <span>Calories</span>
                <strong>{workout.calories}</strong>
              </div>

              <button className="more-button">⋮</button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function StatCard({ icon, title, value, change, text }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon">{icon}</div>
        <span className="stat-change">{change}</span>
      </div>

      <h3>{value}</h3>
      <p>{title}</p>
      <small>{text}</small>
    </div>
  );
}

function Workouts({ onStartWorkout }) {
  return (
    <section>
      <div className="page-action-header">
        <div>
          <h2>My Workouts</h2>
          <p>Choose an activity and start your workout.</p>
        </div>

        <button className="primary-button" onClick={onStartWorkout}>
          + Start Workout
        </button>
      </div>

      <div className="workout-cards">
        {activities.map((activity) => (
          <div className="activity-card" key={activity.id}>
            <div className="activity-card-top">
              <div className="large-activity-icon">{activity.icon}</div>
              <span className={`level ${activity.level.toLowerCase()}`}>
                {activity.level}
              </span>
            </div>

            <h3>{activity.name}</h3>
            <p>{activity.category}</p>

            <div className="activity-meta">
              <span>⏱️ {activity.duration}</span>
              <span>🔥 {activity.calories}</span>
            </div>

            <button className="outline-button" onClick={onStartWorkout}>
              Start
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Progress() {
  return (
    <>
      <div className="progress-summary">
        <div className="progress-main-card">
          <span className="summary-label">TOTAL WORKOUTS</span>
          <strong>24</strong>
          <p>Workouts completed this month</p>
        </div>

        <div className="progress-main-card">
          <span className="summary-label">TOTAL CALORIES</span>
          <strong>8,420</strong>
          <p>Calories burned this month</p>
        </div>

        <div className="progress-main-card">
          <span className="summary-label">TOTAL TIME</span>
          <strong>18h 35m</strong>
          <p>Active workout time</p>
        </div>
      </div>

      <section className="card progress-section">
        <div className="card-header">
          <div>
            <h3>Weekly Progress</h3>
            <p>Active minutes over the last 7 days</p>
          </div>
        </div>

        <div className="large-chart">
          {weeklyActivity.map((item) => (
            <div className="large-bar-column" key={item.day}>
              <span>{item.minutes}</span>
              <div className="large-bar-container">
                <div
                  className="large-bar"
                  style={{
                    height: `${item.minutes}%`,
                  }}
                ></div>
              </div>
              <small>{item.day}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="card-header">
          <div>
            <h3>Weight Progress</h3>
            <p>Track your progress over time</p>
          </div>
        </div>

        <div className="weight-progress">
          <div>
            <span>Starting Weight</span>
            <strong>78 kg</strong>
          </div>

          <div className="weight-arrow">→</div>

          <div>
            <span>Current Weight</span>
            <strong>73 kg</strong>
          </div>

          <div className="weight-result">
            <span>Progress</span>
            <strong>-5 kg</strong>
          </div>
        </div>
      </section>
    </>
  );
}

function Goals() {
  return (
    <>
      <div className="page-action-header">
        <div>
          <h2>Fitness Goals</h2>
          <p>Set targets and stay consistent.</p>
        </div>

        <button className="primary-button">+ Add Goal</button>
      </div>

      <div className="goals-grid">
        {goals.map((goal) => {
          const percentage = Math.min(
            Math.round((goal.current / goal.target) * 100),
            100
          );

          return (
            <div className="goal-large-card" key={goal.title}>
              <div className="goal-large-top">
                <div className="goal-icon large">{goal.icon}</div>
                <span>{percentage}%</span>
              </div>

              <h3>{goal.title}</h3>

              <div className="goal-large-values">
                <strong>{goal.current.toLocaleString()}</strong>
                <span>
                  / {goal.target.toLocaleString()} {goal.unit}
                </span>
              </div>

              <div className="progress-track large-track">
                <div
                  className="progress-fill"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              <p>
                {percentage >= 100
                  ? "Goal completed! 🎉"
                  : `${goal.target - goal.current} ${goal.unit} remaining`}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

function Activities({
  search,
  setSearch,
  filteredActivities,
}) {
  return (
    <>
      <div className="page-action-header">
        <div>
          <h2>Activities</h2>
          <p>Explore different activities and workouts.</p>
        </div>

        <div className="search-box">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search activities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filteredActivities.length > 0 ? (
        <div className="workout-cards">
          {filteredActivities.map((activity) => (
            <div className="activity-card" key={activity.id}>
              <div className="activity-card-top">
                <div className="large-activity-icon">{activity.icon}</div>

                <span className={`level ${activity.level.toLowerCase()}`}>
                  {activity.level}
                </span>
              </div>

              <h3>{activity.name}</h3>
              <p>{activity.category}</p>

              <div className="activity-meta">
                <span>⏱️ {activity.duration}</span>
                <span>🔥 {activity.calories}</span>
              </div>

              <button className="outline-button">View Activity</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div>🔍</div>
          <h3>No activities found</h3>
          <p>Try searching for another activity.</p>
        </div>
      )}
    </>
  );
}

function Profile() {
  return (
    <section className="profile-page">
      <div className="profile-cover">
        <div className="profile-large-avatar">AG</div>
      </div>

      <div className="profile-info-card">
        <div>
          <h2>Alex Green</h2>
          <p>Fitness enthusiast • Member since 2025</p>
        </div>

        <button className="outline-button">Edit Profile</button>
      </div>

      <div className="profile-grid">
        <div className="card">
          <h3>Personal Information</h3>

          <div className="info-list">
            <div>
              <span>Full Name</span>
              <strong>Alex Green</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>alex@example.com</strong>
            </div>

            <div>
              <span>Age</span>
              <strong>24 years</strong>
            </div>

            <div>
              <span>Height</span>
              <strong>175 cm</strong>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Fitness Information</h3>

          <div className="info-list">
            <div>
              <span>Current Weight</span>
              <strong>73 kg</strong>
            </div>

            <div>
              <span>Fitness Level</span>
              <strong>Intermediate</strong>
            </div>

            <div>
              <span>Weekly Goal</span>
              <strong>5 workouts</strong>
            </div>

            <div>
              <span>Current Streak</span>
              <strong>12 days 🔥</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Settings() {
  return (
    <section className="settings-page">
      <div className="card settings-card">
        <div className="card-header">
          <div>
            <h3>Account Settings</h3>
            <p>Manage your account preferences.</p>
          </div>
        </div>

        <div className="setting-row">
          <div>
            <strong>Profile Visibility</strong>
            <span>Allow other users to view your fitness profile.</span>
          </div>

          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span></span>
          </label>
        </div>

        <div className="setting-row">
          <div>
            <strong>Workout Reminders</strong>
            <span>Receive reminders for your scheduled workouts.</span>
          </div>

          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span></span>
          </label>
        </div>

        <div className="setting-row">
          <div>
            <strong>Goal Notifications</strong>
            <span>Get notified about your fitness goal progress.</span>
          </div>

          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span></span>
          </label>
        </div>

        <div className="setting-row">
          <div>
            <strong>Email Updates</strong>
            <span>Receive fitness tips and weekly summaries.</span>
          </div>

          <label className="switch">
            <input type="checkbox" />
            <span></span>
          </label>
        </div>

        <button className="primary-button save-button">
          Save Changes
        </button>
      </div>
    </section>
  );
}

export default App;