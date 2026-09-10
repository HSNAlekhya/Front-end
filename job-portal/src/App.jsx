import { useMemo, useState } from "react";
import "./App.css";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova Solutions",
    location: "Hyderabad",
    type: "Full Time",
    experience: "Fresher",
    salary: "₹3.5 - ₹5 LPA",
    category: "Frontend",
    description:
      "We are looking for a passionate Frontend Developer to build responsive and user-friendly web applications.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    id: 2,
    title: "React Developer",
    company: "CodeCraft Technologies",
    location: "Bangalore",
    type: "Full Time",
    experience: "0-1 Years",
    salary: "₹4 - ₹6 LPA",
    category: "Frontend",
    description:
      "Join our development team and create modern web applications using React and related technologies.",
    skills: ["React", "JavaScript", "CSS", "Git"],
  },
  {
    id: 3,
    title: "Python Developer",
    company: "DataWave Systems",
    location: "Hyderabad",
    type: "Full Time",
    experience: "Fresher",
    salary: "₹3 - ₹5 LPA",
    category: "Backend",
    description:
      "Work on backend applications and APIs using Python and Django.",
    skills: ["Python", "Django", "REST API", "SQL"],
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "InnovateHub",
    location: "Chennai",
    type: "Full Time",
    experience: "1-2 Years",
    salary: "₹5 - ₹8 LPA",
    category: "Full Stack",
    description:
      "Develop complete web applications by working on both frontend and backend technologies.",
    skills: ["React", "Node.js", "MongoDB", "JavaScript"],
  },
  {
    id: 5,
    title: "Web Development Intern",
    company: "StartUp Labs",
    location: "Remote",
    type: "Internship",
    experience: "Fresher",
    salary: "₹10,000 - ₹15,000/month",
    category: "Frontend",
    description:
      "Learn and contribute to real-world web development projects in a collaborative environment.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    id: 6,
    title: "Backend Developer",
    company: "CloudTech India",
    location: "Pune",
    type: "Full Time",
    experience: "0-1 Years",
    salary: "₹4 - ₹7 LPA",
    category: "Backend",
    description:
      "Build scalable backend services and APIs for modern applications.",
    skills: ["Python", "Django", "PostgreSQL", "REST API"],
  },
  {
    id: 7,
    title: "UI Developer",
    company: "PixelWorks",
    location: "Mumbai",
    type: "Full Time",
    experience: "Fresher",
    salary: "₹3 - ₹5 LPA",
    category: "UI/UX",
    description:
      "Create attractive and responsive user interfaces for web applications.",
    skills: ["HTML", "CSS", "JavaScript", "Figma"],
  },
  {
    id: 8,
    title: "Java Developer",
    company: "EnterpriseSoft",
    location: "Hyderabad",
    type: "Full Time",
    experience: "1-2 Years",
    salary: "₹5 - ₹8 LPA",
    category: "Backend",
    description:
      "Develop enterprise applications using Java and Spring Boot.",
    skills: ["Java", "Spring Boot", "SQL", "REST API"],
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [jobType, setJobType] = useState("All Types");
  const [category, setCategory] = useState("All Categories");

  const [selectedJob, setSelectedJob] = useState(null);
  const [showApply, setShowApply] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);

  const [application, setApplication] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: "",
  });

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        job.title.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchText)
        );

      const matchesLocation =
        location === "All Locations" || job.location === location;

      const matchesType =
        jobType === "All Types" || job.type === jobType;

      const matchesCategory =
        category === "All Categories" || job.category === category;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesCategory
      );
    });
  }, [search, location, jobType, category]);

  const toggleSave = (id) => {
    setSavedJobs((current) =>
      current.includes(id)
        ? current.filter((jobId) => jobId !== id)
        : [...current, id]
    );
  };

  const handleApplicationChange = (e) => {
    setApplication({
      ...application,
      [e.target.name]: e.target.value,
    });
  };

  const handleApply = (e) => {
    e.preventDefault();

    alert(
      `Application submitted successfully for ${selectedJob.title}!`
    );

    setApplication({
      name: "",
      email: "",
      phone: "",
      resume: "",
      coverLetter: "",
    });

    setShowApply(false);
    setSelectedJob(null);
  };

  const clearFilters = () => {
    setSearch("");
    setLocation("All Locations");
    setJobType("All Types");
    setCategory("All Categories");
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <span className="logo-icon">💼</span>
            <span>Job<span>Portal</span></span>
          </div>

          <nav>
            <a href="#jobs">Find Jobs</a>
            <a href="#categories">Categories</a>
            <a href="#about">About</a>
          </nav>

          <button className="post-btn">Post a Job</button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small">FIND YOUR NEXT OPPORTUNITY</p>

          <h1>
            Find a job that
            <span> works for you.</span>
          </h1>

          <p className="hero-description">
            Discover exciting career opportunities from companies
            looking for talented people like you.
          </p>

          <div className="search-box">
            <div className="search-input">
              🔍
              <input
                type="text"
                placeholder="Job title, skills or company"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="search-location">
              📍
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>All Locations</option>
                <option>Hyderabad</option>
                <option>Bangalore</option>
                <option>Chennai</option>
                <option>Mumbai</option>
                <option>Pune</option>
                <option>Remote</option>
              </select>
            </div>

            <button className="search-btn">Search Jobs</button>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="main" id="jobs">
        <div className="content-container">
          <div className="section-heading">
            <div>
              <p className="section-label">OPPORTUNITIES</p>
              <h2>Latest Job Openings</h2>
            </div>

            <span className="job-count">
              {filteredJobs.length} jobs found
            </span>
          </div>

          <div className="job-layout">
            {/* Filters */}
            <aside className="filters">
              <div className="filter-header">
                <h3>Filters</h3>
                <button onClick={clearFilters}>Clear All</button>
              </div>

              <div className="filter-group">
                <label>Job Type</label>

                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <option>All Types</option>
                  <option>Full Time</option>
                  <option>Internship</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Category</label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>All Categories</option>
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>Full Stack</option>
                  <option>UI/UX</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Location</label>

                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option>All Locations</option>
                  <option>Hyderabad</option>
                  <option>Bangalore</option>
                  <option>Chennai</option>
                  <option>Mumbai</option>
                  <option>Pune</option>
                  <option>Remote</option>
                </select>
              </div>

              <div className="career-card">
                <div className="career-icon">🚀</div>

                <h3>Looking for your first job?</h3>

                <p>
                  Build your profile and discover opportunities
                  that match your skills.
                </p>

                <button>Build Profile</button>
              </div>
            </aside>

            {/* Jobs */}
            <section className="jobs-list">
              {filteredJobs.length === 0 ? (
                <div className="no-results">
                  <div>🔎</div>
                  <h3>No jobs found</h3>
                  <p>
                    Try changing your search or filter options.
                  </p>
                  <button onClick={clearFilters}>
                    Clear Filters
                  </button>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <article className="job-card" key={job.id}>
                    <div className="company-logo">
                      {job.company.charAt(0)}
                    </div>

                    <div className="job-info">
                      <div className="job-top">
                        <div>
                          <h3>{job.title}</h3>
                          <p className="company">
                            {job.company}
                          </p>
                        </div>

                        <button
                          className={`save-btn ${
                            savedJobs.includes(job.id)
                              ? "saved"
                              : ""
                          }`}
                          onClick={() => toggleSave(job.id)}
                        >
                          {savedJobs.includes(job.id)
                            ? "♥"
                            : "♡"}
                        </button>
                      </div>

                      <div className="job-meta">
                        <span>📍 {job.location}</span>
                        <span>💼 {job.type}</span>
                        <span>🎓 {job.experience}</span>
                        <span>💰 {job.salary}</span>
                      </div>

                      <div className="skills">
                        {job.skills.map((skill) => (
                          <span key={skill}>{skill}</span>
                        ))}
                      </div>

                      <div className="job-bottom">
                        <span className="category">
                          {job.category}
                        </span>

                        <button
                          className="details-btn"
                          onClick={() => setSelectedJob(job)}
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Categories */}
      <section className="categories" id="categories">
        <div className="content-container">
          <p className="section-label">EXPLORE</p>
          <h2>Popular Career Categories</h2>

          <div className="category-grid">
            <div
              onClick={() => setCategory("Frontend")}
              className="category-card"
            >
              <span>💻</span>
              <h3>Frontend Development</h3>
              <p>Build modern web interfaces</p>
            </div>

            <div
              onClick={() => setCategory("Backend")}
              className="category-card"
            >
              <span>⚙️</span>
              <h3>Backend Development</h3>
              <p>Build powerful server systems</p>
            </div>

            <div
              onClick={() => setCategory("Full Stack")}
              className="category-card"
            >
              <span>🚀</span>
              <h3>Full Stack Development</h3>
              <p>Work across frontend and backend</p>
            </div>

            <div
              onClick={() => setCategory("UI/UX")}
              className="category-card"
            >
              <span>🎨</span>
              <h3>UI/UX Design</h3>
              <p>Create engaging experiences</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about" id="about">
        <div className="content-container about-content">
          <div>
            <p className="section-label">ABOUT JOBPORTAL</p>
            <h2>Connecting talent with opportunity.</h2>
          </div>

          <p>
            JobPortal is a frontend job-search experience designed
            to make discovering career opportunities simple and
            convenient. Search, filter, save and explore jobs from
            one place.
          </p>
        </div>
      </section>

      {/* Job Details Modal */}
      {selectedJob && !showApply && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedJob(null)}
            >
              ×
            </button>

            <div className="modal-logo">
              {selectedJob.company.charAt(0)}
            </div>

            <h2>{selectedJob.title}</h2>

            <p className="modal-company">
              {selectedJob.company}
            </p>

            <div className="modal-meta">
              <span>📍 {selectedJob.location}</span>
              <span>💼 {selectedJob.type}</span>
              <span>🎓 {selectedJob.experience}</span>
              <span>💰 {selectedJob.salary}</span>
            </div>

            <h3>Job Description</h3>

            <p className="description">
              {selectedJob.description}
            </p>

            <h3>Required Skills</h3>

            <div className="modal-skills">
              {selectedJob.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>

            <button
              className="apply-btn"
              onClick={() => setShowApply(true)}
            >
              Apply Now
            </button>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {selectedJob && showApply && (
        <div className="modal-overlay">
          <div className="modal application-modal">
            <button
              className="close-btn"
              onClick={() => {
                setShowApply(false);
                setSelectedJob(null);
              }}
            >
              ×
            </button>

            <h2>Apply for {selectedJob.title}</h2>

            <p className="modal-company">
              {selectedJob.company}
            </p>

            <form onSubmit={handleApply}>
              <label>Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                value={application.name}
                onChange={handleApplicationChange}
                required
              />

              <label>Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={application.email}
                onChange={handleApplicationChange}
                required
              />

              <label>Phone Number</label>
              <input
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={application.phone}
                onChange={handleApplicationChange}
                required
              />

              <label>Resume Link</label>
              <input
                name="resume"
                type="url"
                placeholder="https://..."
                value={application.resume}
                onChange={handleApplicationChange}
                required
              />

              <label>Cover Letter</label>
              <textarea
                name="coverLetter"
                rows="4"
                placeholder="Write a short cover letter..."
                value={application.coverLetter}
                onChange={handleApplicationChange}
              />

              <button className="apply-btn" type="submit">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer>
        <div className="content-container footer-content">
          <div>
            <div className="logo">
              <span className="logo-icon">💼</span>
              <span>Job<span>Portal</span></span>
            </div>

            <p>
              Find opportunities. Build your career.
            </p>
          </div>

          <p>© 2026 JobPortal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;