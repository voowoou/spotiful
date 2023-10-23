import React from "react";
import Icon from "@/public/spotiful_icon.svg";
import styles from "@/styles/header.module.sass"

export default function Header() {
    return (
        <header className={styles.headerContainer}>
            <div>
                <Icon className={styles.spotiful} />
            </div>
            <nav>
                <a href="#main-section">
                    <span>PLAYLIST</span>
                </a>
                <a href="#about-section">
                    <span>ABOUT</span>
                </a>
            </nav>
        </header>
    );
};