
import axios from 'axios';
const BASE_API = process.env.REACT_APP_BASE_API_URL;

// const BASE_API_URL = 'http://localhost:4000'; // Adjust accordingly

const getUserPlaylists = async (userId) => {
    try {
        const response = await fetch(`${BASE_API}/users/${userId}/playlists`);
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching playlists:', error);
        throw error;
    }
};

const getPlaylistDetails = async (playlistId) => {
    try {
        const response = await fetch(`${BASE_API}/playlists/${playlistId}`);
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching playlist details:', error);
        throw error;
    }
};

const deleteSongFromPlaylist = async (playlistId, songId) => {
    try {
        const response = await axios.delete(`${BASE_API}/playlists/${playlistId}/songs/${songId}`);
        if (response.status !== 200) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        return response.data;
    } catch (error) {
        console.error('Error deleting song from playlist:', error);
        throw error;
    }
};



export {
    getUserPlaylists,
    getPlaylistDetails,
    deleteSongFromPlaylist,

};
