import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import * as userClient from '../users/client'; // Adjust path as needed
import * as songClient from './client'; // Adjust path as needed
import * as playlistClient from '../playlists/client';
import PlaylistComponent from '../playlists/component';
import AdminDashboard from './admindashboard';
import "./admindashboard.css";
import UserTable from "../users/table";


const Dashboard = () => {
    const { userId } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const BASE_API = process.env.REACT_APP_BASE_API_URL || 'http://localhost:4000';


    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const response = await userClient.findUserById(userId);
                    setUserData(response);
                    const playlistsResponse = await playlistClient.getUserPlaylists(userId);
                    // setPlaylists(playlistsResponse);

                    const playlistsDetailPromises = playlistsResponse.map(async (playlist) => {
                        return await playlistClient.getPlaylistDetails(playlist._id);
                    });

                    const playlistsDetails = await Promise.all(playlistsDetailPromises);
                    console.log(playlistsDetails);
                    setPlaylists(playlistsDetails);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };


        fetchUserData();
    }, [userId]);

    if (!userData) {
        return <div>Loading user data...</div>;
    }

    const handleAddSong = async (song) => {
        try {
            await songClient.addSong(song);
            alert('Song added successfully');
        } catch (error) {
            console.error('Error adding song:', error);
            alert('Failed to add song');
        }
    };

    const handleEditSong = async (songId, updatedSong) => {
        try {
            await songClient.updateSong(songId, updatedSong);
            alert('Song updated successfully');
        } catch (error) {
            console.error('Error updating song:', error);
            alert('Failed to update song');
        }
    };

    const handleDeleteSong = async (songId) => {
        try {
            await songClient.deleteSong(songId);
            alert('Song deleted successfully');
        } catch (error) {
            console.error('Error deleting song:', error);
            alert('Failed to delete song');
        }
    };

    const handleDeleteSongFromPlaylist = async (playlistId, songId) => {
        if (window.confirm('Are you sure you want to remove this song from the playlist?')) {
            try {
                await playlistClient.deleteSongFromPlaylist(playlistId, songId);

                // 重新获取播放列表数据来更新 UI
                const updatedPlaylists = await playlistClient.getUserPlaylists(userId);
                setPlaylists(updatedPlaylists);
            } catch (error) {
                console.error('Error deleting song from playlist:', error);
                alert('Failed to delete song from playlist');
            }
        }
    };


    const handleEditPlaylist = (playlistId) => {
        navigate(`/edit-playlist/${playlistId}`);
    };


    const handleCreatePlaylist = async () => {
        if (!playlistName || !description) {
            alert("Please enter both a name and a description for the playlist.");
            return;
        }

        try {
            // console.log('Creating playlist with:', {
            //     userId,
            //     name: playlistName,
            //     description: description,
            //     songs: []
            // });

            // const createResponse = await axios.post(`${BASE_API}/api/playlists`, {
            //     userId,
            //     name: playlistName,
            //     description: description,
            //     songs: []
            // });


            // const updateResponse = await axios.post(`${BASE_API}/api/users/${userId}/playlists`, {
            //     userId: createResponse.data.userId,
            //     playlistId: createResponse.data._id,
            //     name: createResponse.data.name,
            //     description: createResponse.data.description,
            //     songs: createResponse.data.songs
            // });


            // const newPlaylistForUser = {
            //     id: createResponse.data._id,
            //     name: createResponse.data.name,
            //     songs: createResponse.data.songs.map(song => ({
            //         id: song._id,
            //         songName: song.songName
            //     }))
            // };

            // setPlaylists([...playlists, newPlaylistForUser]);

            // // 重置表单字段
            // setPlaylistName('');
            // setDescription('');

            // alert("Playlist created successfully!");



            // duplicate prob:

        } catch (error) {
            console.error('Error creating playlist:', error);
            alert("There was an error creating the playlist.");
        }
    };




    const renderCreatePlaylistForm = () => (
        <div>
            <h2>Create a new Playlist</h2>
            <input
                type="text"
                placeholder="Playlist Name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleCreatePlaylist}>Create Playlist</button>
        </div>
    );


    const handleDeletePlaylist = async (playlistId) => {
        if (window.confirm('Are you sure you want to delete this playlist?')) {
            try {
                console.log("now the playlist id is:", playlistId);
                await axios.delete(`${BASE_API}/api/playlists/${playlistId}`);
                console.log("can i delete it?", playlists);
                const updatedPlaylists = playlists.filter(p => p._id !== playlistId);
                setPlaylists(updatedPlaylists);
                alert('Playlist deleted successfully');
            } catch (error) {
                console.error('Error deleting playlist:', error);
                alert('Failed to delete playlist');
            }
        }
    };





    return (
        <div>
            <h1>Hello, <b>{userData.firstName}!</b></h1>

            {userData.role === 'USER' && (
                <div>
                    <h2>Your Playlists</h2>
                    {renderCreatePlaylistForm()}
                    <div>
                        {playlists.map(playlist => (
                            <PlaylistComponent key={playlist._id}
                                playlist={playlist}
                                onDeleteSong={handleDeleteSongFromPlaylist}
                                onEditPlaylist={handleEditPlaylist}
                                onDeletePlaylist={handleDeletePlaylist}

                            />
                        ))}
                    </div>
                </div>
            )}

            {userData.role === 'DJ' && (
                <div className="admin-dashboard">
                    <h3>Song Management</h3>
                    <AdminDashboard
                        onAddSong={handleAddSong}
                        onEditSong={handleEditSong}
                        onDeleteSong={handleDeleteSong}
                    />
                </div>
            )}

            {userData.role === 'ADMIN' && (
                <UserTable />
            )}
        </div>
    );
};

export default Dashboard;
