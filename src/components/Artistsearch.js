import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import styles from "./Artistsearch.module.css";
const ArtistSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchTerm}&api_key=bf05f33037f09f10b5686827c0943ebd&format=json`)
      .then(response => {
        if (response.data.results && response.data.results.artistmatches) {
          setArtists(response.data.results.artistmatches.artist);
        }
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [searchTerm]);

  useEffect(() => {
    return () => {
      setSearchTerm('');
    };
  }, [location]);

  return (
    <div className={styles.artistsearch}>
      <h2 className={styles.artistsearchtitle}>Artist Search</h2>
      <FiSearch className={styles.search} />
      <input
        type="text"
        placeholder="Search for an artist"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className={styles.artistsearchinput}
      />
      {error && (
        <p className={styles.artistsearcherror}>
          An error occurred: {error.message}
        </p>
      )}
      {searchTerm === '' || artists.length === 0 ? null : (
        isLoading ? (
          <p className={styles.artistsearchloading}>Loading...</p>
        ) : (
          <ul className={styles.artistsearchlist}>
            {artists.map(artist => (

              <Link to={`/artist/${artist.name}`} className={styles.artistsearchlink}>
                <li key={artist.name} className={styles.artistsearchitem}>
                  {artist.name}
                </li>
              </Link>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default ArtistSearch;
