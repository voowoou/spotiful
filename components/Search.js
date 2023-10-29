import React, { useEffect, useState } from "react";
import PlusIcon from "@/public/plus_icon.svg";
import styles from "@/styles/search.module.sass";
import listStyles from "@/styles/list.module.sass";

// Return search bar
function SearchBar({setSearchValue}) {
    const handleChange = (event) => {
        setSearchValue(event.target.value);
    }

    return (
        <input className={styles.searchField}
            type="text" 
            name="search-field"
            onChange={handleChange}
        />
    );
};

// Return list after user's search request
function SearchList({tracksArray, tracksToAdd, setTracksToAdd}) {
    // Add track after click on button 
    const handleClick = track => {
        if (!tracksToAdd.includes(track.id)) {
            setTracksToAdd((prevTracks) => [...prevTracks, track]);
        }
    };

    // Render a list of found tracks
    const searchResults = tracksArray.map(track =>
        <li key={track.id} >
            <div className={listStyles.trackInfo} >
                <span className={listStyles.trackName} >{track.name}</span>
                <p className={listStyles.trackArtist} >
                    {(track.artists).map((artist, index) =>
                        index !== (track.artists.length - 1) ? `${artist.name}, ` : artist.name
                    )}
                </p>
            </div>
            <button onClick={() => handleClick(track)} className={listStyles.button} >
                <PlusIcon className={listStyles.icon} />
            </button>
        </li>
    );

    return <ul className={listStyles.ul}>{searchResults}</ul>;
};

export default function Search({tracksToAdd, setTracksToAdd}) {
    const [searchValue, setSearchValue] = useState(""); // Value from search field
    const [tracksArray, setTracksArray] = useState([]); // Found tracks

    // Get tracks via Spotify API
    useEffect(() => {
        const getTracks = async () => {
            if (searchValue) {
                try {
                    const response = await fetch('https://api.spotify.com/v1/search?q=' + searchValue + '&type=track&limit=10', {
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
                        },
                    });
                    if (response.ok) {
                        const responseObject = await response.json();
                        setTracksArray(responseObject.tracks.items);
                    } else {
                        throw new Error('Request failed');
                    }
                } catch (error) {
                    window.alert(error);
                }
            }
        };
        getTracks();
    }, [searchValue]);

    return (
        <div className={styles.searchContainer} >
            <h3>Search by song name</h3>
            <SearchBar 
                setSearchValue={setSearchValue}
            />
            <SearchList 
                tracksArray={tracksArray} 
                tracksToAdd={tracksToAdd}
                setTracksToAdd={setTracksToAdd}
            />
        </div>
    );
};