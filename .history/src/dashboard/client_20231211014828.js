import axios from 'axios';

const BASE_API = process.env.REACT_APP_BASE_API_URL;
const DASHBOARD_API = `${BASE_API}/api`;

// const BASE_API_URL = 'http://localhost:4000/api'; // Adjust accordingly

// Function to add a new song
export const addSong = async (songData) => {
    try {
        const response = await axios.post(`${DASHBOARD_API}/songs`, songData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to retrieve all songs
export const getAllSongs = async () => {
    try {
        const response = await axios.get(`${DASHBOARD_API}/songs`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to update a song
export const updateSong = async (songId, songData) => {
    try {
        const response = await axios.put(`${DASHBOARD_API}/songs/${songId}`, songData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to delete a song
export const deleteSong = async (songId) => {
    try {
        const response = await axios.delete(`${DASHBOARD_API}/songs/${songId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
