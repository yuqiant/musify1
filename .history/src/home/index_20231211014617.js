import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { AuthContext } from '../AuthContext';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('Songs'); // New state for search type
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, userId } = useContext(AuthContext);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchTypeChange = (type) => {
        setSearchType(type);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?query=${searchTerm}&type=${searchType}`);
        // performSearch(searchTerm);
        // navigate(`/search?criteria=${searchTerm}&type=${searchType}`);
        console.log('Search Term:', searchTerm);
        console.log('Search Type:', searchType);
        console.log("home authenticate:", isAuthenticated);
    };

    return (

        <div className="App">
            <div className="search-section">
                <br /><br />
                <h2 className="playlist-heading">Make your Playlist</h2>
                <br /><br />

                <div className="search-types">
                    {['Songs', 'Albums', 'Artists'].map((type) => (
                        <button
                            key={type}
                            className={`search-type-button ${searchType === type ? 'active' : ''}`}
                            onClick={() => handleSearchTypeChange(type)}
                        >
                            {type}
                        </button>

                    ))}<br /><br />
                </div>
                <form onSubmit={handleSearchSubmit} className="form-inline">
                    <input
                        type="text"
                        // className="form-control search-bar"
                        className="form-control search-bar mb-2 mr-sm-2"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange} />
                    <button type="submit" className="btn btn-primary btn-submit">Search</button>
                </form>
                <div className="search-results">
                    {/* {renderSearchResults()} */}
                    {/* {performSearch} */}
                </div>
            </div>
        </div>
    );
}

export default Home;



