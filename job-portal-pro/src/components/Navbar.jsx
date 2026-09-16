function Navbar() {
    return (
        <nav className="navbar">
        <div className="logo">
            Job<span>Portal</span>
        </div>

        <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#jobs">Jobs</a>
            <a href="#saved">Saved Jobs</a>
            <a href="#applications">Applications</a>
        </div>

        <button className="profile-btn">My Profile</button>
        </nav>
    );
    }

export default Navbar;