import React, {useEffect, useState} from "react";
import { useForm, Controller } from "react-hook-form";

function TracksToAdd({tracksToAdd, setTracksToAdd}) {

    const handleClick = (track) => {
        const indexToRemove = tracksToAdd.findIndex((prevTrack) => prevTrack.id === track.id);
        const newTracks = [...tracksToAdd];
        newTracks.splice(indexToRemove, 1);
        setTracksToAdd(newTracks);
    };

    const trackList = tracksToAdd.map((track, index) => 
        <li key = {`${track.id}-${index}`}>
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
            <button onClick={() => handleClick(track)}>-</button>
        </li>    
    )

    return <ul>{trackList}</ul>;
};

export default function Playlist({tracksToAdd, setTracksToAdd}) {
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    
    const {handleSubmit, control} = useForm();

    const onSubmit = async (data) => {
        await Promise.all([
            setPlaylistName(data.playlistName),
            setPlaylistDescription(data.playlistDescription),
            setIsPublic(data.privacy),
        ]);
    };

    const createPlaylist = async () => {
        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
                },
            });
            if (response.ok) {
                const userObj = await response.json();
                const userId = userObj.id;
                console.log('1 — User ID was received');
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
                console.log('2 — Playlist was created');
                addTracksToPlaylist(playlistId);
            } else {
                throw new Error('Playlist adding failed');
            }
        } catch (error) {
            window.alert(error);
        }
    };

    const addTracksToPlaylist = async (playlistId) => {
        //tracksToAdd.map(track )
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
                console.log('3 — Tracks was added')
                window.alert('Your playlist was successfully created!')
            } else {
                throw new Error('Tracks adding failed');
            }
        } catch (error) {
            window.alert(error);
        }
    };

    useEffect(() => {
        if (sessionStorage.getItem('access_token')) {
            createPlaylist();
        }
    }, [playlistName, playlistDescription, isPublic]);

    return (
        <div>
            <h3>Your new Spotify playlist</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <label htmlFor="playlistName">Name</label>
                        <Controller 
                            name="playlistName"
                            control={control}
                            render={ ({field}) => (
                                <input 
                                    {...field}
                                    type="text"
                                    id="playlistName"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label htmlFor="playlistDescription">Description</label>
                        <Controller 
                            name="playlistDescription"
                            control={control}
                            render={ ({field}) => (
                                <input 
                                    {...field}
                                    type="text"
                                    id="playlistDescription"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <span>Privacy</span>
                        <Controller 
                            name="privacy"
                            control={control}
                            render={ ({field}) => (
                                <input 
                                    {...field}
                                    type="radio"
                                    id="private"
                                    checked={field.value === "false"}
                                    onChange={() => field.onChange("false")}
                                />
                            )}
                        />
                        <label htmlFor="private">Private</ label>
                        <Controller 
                            name="privacy"
                            control={control}
                            render={ ({field}) => (
                                <input 
                                    {...field}
                                    type="radio"
                                    id="public"
                                    checked={field.value === "true"}
                                    onChange={() => field.onChange("true")}
                                />
                            )}
                        />
                        <label htmlFor="public" >Public</ label>
                    </div>
                </div>
                <TracksToAdd tracksToAdd={tracksToAdd} setTracksToAdd={setTracksToAdd} />
                <input type="submit" value="SAVE NEW PLAYLIST" />
            </form>
        </div>
    );
};