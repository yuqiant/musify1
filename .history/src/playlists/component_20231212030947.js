

import React, { useState } from 'react';

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
        <div style={{ marginBottom: '10px' }}>
            <div onClick={toggleSongsList} style={{ cursor: 'pointer' }}>
                <h3>{playlist.name}</h3>
                <button onClick={() => onEditPlaylist(playlist._id)}>Edit Playlist</button>
                <button onClick={() => onDeletePlaylist(playlist._id)}>Delete Playlist</button>
            </div> 
            {isExpanded && (
                <div>

                    {playlist.songs.map(song => (
                        <div key={song._id}>{song.songName}
                            <button onClick={() => handleDeleteClick(song._id)}>Delete Song</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlaylistComponent;
