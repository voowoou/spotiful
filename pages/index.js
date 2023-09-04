import React, { useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Main from "@/components/Main";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function IndexPage() {
    // To handle received token
    useEffect(() => {
        const accessTokenFragment = window.location.hash.slice(1); // Take string after # symbol
        const accessToken = new URLSearchParams(accessTokenFragment).get("access_token"); // Take access_token param from URL search parameters

        if (accessToken) {
            localStorage.setItem("access_token", accessToken); // Save token to localStorage
            window.history.replaceState({}, document.title, window.location.pathname); // Remove response with access_token params
        }
    }, []);

    return (
        <div>
            <Head>
                <title>Spotiful</title>
            </Head>
            <Header />
            <Main />
            <About />
            <Footer />
        </div>
    );
};