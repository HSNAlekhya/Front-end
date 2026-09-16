import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import JobCard from "./components/JobCard";
import JobDetails from "./components/JobDetails";
import Stats from "./components/Stats";
import Footer from "./components/Footer";

import { jobs } from "./data/jobs";

function App() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [experience, setExperience] = useState("");

  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);

  const [applications, setApplications] = useState([]);

  const filteredJobs = jobs.filter((job) => {
    const searchMatch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      );

    const locationMatch =
      location === "" || job.location === location;

    const typeMatch =
      type === "" || job.type === type;

    const experienceMatch =
      experience === "" || job.experience === experience;

    return (
      searchMatch &&
      locationMatch &&
      typeMatch &&
      experienceMatch
    );
  });

  const handleSave = (id) => {
    setSavedJobs((previous) => {
      if (previous.includes(id)) {
        return previous.filter((jobId) => jobId !== id);
      }

      return [...previous, id];
    });
  };

  const handleApply = (job) => {
    if (!applications.includes(job.id)) {
      setApplications([...applications, job.id]);
    }

    alert(`Application submitted for ${job.title}`);
  };

  return (
    <div>
      <Navbar />

      <main>
        <section className="hero" id="home">
          <div>
            <p className="hero-small">YOUR CAREER STARTS HERE</p>

            <h1>
              Find a job that
              <span> fits your future.</span>
            </h1>

            <p className="hero-text">
              Search thousands of opportunities from companies
              looking for talented developers and professionals.
            </p>

            <SearchBar
              search={search}
              setSearch={setSearch}
            />
          </div>
        </section>

        <Stats />

        <section className="jobs-section" id="jobs">
          <div className="section-heading">
            <div>
              <p>EXPLORE OPPORTUNITIES</p>
              <h2>Latest Jobs</h2>
            </div>

            <strong>
              {filteredJobs.length} jobs found
            </strong>
          </div>

          <div className="jobs-layout">
            <FilterPanel
              location={location}
              setLocation={setLocation}
              type={type}
              setType={setType}
              experience={experience}
              setExperience={setExperience}
            />

            <div className="job-list">
              {filteredJobs.length === 0 ? (
                <div className="no-results">
                  <h2>No jobs found</h2>
                  <p>
                    Try changing your search or filters.
                  </p>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onSelect={setSelectedJob}
                    onSave={handleSave}
                    saved={savedJobs.includes(job.id)}
                  />
                ))
              )}
            </div>

            <JobDetails
              job={selectedJob}
              onClose={() => setSelectedJob(null)}
              onApply={handleApply}
            />
          </div>
        </section>

        <section className="application-section" id="applications">
          <h2>My Applications</h2>

          <p>
            You have submitted{" "}
            <strong>{applications.length}</strong>{" "}
            application(s).
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;