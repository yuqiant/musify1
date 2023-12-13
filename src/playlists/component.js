import React, { useState } from 'react';
import './create.css';

const PlaylistComponent = ({ playlist, onDeleteSong, onEditPlaylist, onDeletePlaylist }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleDeleteClick = (songId) => {
        if (window.confirm('Are you sure you want to delete this song from the playlist?')) {
            onDeleteSong(playlist._id, songId);
        }
    };

    const toggleSongsList = () => {
        console.log(playlist.songs);
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="playlist-container"> {/* Apply container class */}
            <div onClick={toggleSongsList} className="playlist-header"> {/* Apply header class */}
                <h3 className="playlist-title">{playlist.name}</h3> {/* Apply title class */}
                <button className="btn4 btn-primary playlist-edit-button" onClick={() => onEditPlaylist(playlist._id)}>Edit</button> {/* Apply edit button class */}
                <button className="btn4 btn-primary" onClick={() => onDeletePlaylist(playlist._id)}>Cancel</button>
            </div>

            {isExpanded && (
                <div className="playlist-songs"> {/* Apply songs list class */}
                    {playlist.songs.map(song => (
                        <div key={song._id} className="playlist-song-item"> {/* Apply song item class */}
                            {song.songName}
                            <button className="song-delete-button" onClick={() => handleDeleteClick(song._id)}>Delete</button> {/* Apply delete button class */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlaylistComponent;
