import React from "react";
import Icon from "@/public/icon.svg";

export default function Header() {
    return (
        <header>
            <div>
                <Icon />
            </div>
            <nav>
                <span>PLAYLIST</span>
                <span>INSTRUCTIONS & ABOUT</span>
            </nav>
        </header>
    );
};