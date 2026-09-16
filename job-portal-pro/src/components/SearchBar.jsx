function SearchBar({ search, setSearch }) {
    return (
        <div className="search-box">
        <input
            type="text"
            placeholder="Search jobs, companies or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        <button>Search</button>
        </div>
    );
}

export default SearchBar;