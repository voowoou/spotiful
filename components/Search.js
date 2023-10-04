import React, { useEffect, useState } from "react";

function SearchBar({setSearchValue}) {
    const handleChange = (event) => {
        setSearchValue(event.target.value);
    }

    return (
        <form>
            <input
                type="text" 
                name="search-field"
                onChange={handleChange}
            />
        </form>
    );
};

function SearchList({tracksArray, tracksToAdd, setTracksToAdd}) {
    const handleClick = track => {
        if (!tracksToAdd.includes(track.id)) {
            setTracksToAdd((prevTracks) => [...prevTracks, track]);
        }
    };

    const searchResults = tracksArray.map(track =>
        <li key={track.id}>
            <div>
                <span>{track.name}</span>
                <div>
                    <span>
                        {(track.artists).map((artist, index) =>
                            index !== (track.artists.length - 1) ? `${artist.name}, ` : artist.name
                        )}
                    </span>
                    <span> | {track.album.name}</span>
                </div>
            </div>
            <button onClick={() => handleClick(track)}>+</button>
        </li>
    );

    return <ul>{searchResults}</ul>;
};

export default function Search({tracksToAdd, setTracksToAdd}) {
    const [searchValue, setSearchValue] = useState("");
    const [tracksArray, setTracksArray] = useState([]);

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
        <div>
            <h3>Search by song name</h3>
            <SearchBar setSearchValue={setSearchValue}/>
            <SearchList 
                tracksArray={tracksArray} 
                tracksToAdd={tracksToAdd}
                setTracksToAdd={setTracksToAdd}
            />
        </div>
    );
};