import React, { useState, useEffect } from 'react';
import * as client from './client'; // Make sure the path to your client.js is correct

const AdminDashboard = ({ onAddSong }) => {
    const [song, setSong] = useState({ songName: '', artistName: '', albumName: '', releasedYear: '', Genre: '' });
    const [songs, setSongs] = useState([]); // State for storing all songs
    const [isEditing, setIsEditing] = useState(false);
    const [editingSongId, setEditingSongId] = useState(null);

    useEffect(() => {
        fetchSongs();
    }, []);

    const fetchSongs = async () => {
        try {
            const fetchedSongs = await client.getAllSongs();
            setSongs(fetchedSongs);
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    const handleChange = (e) => {
        setSong({ ...song, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await client.updateSong(editingSongId, song);
        } else {
            await onAddSong(song); // Add a new song
        }
        setSong({ songName: '', artistName: '', albumName: '', releasedYear: '', Genre: '' });
        setIsEditing(false);
        setEditingSongId(null);
        fetchSongs();
    };

    const handleEdit = (songItem) => {
        setSong({ ...songItem }); 
        setIsEditing(true);
        setEditingSongId(songItem._id);
    };

    
    const handleDelete = async (songId) => {
        await client.deleteSong(songId);
        fetchSongs();
    };

    return (
        <div className="admin-dashboard">
            <form onSubmit={handleSubmit}>
                <input
                    name="songName"
                    value={song.songName}
                    onChange={handleChange}
                    placeholder="Song Name"
                />
                <input
                    name="artistName"
                    value={song.artistName}
                    onChange={handleChange}
                    placeholder="Artist Name"
                />
                <input
                    name="albumName"
                    value={song.albumName}
                    onChange={handleChange}
                    placeholder="Album Name"
                />
                <input
                    name="releasedYear"
                    value={song.releasedYear}
                    onChange={handleChange}
                    placeholder="Released Year"
                />
                <input
                    name="Genre"
                    value={song.Genre}
                    onChange={handleChange}
                    placeholder="Genre"
                />
                <button type="submit" className="btn btn-primary">{isEditing ? 'Save Changes' : 'Add Song'}</button>
            </form>
    
            <table>
                <thead>
                    <tr>
                        <th>Song Name</th>
                        <th>Artist Name</th>
                        <th>Album Name</th>
                        <th>Released Year</th>
                        <th>Genre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((songItem) => (
                        <tr key={songItem._id}>
                            <td>{songItem.songName}</td>
                            <td>{songItem.artistName}</td>
                            <td>{songItem.albumName}</td>
                            <td>{songItem.releasedYear}</td>
                            <td>{songItem.Genre}</td>
                            <td>
                                <button onClick={() => handleEdit(songItem)}>Edit</button>
                                <button onClick={() => handleDelete(songItem._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
    
export default AdminDashboard;
