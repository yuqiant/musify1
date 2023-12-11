import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar';
import { AuthContext } from '../AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function Results() {
    const location = useLocation();
    const REMOTE_API_URL = "http://localhost:4000/search";
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const { isAuthenticated, userId } = useContext(AuthContext);

    const handleViewDetails = (songId) => {
        navigate(`/details/${songId}`);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query');
        const type = queryParams.get('type');



        // 根据 query 和 type 执行搜索
        const performSearch = async () => {
            try {
                // const response = await axios.get(`${REMOTE_API_URL}?query=${query}&type=${type}`);
                const encodedQuery = encodeURIComponent(query);
                const response = await axios.get(`${REMOTE_API_URL}?query=${encodedQuery}&type=${type}`);
                if (Array.isArray(response.data)) {
                    setSearchResults(response.data);
                    console.log("Response data:", response.data);
                    console.log("search page authenticate:", isAuthenticated);
                    // console.log("current authenticated:", isAuthenticated)

                } else {
                    setSearchResults([response.data]);
                }
            } catch (error) {
                console.error('Search error:', error);
                setSearchResults([]); // 在错误情况下设置为空数组
            }
        };

        performSearch();
    }, [location]);

    const renderSearchResults = () => {
        console.log("in render", searchResults);
        if (searchResults.length === 0) {
            return (
                <div style={{ textAlign: 'center', margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
                    <h2>Sorry, No Results Found</h2>
                    <p style={{ fontSize: '16px', color: '#666' }}>
                        We couldn't find any matches for your search. Try adjusting your keywords.
                    </p>
                    <img src="path-to-no-results-image.jpg" alt="No Results" style={{ maxWidth: '300px', margin: '20px auto' }} />
                </div>
            );
        }
        return (
            <div>
                <h1>Search Results</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Song</th>
                            <th>Album</th>
                            <th>Artist</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((result, index) => (
                            <tr key={index}>
                                <td>{result.songName}</td>
                                <td>{result.albumName}</td>
                                <td>{result.artistName}</td>
                                <td>
                                    {/* Button is now inside the map function and part of each row */}
                                    <button onClick={() => handleViewDetails(result._id)} className="btn btn-primary btn-view-details">
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };
    return (
        <div>
            <div>
                <br></br>
            </div>
            <div>
                {renderSearchResults()}
            </div>
        </div>
    )
}

export default Results;
