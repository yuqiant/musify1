import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // 如果您使用 React Router
import './create.css';

const EditPlaylistPage = () => {
    const { playlistId } = useParams(); // 获取 URL 参数中的 playlistId
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [playlistDetails, setPlaylistDetails] = useState({});
    const BASE_API = process.env.REACT_APP_BASE_API_URL;

    // const BASE_API_URL = 'http://localhost:4000';
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPlaylistDetails = async () => {
            try {
                const response = await axios.get(`${BASE_API}/playlists/${playlistId}`);
                setPlaylistName(response.data.name);
                setPlaylistDescription(response.data.description || '');
                setPlaylistDetails(response.data);
            } catch (error) {
                console.error('Failed to fetch playlist details:', error);
            }
        };

        fetchPlaylistDetails();
    }, [playlistId]);


    const handleSave = async () => {
        try {
            await axios.put(`${BASE_API}/playlists/${playlistId}`, {
                name: playlistName,
                description: playlistDescription
            });

            alert('Playlist updated successfully');
        } catch (error) {
            console.error('Failed to update playlist:', error);
            alert('Failed to update playlist');
        }
    };


    const handleCancel = () => {
        navigate('/dashboard'); // For going back to the previous page
    };
    return (
        <div className="create-playlist-container">
            <h2 className="create-playlist-heading">Edit Playlist</h2>
            <div className="create-playlist-form">
                <h3>Playlist Name:</h3>
                <input
                    className="create-playlist-input"
                    type="text"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    placeholder="Playlist Name"
                />
                <button className="create-playlist-button" onClick={handleSave}>Save Changes</button>
                <br />

                <h3>Playlist Description:</h3>
                <textarea
                    className="create-playlist-textarea"
                    value={playlistDescription}
                    onChange={(e) => setPlaylistDescription(e.target.value)}
                    placeholder="Playlist Description"
                    rows="4"
                />
                <button className="create-playlist-button" onClick={handleSave}>Save Changes</button>
                <br />

                <button className="create-playlist-button" onClick={handleCancel}>Cancel</button>
                <br />
            </div>
        </div>
    );
};

export default EditPlaylistPage;
