import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Topalbum from './TopfiveAlbum';
import styles from "./Details.module.css";


import Toptrackss from './Topfivetracks';

const DetailView = () => {
  const [artist, setArtist] = useState({});
  
  
  const [loading, setLoading] = useState(false);

  const { mbid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios(`http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&mbid=${mbid}&api_key=bf05f33037f09f10b5686827c0943ebd&format=json`);

        if (result.data.artist) {
          setArtist(result.data.artist);
         
        } else {
          throw new Error('Unexpected response from the API');
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [mbid]);

  return (
    <div className={styles.DetailView}>
      {loading ? (
        <p className={styles.DetailViewloading}>Loading...</p>
      ) : (
        <>
          <h1 className={styles.DetailViewtitle}>{artist.name}</h1>
          <img className={styles.DetailViewimage} src={artist.image && artist.image[3]['#text']} alt={artist.name} />
          <p className={styles.DetailViewlisteners}>Listeners: {artist.stats && parseFloat(artist.stats.listeners).toLocaleString()} M</p>
          <p className={styles.DetailViewplays}>Plays: {artist.stats && parseFloat(artist.stats.playcount).toLocaleString()} M</p>

           <Toptrackss/>
           <Topalbum/>
        </>
      )}
    </div>
  );
};

export default DetailView;
