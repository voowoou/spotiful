import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header";
import Main from "@/components/Main";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function IndexPage() {
    const router = useRouter();
    const [showContent, setShowContent] = useState(true); // If there's access token showContent sets to true
    const [accessTokenExpiresAt, setAccessTokenExpiresAt] = useState(null); // Saves expiration time to handle redirect to login

    // To handle received token
    useEffect(() => {
        const handleToken = () => {
            const accessTokenFragment = window.location.hash.slice(1); // Takes string after # symbol
            const accessToken = new URLSearchParams(accessTokenFragment).get("access_token"); // Takes access_token param from URL search parameters
            const expiresIn = new URLSearchParams(accessTokenFragment).get("expires_in"); // Takes expires_in param from URL search parameters
    
            if (accessToken) {
                const expirationTime = Date.now() + expiresIn * 1000; // Calculates time when access token will expire
                sessionStorage.setItem('access_token', accessToken); // Saves token
                setAccessTokenExpiresAt(expirationTime)
            } else {
                setShowContent(false);
                router.push('/login'); // Redirect to login page
            }
        };

        handleToken();
    }, []);

    useEffect(() => {
        if(accessTokenExpiresAt) {
            const timeUntilExpiration = accessTokenExpiresAt - Date.now();
            // If the token didn't expire create a timeout function that redirect a user to the login page after expiring
            if (timeUntilExpiration > 0) { 
                const tokenRefreshTimeout = setTimeout(() => {
                    router.push('/login');
                }, timeUntilExpiration);
                return () => clearTimeout(tokenRefreshTimeout);
            }
        }
    }, [accessTokenExpiresAt]);

    // Content shows if showContent state is true
    return (
        <div className="container">
            <Head>
                <title>Spotiful</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            {showContent && ( 
                <div>
                    <Header />
                    <Main />
                    <About />
                    <Footer />
                </div>
            )}
        </div>
    );
};