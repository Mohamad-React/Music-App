import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Searchitem.module.css';

const Searchitem = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchTerm}&api_key=bf05f33037f09f10b5686827c0943ebd&format=json`)
      .then(response => {
        setArtists(response.data.results.artistmatches.artist);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [searchTerm]);

  return (
    <div className={styles.Searchitem}>
      <h2 className={styles.title}>Artist Search</h2>
      <input
        type="text"
        placeholder="Search for an artist"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className={styles.input}
      />
      {error && <p className={styles.error}>An error occurred: {error.message}</p>}
      {isLoading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <ul className={styles.list}>
          {artists.map(artist => (
            <li key={artist.name} className={styles.item}>
              {artist.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchitem;
