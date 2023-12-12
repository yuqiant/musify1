import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import * as playlistClient from '../playlists/client'; // Adjust path as needed
import './createPlaylist.css'; // Adjust the path as needed

const CreatePlaylistPage = () => {
    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState({ name: '', description: '' });

    const handleChange = (e) => {
        setPlaylist({ ...playlist, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert('You must be logged in to create a playlist.');
            return;
        }
        try {
            await playlistClient.createPlaylist({ ...playlist, userId });
            alert('Playlist created successfully');
            navigate('/dashboard'); // Redirect back to the dashboard
        } catch (error) {
            console.error('Error creating playlist:', error);
            alert('Failed to create playlist');
        }
    };

    return (
        <div className="create-playlist-container">
            <h2 className="create-playlist-heading">Create New Playlist</h2>
            <form onSubmit={handleSubmit} className="create-playlist-form">
                <input
                    className="create-playlist-input"
                    name="name"
                    value={playlist.name}
                    onChange={handleChange}
                    placeholder="Playlist Name"
                />
                <textarea
                    className="create-playlist-textarea"
                    name="description"
                    value={playlist.description}
                    onChange={handleChange}
                    placeholder="Playlist Description"
                    rows="4"
                />
                <button type="submit" className="create-playlist-button">Create Playlist</button>
            </form>
        </div>
    );
};

export default CreatePlaylistPage;
