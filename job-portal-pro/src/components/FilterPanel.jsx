function FilterPanel({
    location,
    setLocation,
    type,
    setType,
    experience,
    setExperience,
    }) {
    return (
        <aside className="filter-panel">
        <h3>Filters</h3>

        <label>Location</label>

        <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">All Locations</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Vijayawada">Vijayawada</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Remote">Remote</option>
        </select>

        <label>Job Type</label>

        <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
        </select>

        <label>Experience</label>

        <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
        >
            <option value="">All Experience</option>
            <option value="Fresher">Fresher</option>
            <option value="0-1 Years">0-1 Years</option>
            <option value="1-2 Years">1-2 Years</option>
        </select>
        </aside>
    );
    }

    export default FilterPanel;