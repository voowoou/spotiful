import React, {useState}  from "react";
import Search from "./Search";
import Playlist from "./Playlist";
import styles from "@/styles/main.module.sass"

export default function Main() {
    const [tracksToAdd, setTracksToAdd] = useState([]);

    return (
        <div id="main-section" className={styles.mainContainer}>
            <h2>PLAYLIST</h2>
            <div className={styles.searchPlaylist}>
                <Search tracksToAdd={tracksToAdd} setTracksToAdd={setTracksToAdd} />
                <Playlist tracksToAdd={tracksToAdd} setTracksToAdd={setTracksToAdd}  />
            </div>
        </div>
    );
};