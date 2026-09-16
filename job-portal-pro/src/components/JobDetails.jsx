function JobDetails({ job, onClose, onApply }) {
    if (!job) {
        return (
        <div className="details-empty">
            <h2>Select a job</h2>
            <p>Choose a job from the list to view details.</p>
        </div>
        );
    }

    return (
        <div className="job-details">
        <button className="close-btn" onClick={onClose}>
            ✕
        </button>

        <div className="details-logo">
            {job.company.charAt(0)}
        </div>

        <h2>{job.title}</h2>

        <h3>{job.company}</h3>

        <p>📍 {job.location}</p>
        <p>💼 {job.type}</p>
        <p>💰 {job.salary}</p>

        <hr />

        <h3>About the Job</h3>

        <p>{job.description}</p>

        <h3>Required Skills</h3>

        <div className="skills">
            {job.skills.map((skill) => (
            <span key={skill}>{skill}</span>
            ))}
        </div>

        <button
            className="apply-btn"
            onClick={() => onApply(job)}
        >
            Apply Now
        </button>
        </div>
    );
    }

    export default JobDetails;