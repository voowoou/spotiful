import React from "react";
import styles from "@/styles/about.module.sass";

export default function About() {
    return (
        <div id="about-section" className={styles.aboutContainer}>
            <h2>ABOUT</h2> 
            <div>
                <p>
                    So, the guide is simple. You just search for a song by its name on Spotify and then you can choose from the relevant songs. 
                    Then you click on the plus icon, and your song goes to "Your new Spotify playlist" where you can give a name to the playlist, 
                    delete songs, and save the playlist to your Spotify profile by clicking the "Save new playlist" button. That's it for now.
                </p>
                <p>
                    In general, this is an educational project that I created for the Codecademy.com course. I used vanilla JavaScript, React, 
                    Next.js, and Git. Maybe later, I'll implement some new features, but for now, you can check out the project's GitHub repository.
                </p>

            </div>
        </div>
    );
}