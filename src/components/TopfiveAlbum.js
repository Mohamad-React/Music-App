import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from "./Topfivealbum.module.css"

const Topalbum = () => {
  const { mbid } = useParams();
  const [topAlbums, setTopAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=${mbid}&api_key=bf05f33037f09f10b5686827c0943ebd&format=json`);
    
        if (result.data.topalbums) {
          setTopAlbums(result.data.topalbums.album);
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
    <>
      <div className={styles.topfive}>
        <h1>Top Albums</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className={styles.topfivelist}>
            {topAlbums.slice(0, 5).map(album => (
              <li key={album.name} className={styles.topfiveitem}>
                <img src={album.image && album.image[2]['#text']} alt={album.name} />
                <h2>{album.name.substring(0, 17)}</h2>
                <p>Play Count: {album.playcount.toLocaleString()} M</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Topalbum;
