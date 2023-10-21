import React from "react";
import Head from "next/head";
import Icon from "@/public/icon.svg";
import SpotifyIcon from "@/public/spotify_icon.svg";
import { useRouter } from "next/router";
import styles from "@/styles/login.module.sass";

export default function Login() {
    const router = useRouter();

    // Construct redirect URL to Spotify Authorization from "Log in" button
    const redirectToSpotifyAuth = () => {
        const clientId = '46e1be6c3739457db4f96be9b72a13c8'; // From Spotify Dashboard
        const scope = 'user-read-private,user-read-email,playlist-modify-public,playlist-modify-private'; // Allows access to these listed features
        const redirectUri = 'http://localhost:3000/'; // Redirect to the main page of the app
        const spotifyAuthLink = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
        router.push(spotifyAuthLink); // Change url in the window to this value
    };

    return (
        <>
            <Head>
                <title>Log in</title>
            </Head>
            <div className={styles.loginContainer}>
                <header>
                    <Icon className={styles.spotiful} />
                    <h1 className={styles.h1}>Search by songs and create your Spotify playlist</h1>
                    <p>This app uses your Spotify profile credentials to handle its main feature</p>
                </header>
                <div>
                    <a href="#" onClick={redirectToSpotifyAuth}>
                        <SpotifyIcon className={styles.spotify} />
                        <span>Log in via Spotify</span>
                    </a>
                </div>
            </div>
        </>
    );
};