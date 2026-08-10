import './App.css'

function App() {
  return (
    <div className="portfolio">

      {/* Navigation */}
      <nav className="navbar">
        <h2>ALEKHYA</h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
          <a href="#certifications">Certifications</a>
          <a href="#internships">Internships</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Home */}
      <section id="home" className="hero">
        <div className="hero-content">
          <p className="small-title">WELCOME TO MY PORTFOLIO</p>

          <h1>
            H.S.N. <span>ALEKHYA GORTHI</span>
          </h1>

          <h2>Python Full Stack Web Developer</h2>

          <p>
            Recent graduate with practical knowledge of Python full-stack
            web development and a strong interest in building web applications.
          </p>

          <div className="hero-buttons">
            <a href="#contact" className="btn primary-btn">
              Contact Me
            </a>

            <a href="#about" className="btn secondary-btn">
              About Me
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <p className="section-label">ABOUT ME</p>
        <h2 className="section-title">Professional Summary</h2>

        <div className="about-card">
          <p>
            Recent graduate in Electronics and Communication Engineering
            with practical knowledge of Python full-stack web development.
            Familiar with front-end and back-end technologies, database
            management and basic web frameworks.
          </p>

          <p>
            Demonstrated ability to learn new technologies quickly through
            multiple certifications. Seeking an entry-level Web Developer
            position to apply technical skills, learn industry best practices,
            and grow professionally.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section dark-section">
        <p className="section-label">MY SKILLS</p>
        <h2 className="section-title">Technical Skills</h2>

        <div className="skills-container">
          <div className="skill-card">
            <h3>Programming Languages</h3>
            <div className="skill-tags">
              <span>Python</span>
              <span>Java</span>
            </div>
          </div>

          <div className="skill-card">
            <h3>Web Development</h3>
            <div className="skill-tags">
              <span>Full Stack Web Development</span>
            </div>
          </div>

          <div className="skill-card">
            <h3>Professional Skills</h3>
            <div className="skill-tags">
              <span>Problem Solving</span>
              <span>Team Collaboration</span>
              <span>Communication</span>
              <span>Self Motivated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="section">
        <p className="section-label">EDUCATION</p>
        <h2 className="section-title">My Education</h2>

        <div className="timeline">

          <div className="timeline-card">
            <div className="year">2022 - 2025</div>

            <div>
              <h3>B.Tech in Electronics and Communication Engineering</h3>
              <p>
                DNR College of Engineering & Technology
              </p>
            </div>
          </div>

          <div className="timeline-card">
            <div className="year">2019 - 2022</div>

            <div>
              <h3>
                Diploma in Electronics and Communication Engineering
              </h3>

              <p>
                SMT.B.Seetha Polytechnic
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="section dark-section">
        <p className="section-label">CERTIFICATIONS</p>
        <h2 className="section-title">My Certifications</h2>

        <div className="cards">

          <div className="info-card">
            <span>01</span>
            <h3>Full Stack Web Development</h3>
            <p>Internshala Trainings</p>
            <small>Nov 2023 - Jan 2024</small>
          </div>

          <div className="info-card">
            <span>02</span>
            <h3>Core Java</h3>
            <p>Internshala Trainings</p>
            <small>Jan 2024 - Mar 2024</small>
          </div>

          <div className="info-card">
            <span>03</span>
            <h3>Google Cybersecurity</h3>
            <p>Coursera</p>
            <small>Jun 2024 - Aug 2024</small>
          </div>

          <div className="info-card">
            <span>04</span>
            <h3>Python Full Stack</h3>
            <p>Digital Edify</p>
            <small>Aug 2025 - Dec 2025</small>
          </div>

        </div>
      </section>

      {/* Internships */}
      <section id="internships" className="section">
        <p className="section-label">EXPERIENCE</p>
        <h2 className="section-title">Internship Experience</h2>

        <div className="experience-container">

          <div className="experience-card">
            <div className="experience-number">01</div>

            <div>
              <h3>Machine Learning with Python Intern</h3>
              <p className="company">TalentShine</p>
              <p>Jul 2023 - Sept 2023</p>
            </div>
          </div>

          <div className="experience-card">
            <div className="experience-number">02</div>

            <div>
              <h3>VLSI Intern</h3>
              <p className="company">TalentShine</p>
              <p>Jul 2024 - Aug 2024</p>
            </div>
          </div>

        </div>
      </section>

      {/* Soft Skills */}
      <section className="soft-skills">
        <h2>Professional Strengths</h2>

        <div className="soft-skill-list">
          <span>Analytical Thinking</span>
          <span>Problem Solving</span>
          <span>Team Collaboration</span>
          <span>Communication</span>
          <span>Self Motivation</span>
          <span>Positive Attitude</span>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <p className="section-label">GET IN TOUCH</p>
        <h2>Let's Connect</h2>

        <p>
          I am looking for an entry-level Web Developer opportunity where
          I can apply my technical skills and continue learning.
        </p>

        <div className="contact-details">
          <p>
            <strong>Email:</strong> ghsnalekhya@gmail.com
          </p>

          <p>
            <strong>Phone:</strong> +91 9515184357
          </p>

          <p>
            <strong>Location:</strong> Bhimavaram
          </p>

          <p>
            <strong>LinkedIn:</strong>{' '}
            <a
              href="https://www.linkedin.com/in/hsnalekhyagorthi"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/hsnalekhyagorthi
            </a>
          </p>

          <p>
            <strong>GitHub:</strong>{' '}
            <a
              href="https://github.com/hsnalekhya"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Profile
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2026 H.S.N. Alekhya Gorthi</p>
        <p>Python Full Stack Web Developer</p>
      </footer>

    </div>
  )
}

export default App