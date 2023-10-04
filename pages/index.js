import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header";
import Main from "@/components/Main";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function IndexPage() {
    const router = useRouter();
    const [showContent, setShowContent] = useState(true);
    const [accessTokenExpiresAt, setAccessTokenExpiresAt] = useState(null);

    // To handle received token
    useEffect(() => {
        const handleToken = () => {
            const accessTokenFragment = window.location.hash.slice(1); // Take string after # symbol
            const accessToken = new URLSearchParams(accessTokenFragment).get("access_token"); // Take access_token param from URL search parameters
            console.log(accessToken);
            const expiresIn = new URLSearchParams(accessTokenFragment).get("expires_in");
    
            if (accessToken) {
                const expirationTime = Date.now() + expiresIn * 1000;
                sessionStorage.setItem('access_token', accessToken); // Save token to localStorage
                sessionStorage.setItem('access_token_expires_at', expirationTime);
                setAccessTokenExpiresAt(expirationTime)
            } else {
                setShowContent(false);
                router.push('/login');
            }
        };

        handleToken();
    }, []);

    useEffect(() => {
        if(accessTokenExpiresAt) {
            const timeUntilExpiration = accessTokenExpiresAt - Date.now();
            if (timeUntilExpiration > 0) {
                const tokenRefreshTimeout = setTimeout(() => {
                    router.push('/login');
                }, timeUntilExpiration);
                return () => clearTimeout(tokenRefreshTimeout);
            }
        }
    }, [accessTokenExpiresAt]);

    return (
        <div>
            <Head>
                <title>Spotiful</title>
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