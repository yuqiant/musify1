
import axios from 'axios';

// const BASE_API_URL = 'http://localhost:4000'; // Adjust accordingly

const getUserPlaylists = async (userId) => {
    try {
        const response = await fetch(`${BASE_API_URL}/users/${userId}/playlists`);
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching playlists:', error);
        throw error; // 重新抛出错误，以便调用者可以捕获并处理它
    }
};

const getPlaylistDetails = async (playlistId) => {
    try {
        const response = await fetch(`${BASE_API_URL}/playlists/${playlistId}`);
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
        const response = await axios.delete(`${BASE_API_URL}/playlists/${playlistId}/songs/${songId}`);
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
