import React, {useState}  from "react";
import Search from "./Search";
import Playlist from "./Playlist";

export default function Main() {
    const [tracksToAdd, setTracksToAdd] = useState([]);

    return (
        <div>
            <h2>PLAYLIST</h2>
            <Search tracksToAdd={tracksToAdd} setTracksToAdd={setTracksToAdd} />
            <Playlist tracksToAdd={tracksToAdd} setTracksToAdd={setTracksToAdd}  />
        </div>
    );
};