import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

import styles from "./Main.module.css";

const MainView = () => {
  const [topArtists, setTopArtists] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('Australia');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${selectedCountry}&limit=10&api_key=bf05f33037f09f10b5686827c0943ebd&format=json`);

        if (result.data.topartists) {
          setTopArtists(result.data.topartists.artist);
        } else {
          throw new Error('Unexpected response from the API');
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);

    };
   //The fetchData function is called every time the selectedCountry value changes
    fetchData();
  }, [selectedCountry]);





  // const artistfilter = topArtists.filter((item)=>item.name.toLowerCase().includes(serach.toLowerCase()));

  return (
    <>
      <div className={styles.MainView}>
        <div className={styles.MainViewheader}>
          <h1>Top Artists</h1>
          <select className={styles.MainViewselect} onChange={e => setSelectedCountry(e.target.value)} value={selectedCountry}>
            <option value="Australia">Select a country</option>
            <option value="germany">Germany</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Greece">Greece</option>
          </select>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className={styles.MainViewlist}>
            {topArtists.map(artist => (
              <li key={artist.name} className={styles.MainViewlistitem}>
                <Link to={`/home/${artist.mbid}`}><img src={artist.image[2]['#text']} alt={artist.name} /> </Link>
                <h2>{artist.name}</h2>
                <p>Listeners: {parseFloat(artist.listeners).toLocaleString()} M</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default MainView;