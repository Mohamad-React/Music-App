/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';


import styles from "./Sidebyside.module.css";

const SideBySideComparison = () => {
    const [leftSearchTerm, setLeftSearchTerm] = useState("");
    const [rightSearchTerm, setRightSearchTerm] = useState("");

    const [leftArtist, setLeftArtist] = useState({});
    const [rightArtist, setRightArtist] = useState({});

    const [leftSearchResults, setLeftSearchResults] = useState([]);
    const [rightSearchResults, setRightSearchResults] = useState([]);

    const [leftAlbumArt, setLeftAlbumArt] = useState("");
    const [rightAlbumArt, setRightAlbumArt] = useState("");

    const API_KEY = 'bf05f33037f09f10b5686827c0943ebd';
    const API_URL = `https://ws.audioscrobbler.com/2.0/?method=artist.search&api_key=${API_KEY}&format=json`;

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${API_URL}&artist=${leftSearchTerm}`);
            setLeftSearchResults(response.data.results.artistmatches.artist);
        };

        if (leftSearchTerm) {
            fetchData();
        }
    }, [leftSearchTerm]);

    useEffect(() => {
        const fetchRightData = async () => {
            const response = await axios.get(`${API_URL}&artist=${rightSearchTerm}`);
            setRightSearchResults(response.data.results.artistmatches.artist);
        };

        if (rightSearchTerm) {
            fetchRightData();
        }
    }, [rightSearchTerm]);

    const handleLeftArtistSelect = async (artist) => {
        setLeftArtist(artist);
        setLeftSearchTerm("");
        const response = await axios.get(
            `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist.name}&api_key=${API_KEY}&format=json`
        );
        setLeftAlbumArt(response.data.topalbums.album[0].image[2]["#text"]);
    };

    const handleRightArtistSelect = async (artist) => {
        setRightArtist(artist);
        setRightSearchTerm("");
        const response = await axios.get(
            `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist.name}&api_key=${API_KEY}&format=json`
        );
        setRightAlbumArt(response.data.topalbums.album[0].image[2]["#text"]);
    };

    return (
        <div >
            <div className={styles.containerone}>
                <input
                    type="text"
                    value={leftSearchTerm}
                    onChange={(e) => setLeftSearchTerm(e.target.value)}
                    placeholder="Search for an Artist"
                />
                {leftSearchResults.length > 0 && leftSearchTerm && (
                    <ul>
                        {leftSearchResults.map((result) => (
                            <li key={result.name} onClick={() => handleLeftArtistSelect(result)}>
                                {result.name}
                            </li>
                        ))}
                    </ul>
                )}
                {leftArtist.name && (
                    <div className={styles.container}>
                        <h3>{leftArtist.name}</h3>
                        <p>Listeners: {parseFloat(leftArtist.listeners).toLocaleString()} M</p>
                        <img src={leftAlbumArt} alt={leftArtist.mbi} />
                        <a href={leftArtist.url} target="blank">more information</a>
                    </div>
                )}
            </div>
            <div className={styles.containertwo}>
                <input
                    type="text"
                    value={rightSearchTerm}
                    onChange={(e) => setRightSearchTerm(e.target.value)}
                    placeholder="Search for an Artist"
                />
                {rightSearchResults.length > 0 && rightSearchTerm && (
                    <ul>
                        {rightSearchResults.map((result) => (
                            <li key={result.name} onClick={() => handleRightArtistSelect(result)}>
                                {result.name}
                            </li>
                        ))}
                    </ul>
                )}
                {rightArtist.name && (
                    <div className={styles.containerright}>
                        <h3>{rightArtist.name}</h3>
                        <p>Listeners: {parseFloat(rightArtist.listeners).toLocaleString()} M</p>
                        <img src={rightAlbumArt} alt={rightArtist.mbi} />
                        <a href={rightArtist.url} target="blank">more information</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SideBySideComparison;
