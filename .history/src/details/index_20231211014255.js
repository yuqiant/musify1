


import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar';
// import UserContext from '../userContext';
import { AuthContext } from '../AuthContext';
import "./index.css";

function SongDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, userId } = useContext(AuthContext);
    // const { user, isAuthenticated } = useContext(UserContext);
    const [song, setSong] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const BASE_API = process.env.REACT_APP_BASE_API_URL;
    // const REMOTE_API_URL = "http://localhost:4000";
    const goToDashboard = () => {
        navigate('/dashboard'); // 使用你的dashboard路由路径替换'/dashboard'
    };


    useEffect(() => {
        // 定义一个异步函数
        const fetchSongDetails = async () => {
            try {
                const songResponse = await axios.get(`${BASE_API}/details/${id}`);
                setSong(songResponse.data);
                console.log("current authenticated:", isAuthenticated);

                if (isAuthenticated && userId) {
                    const playlistsResponse = await axios.get(`${BASE_API}/users/${userId}/playlists`);
                    setPlaylists(playlistsResponse.data);
                    console.log("Response data:", playlistsResponse.data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchSongDetails();
    }, [id, userId, isAuthenticated]);


    const handleAddSong = () => {
        if (!isAuthenticated) {
            alert('Please log in to add songs to your list.');
            return;
        }
        if (!selectedPlaylist) {
            alert('Please select a playlist.');
            return;
        }
        console.log("song id is:", id);
        console.log("playlist id is:", selectedPlaylist);
        axios.post(`${BASE_API}/playlists/${selectedPlaylist}/add-song`, { songId: id })
            .then(response => alert('Song added to your list!'))
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    if (error.response.status === 400) {
                        alert('Song already in the playlist.');
                    } else {
                        alert('Error adding song: ' + error.response.data);
                    }
                    console.error('Error data:', error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('Error request:', error.request);
                    alert('No response received from server.');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error message:', error.message);
                    alert('Error adding song: ' + error.message);
                }
            });

    };

    if (!song) return <div>Loading song details...</div>;
    console.log(song.genre);
    return (
        <div className="song-details-container">
            <h1><b>{song.songName}</b> by <b>{song.artistName}</b></h1>
            <br />
            <div className="detail-row">
                <label>Song Name:</label>
                <div className="detail">{song.songName}</div>
            </div>
            <div className="detail-row">
                <label>Album Name:</label>
                <div className="detail">{song.albumName}</div>
            </div>
            <div className="detail-row">
                <label>Artist Name:</label>
                <div className="detail">{song.artistName}</div>
            </div>
            <div className="detail-row">
                <label>Genre:</label>
                <div className="detail">{song.genre}</div>
            </div>
            <div className="detail-row">
                <label>Released Year:</label>
                <div className="detail">{song.releasedYear}</div>
            </div>

            {isAuthenticated && (
                <div className="select-playlist-container">
                    <select
                        value={selectedPlaylist}
                        onChange={(e) => setSelectedPlaylist(e.target.value)}
                    >
                        <option value="">Select a Playlist</option>
                        {playlists.map((playlist, index) => (
                            <option key={index} value={playlist._id}>
                                {playlist.name}
                            </option>
                        ))}
                    </select>
                    <button className='btn btn-primary' onClick={handleAddSong}>Add to My List</button>
                </div>
            )}
        </div>
    );
}

export default SongDetails;