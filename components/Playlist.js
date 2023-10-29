import React, {useEffect, useState} from "react";
import { useForm, Controller } from "react-hook-form";
import MinusIcon from "@/public/minus_icon.svg";
import styles from "@/styles/playlist.module.sass";
import listStyles from "@/styles/list.module.sass";

function TracksToAdd({tracksToAdd, setTracksToAdd}) {
    // To handle tracks removing from playlist setting
    const handleClick = (track) => {
        const indexToRemove = tracksToAdd.findIndex((prevTrack) => prevTrack.id === track.id);
        const newTracks = [...tracksToAdd];
        newTracks.splice(indexToRemove, 1);
        setTracksToAdd(newTracks);
    };

    // Return a list of tracks to add
    const trackList = tracksToAdd.map((track, index) => 
        <li key = {`${track.id}-${index}`}>
            <div className={listStyles.trackInfo} >
                <span className={listStyles.trackName} >{track.name}</span>
                <p className={listStyles.trackArtist} >
                    {(track.artists).map((artist, index) =>
                        index !== (track.artists.length - 1) ? `${artist.name}, ` : artist.name
                    )}
                </p>
            </div>
            <button onClick={() => handleClick(track)} className={listStyles.button} >
                <MinusIcon className={listStyles.icon} />
            </button>
        </li>    
    )

    return <ul className={listStyles.ul}>{trackList}</ul>;
};


export default function Playlist({tracksToAdd, setTracksToAdd}) {
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    
    const {handleSubmit, control} = useForm();

    // The function wait till all data will receive before sending POST-request
    const onSubmit = async (data) => {
        await Promise.all([
            setPlaylistName(data.playlistName),
            setPlaylistDescription(data.playlistDescription),
            setIsPublic(data.privacy),
        ]);
    };

    const createPlaylist = async () => {
        // Firstly get an user ID
        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
                },
            });
            if (response.ok) {
                const userObj = await response.json();
                const userId = userObj.id;
                console.log('1 — User ID was received'); // To errors tracking
                // If the user ID received and fields are setted start the postRequest function
                if (playlistName && playlistDescription && isPublic) {
                    postRequest(userId);
                }
            } else {
                throw new Error('User ID request failed');
            }
        } catch (error) {
            window.alert(error);
        }
    };

    const postRequest = async (userId) => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                  method: "POST",
                  headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name: playlistName,
                    public: isPublic,
                    description: playlistDescription,
                  }),
            });
            if (response.ok) {
                const responseObj = await response.json();
                const playlistId = responseObj.id;
                console.log('2 — Playlist was created'); // To errors tracking
                addTracksToPlaylist(playlistId); // If the playlist is created start addTracksToPlaylist function
            } else {
                throw new Error('Playlist adding failed');
            }
        } catch (error) {
            window.alert(error);
        }
    };

    // The last function that add chosen tracks to the new playlist  
    const addTracksToPlaylist = async (playlistId) => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                method: "POST",
                headers: {
                  Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  uris: tracksToAdd.map(track => track.uri),
                }),
            });
            if (response.ok) {
                console.log('3 — Tracks was added') // To errors tracking
                window.alert('Your playlist was successfully created!')
            } else {
                throw new Error('Tracks adding failed');
            }
        } catch (error) {
            window.alert(error);
        }
    };

    // To handle side effects
    useEffect(() => {
        if (sessionStorage.getItem('access_token')) {
            createPlaylist();
        }
    }, [playlistName, playlistDescription, isPublic]);

    return (
        <div className={styles.playlistContainer} >
            <h3>Your new Spotify playlist</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className={styles.textLabel}>Name
                        <Controller 
                            name="playlistName"
                            control={control}
                            render={ ({field}) => (
                                <input 
                                    {...field}
                                    type="text"
                                />
                            )}
                        />
                    </label>
                </div>
                <div>
                    <label className={styles.textLabel}>Description
                        <Controller 
                            name="playlistDescription"
                            control={control}
                            render={ ({field}) => (
                                <input 
                                    {...field}
                                    type="text"
                                    className={styles.inputField}
                                />
                            )}
                        />
                    </label>
                </div>
                <div>
                    <span>Privacy
                        <label>
                            <Controller 
                                name="privacy"
                                control={control}
                                render={ ({field}) => (
                                    <input 
                                        {...field}
                                        type="radio"
                                        checked={field.value === "false"}
                                        onChange={() => field.onChange("false")}
                                        className={styles.radioDefault}
                                    />
                                )}
                            />
                            <span className={styles.radioCustom}></span>
                        Private</ label>
                        <label>
                            <Controller 
                                name="privacy"
                                control={control}
                                render={ ({field}) => (
                                    <input 
                                        {...field}
                                        type="radio"
                                        checked={field.value === "true"}
                                        onChange={() => field.onChange("true")}
                                        className={styles.radioDefault}
                                    />
                                )}
                            />
                            <span className={styles.radioCustom}></span>
                        Public</ label>
                    </span>
                </div>
                <input type="submit" value="SAVE NEW PLAYLIST" className={styles.saveButton} />
            </form>
            <TracksToAdd tracksToAdd={tracksToAdd} setTracksToAdd={setTracksToAdd} />
        </div>
    );
};