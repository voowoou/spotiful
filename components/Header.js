import React from "react";
import Icon from "@/public/icon.svg";
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
                    <span>INSTRUCTIONS & ABOUT</span>
                </a>
            </nav>
        </header>
    );
};