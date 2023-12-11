import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // 如果您使用 React Router

const EditPlaylistPage = () => {
    const { playlistId } = useParams(); // 获取 URL 参数中的 playlistId
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [playlistDetails, setPlaylistDetails] = useState({});

    const BASE_API_URL = 'http://localhost:4000';
    const navigate = useNavigate();


    useEffect(() => {
        const fetchPlaylistDetails = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/playlists/${playlistId}`);
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
            await axios.put(`${BASE_API_URL}/playlists/${playlistId}`, {
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
        <div>
            <h2>Edit Playlist</h2>
            <h3>Playlist Name:</h3>
            <input
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="Playlist Name"
            />
            <button onClick={handleSave}>Save Changes</button>
            <br />

            <h3>Playlist Description:</h3>
            <textarea
                value={playlistDescription}
                onChange={(e) => setPlaylistDescription(e.target.value)}
                placeholder="Playlist Description"
                rows="4"
                cols="50"
            />
            <button onClick={handleSave}>Save Changes</button>
            <br />

            <button onClick={handleCancel}>Cancel</button>
            <br />

        </div>
    );
};

export default EditPlaylistPage;
