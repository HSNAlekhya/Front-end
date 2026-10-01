import { useState } from "react";
import "./App.css";

const initialResume = {
  personal: {
    name: "Your Name",
    role: "Web Developer",
    email: "your.email@example.com",
    phone: "+91 98765 43210",
    location: "Bhimavaram, Andhra Pradesh",
    linkedin: "linkedin.com/in/yourprofile",
    github: "github.com/yourusername",
  },

  summary:
    "Motivated and detail-oriented web developer with a strong interest in building responsive and user-friendly web applications. Passionate about learning modern technologies and developing practical solutions.",

  education: [
    {
      id: 1,
      degree: "Bachelor of Technology",
      institution: "Your College Name",
      year: "2021 - 2025",
      grade: "8.2 CGPA",
    },
  ],

  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Python",
    "Django",
  ],

  experience: [
    {
      id: 1,
      role: "Web Developer Intern",
      company: "Company Name",
      duration: "Jan 2025 - Jun 2025",
      description:
        "Developed responsive web interfaces using HTML, CSS, JavaScript and React. Collaborated with team members to improve user experience and application functionality.",
    },
  ],

  projects: [
    {
      id: 1,
      name: "E-Commerce Website",
      technologies: "React, JavaScript, CSS",
      description:
        "Built a responsive e-commerce frontend with product listings, search, filtering and shopping cart functionality.",
    },
    {
      id: 2,
      name: "Task Management App",
      technologies: "React, CSS",
      description:
        "Created a task management application that allows users to add, edit, complete and delete tasks.",
    },
  ],

  certifications: [
    {
      id: 1,
      name: "Web Development Certification",
      issuer: "Online Learning Platform",
      year: "2025",
    },
  ],

  languages: ["English", "Telugu", "Hindi"],
};

