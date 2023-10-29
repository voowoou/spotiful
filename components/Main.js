import React, {useState}  from "react";
import Search from "./Search";
import Playlist from "./Playlist";
import styles from "@/styles/main.module.sass"

export default function Main() {
    const [tracksToAdd, setTracksToAdd] = useState([]); // To handle a tracks transfer between Search and Playlist components    
    return (
        <div id="main-section" className={styles.mainContainer}>
            <h2>PLAYLIST</h2>
            <div className={styles.searchAndPlaylist}>
                <Search tracksToAdd={tracksToAdd} setTracksToAdd={setTracksToAdd} />
                <Playlist tracksToAdd={tracksToAdd} setTracksToAdd={setTracksToAdd}  />
            </div>
        </div>
    );
};