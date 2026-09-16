function JobCard({ job, onSelect, onSave, saved }) {
    return (
        <div className="job-card">
        <div className="job-header">
            <div className="company-logo">
            {job.company.charAt(0)}
            </div>

            <button
            className="save-btn"
            onClick={() => onSave(job.id)}
            >
            {saved ? "★" : "☆"}
            </button>
        </div>

        <h3>{job.title}</h3>

        <p className="company">{job.company}</p>

        <div className="job-info">
            <span>📍 {job.location}</span>
            <span>💼 {job.type}</span>
            <span>👤 {job.experience}</span>
        </div>

        <p className="salary">{job.salary}</p>

        <div className="skills">
            {job.skills.map((skill) => (
            <span key={skill}>{skill}</span>
            ))}
        </div>

        <button
            className="details-btn"
            onClick={() => onSelect(job)}
        >
            View Details
        </button>
        </div>
    );
    }

export default JobCard;