function App() {
  const [resume, setResume] = useState(initialResume);

  const updatePersonal = (field, value) => {
    setResume({
      ...resume,
      personal: {
        ...resume.personal,
        [field]: value,
      },
    });
  };

  const updateResumeField = (field, value) => {
    setResume({
      ...resume,
      [field]: value,
    });
  };

  const updateEducation = (id, field, value) => {
    setResume({
      ...resume,
      education: resume.education.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const addEducation = () => {
    setResume({
      ...resume,
      education: [
        ...resume.education,
        {
          id: Date.now(),
          degree: "",
          institution: "",
          year: "",
          grade: "",
        },
      ],
    });
  };

  const removeEducation = (id) => {
    setResume({
      ...resume,
      education: resume.education.filter((item) => item.id !== id),
    });
  };

  const updateExperience = (id, field, value) => {
    setResume({
      ...resume,
      experience: resume.experience.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const addExperience = () => {
    setResume({
      ...resume,
      experience: [
        ...resume.experience,
        {
          id: Date.now(),
          role: "",
          company: "",
          duration: "",
          description: "",
        },
      ],
    });
  };

  const removeExperience = (id) => {
    setResume({
      ...resume,
      experience: resume.experience.filter((item) => item.id !== id),
    });
  };

  const updateProject = (id, field, value) => {
    setResume({
      ...resume,
      projects: resume.projects.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const addProject = () => {
    setResume({
      ...resume,
      projects: [
        ...resume.projects,
        {
          id: Date.now(),
          name: "",
          technologies: "",
          description: "",
        },
      ],
    });
  };

  const removeProject = (id) => {
    setResume({
      ...resume,
      projects: resume.projects.filter((item) => item.id !== id),
    });
  };

  const updateCertification = (id, field, value) => {
    setResume({
      ...resume,
      certifications: resume.certifications.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const addCertification = () => {
    setResume({
      ...resume,
      certifications: [
        ...resume.certifications,
        {
          id: Date.now(),
          name: "",
          issuer: "",
          year: "",
        },
      ],
    });
  };

  const removeCertification = (id) => {
    setResume({
      ...resume,
      certifications: resume.certifications.filter(
        (item) => item.id !== id
      ),
    });
  };

  const updateSkills = (value) => {
    setResume({
      ...resume,
      skills: value
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    });
  };

  const updateLanguages = (value) => {
    setResume({
      ...resume,
      languages: value
        .split(",")
        .map((language) => language.trim())
        .filter(Boolean),
    });
  };

  const printResume = () => {
    window.print();
  };

  const resetResume = () => {
    setResume(initialResume);
  };

  return (
    <div className="app">
      {/* HEADER */}

      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-icon">CV</div>

            <div>
              <h2>Resume Builder</h2>
              <span>Create your professional resume</span>
            </div>
          </div>

          <div className="header-actions">
            <button className="reset-btn" onClick={resetResume}>
              Reset
            </button>

            <button className="print-btn" onClick={printResume}>
              🖨 Print / Save PDF
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}

      <main className="builder">
        {/* FORM */}

        <section className="form-panel">
          <div className="panel-heading">
            <h1>Build Your Resume</h1>
            <p>Fill in your details and preview your resume instantly.</p>
          </div>

          {/* PERSONAL INFORMATION */}

          <div className="form-section">
            <div className="section-title">
              <span>01</span>
              <div>
                <h2>Personal Information</h2>
                <p>Your basic contact information</p>
              </div>
            </div>

            <div className="form-grid">
              <FormInput
                label="Full Name"
                value={resume.personal.name}
                onChange={(value) => updatePersonal("name", value)}
              />

              <FormInput
                label="Professional Title"
                value={resume.personal.role}
                onChange={(value) => updatePersonal("role", value)}
              />

              <FormInput
                label="Email"
                type="email"
                value={resume.personal.email}
                onChange={(value) => updatePersonal("email", value)}
              />

              <FormInput
                label="Phone"
                value={resume.personal.phone}
                onChange={(value) => updatePersonal("phone", value)}
              />

              <FormInput
                label="Location"
                value={resume.personal.location}
                onChange={(value) => updatePersonal("location", value)}
              />

              <FormInput
                label="LinkedIn"
                value={resume.personal.linkedin}
                onChange={(value) => updatePersonal("linkedin", value)}
              />

              <FormInput
                label="GitHub"
                value={resume.personal.github}
                onChange={(value) => updatePersonal("github", value)}
              />
            </div>
          </div>

          {/* SUMMARY */}

          <div className="form-section">
            <div className="section-title">
              <span>02</span>
              <div>
                <h2>Professional Summary</h2>
                <p>Introduce yourself professionally</p>
              </div>
            </div>

            <textarea
              className="large-textarea"
              value={resume.summary}
              onChange={(e) =>
                updateResumeField("summary", e.target.value)
              }
              placeholder="Write a professional summary..."
            />
          </div>

          {/* EDUCATION */}

          <div className="form-section">
            <div className="section-title">
              <span>03</span>
              <div>
                <h2>Education</h2>
                <p>Add your academic qualifications</p>
              </div>
            </div>

            {resume.education.map((education) => (
              <div className="repeat-card" key={education.id}>
                <button
                  className="remove-btn"
                  onClick={() => removeEducation(education.id)}
                >
                  ×
                </button>

                <div className="form-grid">
                  <FormInput
                    label="Degree"
                    value={education.degree}
                    onChange={(value) =>
                      updateEducation(education.id, "degree", value)
                    }
                  />

                  <FormInput
                    label="Institution"
                    value={education.institution}
                    onChange={(value) =>
                      updateEducation(
                        education.id,
                        "institution",
                        value
                      )
                    }
                  />

                  <FormInput
                    label="Year"
                    value={education.year}
                    onChange={(value) =>
                      updateEducation(education.id, "year", value)
                    }
                  />

                  <FormInput
                    label="Grade / CGPA"
                    value={education.grade}
                    onChange={(value) =>
                      updateEducation(education.id, "grade", value)
                    }
                  />
                </div>
              </div>
            ))}

            <button className="add-btn" onClick={addEducation}>
              + Add Education
            </button>
          </div>

          {/* SKILLS */}

          <div className="form-section">
            <div className="section-title">
              <span>04</span>
              <div>
                <h2>Skills</h2>
                <p>Separate skills using commas</p>
              </div>
            </div>

            <input
              className="full-input"
              value={resume.skills.join(", ")}
              onChange={(e) => updateSkills(e.target.value)}
              placeholder="HTML, CSS, JavaScript, React"
            />
          </div>

          {/* EXPERIENCE */}

          <div className="form-section">
            <div className="section-title">
              <span>05</span>
              <div>
                <h2>Work Experience</h2>
                <p>Add internships or professional experience</p>
              </div>
            </div>

            {resume.experience.map((experience) => (
              <div className="repeat-card" key={experience.id}>
                <button
                  className="remove-btn"
                  onClick={() => removeExperience(experience.id)}
                >
                  ×
                </button>

                <div className="form-grid">
                  <FormInput
                    label="Job Title"
                    value={experience.role}
                    onChange={(value) =>
                      updateExperience(
                        experience.id,
                        "role",
                        value
                      )
                    }
                  />

                  <FormInput
                    label="Company"
                    value={experience.company}
                    onChange={(value) =>
                      updateExperience(
                        experience.id,
                        "company",
                        value
                      )
                    }
                  />

                  <FormInput
                    label="Duration"
                    value={experience.duration}
                    onChange={(value) =>
                      updateExperience(
                        experience.id,
                        "duration",
                        value
                      )
                    }
                  />

                  <div className="full-field">
                    <label>Description</label>

                    <textarea
                      value={experience.description}
                      onChange={(e) =>
                        updateExperience(
                          experience.id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            <button className="add-btn" onClick={addExperience}>
              + Add Experience
            </button>
          </div>

          {/* PROJECTS */}

          <div className="form-section">
            <div className="section-title">
              <span>06</span>
              <div>
                <h2>Projects</h2>
                <p>Showcase your practical work</p>
              </div>
            </div>

            {resume.projects.map((project) => (
              <div className="repeat-card" key={project.id}>
                <button
                  className="remove-btn"
                  onClick={() => removeProject(project.id)}
                >
                  ×
                </button>

                <div className="form-grid">
                  <FormInput
                    label="Project Name"
                    value={project.name}
                    onChange={(value) =>
                      updateProject(project.id, "name", value)
                    }
                  />

                  <FormInput
                    label="Technologies"
                    value={project.technologies}
                    onChange={(value) =>
                      updateProject(
                        project.id,
                        "technologies",
                        value
                      )
                    }
                  />

                  <div className="full-field">
                    <label>Description</label>

                    <textarea
                      value={project.description}
                      onChange={(e) =>
                        updateProject(
                          project.id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            <button className="add-btn" onClick={addProject}>
              + Add Project
            </button>
          </div>

          {/* CERTIFICATIONS */}

          <div className="form-section">
            <div className="section-title">
              <span>07</span>
              <div>
                <h2>Certifications</h2>
                <p>Add relevant certifications</p>
              </div>
            </div>

            {resume.certifications.map((certificate) => (
              <div className="repeat-card" key={certificate.id}>
                <button
                  className="remove-btn"
                  onClick={() =>
                    removeCertification(certificate.id)
                  }
                >
                  ×
                </button>

                <div className="form-grid">
                  <FormInput
                    label="Certification"
                    value={certificate.name}
                    onChange={(value) =>
                      updateCertification(
                        certificate.id,
                        "name",
                        value
                      )
                    }
                  />

                  <FormInput
                    label="Issuer"
                    value={certificate.issuer}
                    onChange={(value) =>
                      updateCertification(
                        certificate.id,
                        "issuer",
                        value
                      )
                    }
                  />

                  <FormInput
                    label="Year"
                    value={certificate.year}
                    onChange={(value) =>
                      updateCertification(
                        certificate.id,
                        "year",
                        value
                      )
                    }
                  />
                </div>
              </div>
            ))}

            <button
              className="add-btn"
              onClick={addCertification}
            >
              + Add Certification
            </button>
          </div>

          {/* LANGUAGES */}

          <div className="form-section">
            <div className="section-title">
              <span>08</span>
              <div>
                <h2>Languages</h2>
                <p>Separate languages using commas</p>
              </div>
            </div>

            <input
              className="full-input"
              value={resume.languages.join(", ")}
              onChange={(e) => updateLanguages(e.target.value)}
              placeholder="English, Telugu, Hindi"
            />
          </div>
        </section>

        {/* PREVIEW */}

        <section className="preview-panel">
          <div className="preview-header">
            <div>
              <span>LIVE PREVIEW</span>
              <h2>Your Resume</h2>
            </div>

            <button onClick={printResume}>Print</button>
          </div>

          <div className="resume-paper">
            {/* Resume Header */}

            <div className="resume-header">
              <h1>{resume.personal.name}</h1>

              <h2>{resume.personal.role}</h2>

              <div className="contact-info">
                {resume.personal.email && (
                  <span>✉ {resume.personal.email}</span>
                )}

                {resume.personal.phone && (
                  <span>☎ {resume.personal.phone}</span>
                )}

                {resume.personal.location && (
                  <span>📍 {resume.personal.location}</span>
                )}
              </div>

              <div className="links">
                {resume.personal.linkedin && (
                  <span>{resume.personal.linkedin}</span>
                )}

                {resume.personal.github && (
                  <span>{resume.personal.github}</span>
                )}
              </div>
            </div>

            {/* Summary */}

            {resume.summary && (
              <ResumeSection title="Professional Summary">
                <p className="resume-paragraph">
                  {resume.summary}
                </p>
              </ResumeSection>
            )}

            {/* Skills */}

            {resume.skills.length > 0 && (
              <ResumeSection title="Skills">
                <div className="skill-list">
                  {resume.skills.map((skill, index) => (
                    <span key={index}>{skill}</span>
                  ))}
                </div>
              </ResumeSection>
            )}

            {/* Experience */}

            {resume.experience.length > 0 && (
              <ResumeSection title="Work Experience">
                {resume.experience.map((experience) => (
                  <div className="resume-item" key={experience.id}>
                    <div className="item-heading">
                      <div>
                        <h3>{experience.role}</h3>
                        <strong>{experience.company}</strong>
                      </div>

                      <span>{experience.duration}</span>
                    </div>

                    <p>{experience.description}</p>
                  </div>
                ))}
              </ResumeSection>
            )}

            {/* Education */}

            {resume.education.length > 0 && (
              <ResumeSection title="Education">
                {resume.education.map((education) => (
                  <div className="resume-item" key={education.id}>
                    <div className="item-heading">
                      <div>
                        <h3>{education.degree}</h3>
                        <strong>{education.institution}</strong>
                      </div>

                      <span>{education.year}</span>
                    </div>

                    {education.grade && (
                      <p>{education.grade}</p>
                    )}
                  </div>
                ))}
              </ResumeSection>
            )}

            {/* Projects */}

            {resume.projects.length > 0 && (
              <ResumeSection title="Projects">
                {resume.projects.map((project) => (
                  <div className="resume-item" key={project.id}>
                    <h3>{project.name}</h3>

                    {project.technologies && (
                      <strong className="technology">
                        {project.technologies}
                      </strong>
                    )}

                    <p>{project.description}</p>
                  </div>
                ))}
              </ResumeSection>
            )}

            {/* Certifications */}

            {resume.certifications.length > 0 && (
              <ResumeSection title="Certifications">
                {resume.certifications.map((certificate) => (
                  <div
                    className="resume-item compact"
                    key={certificate.id}
                  >
                    <div className="item-heading">
                      <div>
                        <h3>{certificate.name}</h3>
                        <strong>{certificate.issuer}</strong>
                      </div>

                      <span>{certificate.year}</span>
                    </div>
                  </div>
                ))}
              </ResumeSection>
            )}

            {/* Languages */}

            {resume.languages.length > 0 && (
              <ResumeSection title="Languages">
                <div className="language-list">
                  {resume.languages.map((language, index) => (
                    <span key={index}>{language}</span>
                  ))}
                </div>
              </ResumeSection>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

/* FORM INPUT COMPONENT */

function FormInput({
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div className="form-field">
      <label>{label}</label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

/* RESUME SECTION COMPONENT */

function ResumeSection({ title, children }) {
  return (
    <section className="resume-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default App;