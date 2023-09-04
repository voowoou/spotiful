import React from "react";

function PlaylistSettings() {
    const handleSubmit = (event) => {
        event.preventDefault(); // Предотвращение обновления страницы при нажатии на Submit
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="playlist-name">Name</label>
                <input type="text" id="playlist-name" />
            </div>
            <div>
                <label htmlFor="playlist-description">Description</label>
                <input type="text" id="playlist-description" />
            </div>
            <div>
                <span>Privacy</span>

                <input type="radio" id="private" name="privacy" value="private"/>
                <label htmlFor="private">Private</ label>

                <input type="radio" id="public" name="privacy" value="public"/>
                <label htmlFor="public" >Public</ label>
            </div>
            <input type="submit" value="SAVE NEW PLAYLIST" />
        </form>
    );
};

export default function Playlist() {
    return (
        <div>
            <h3>Your new Spotify playlist</h3>
            <PlaylistSettings />
        </div>
    );
};