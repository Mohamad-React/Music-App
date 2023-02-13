import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./Toptracks.module.css";
const Toptrackss = () => {
  const { mbid } = useParams();
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&mbid=${mbid}&api_key=bf05f33037f09f10b5686827c0943ebd&format=json`);
    
        if (result.data.toptracks) {
          setTopTracks(result.data.toptracks.track);
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
      <div className={styles.trackcontainer}>
        <h1>Top Tracks</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className={styles.tracklist}>
            {topTracks.slice(0, 5).map(track => (
              <li key={track.name} className={styles.trackitem}>
                <img src={track.image[2]['#text']} alt={track.name} />
                <h2>{track.name}</h2>
                <p>Play Count: {parseFloat(track.playcount).toLocaleString()} M</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Toptrackss;
