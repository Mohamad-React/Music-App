import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import styles from "./Aboutartist.module.css";
const Aboutartist = () => {
  const { name } = useParams();
  const [artist, setArtist] = useState(null);
  const [album, setAlbum] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&api_key=bf05f33037f09f10b5686827c0943ebd&format=json`)
      .then(response => {
        setArtist(response.data.artist);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });

    axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${name}&api_key=bf05f33037f09f10b5686827c0943ebd&format=json`)
      .then(response => {
        setAlbum(response.data.topalbums.album[0]);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [name]);
 
  return (
    <div className={styles.artistdetail}>
      <h2 className={styles.artistdetailtitle}>Artist Detail</h2>
      {error && <p>An error occurred: {error.message}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        artist && (
          <>
            <p className={styles.artistdetailname}>Name: {artist.name}</p>
            {album && (
              <img className={styles.artistdetailalbum} src={album.image[3]['#text']} alt={album.name} />
            )}
            <p className={styles.artistdetailbio}><span>Bio:</span> {artist.bio.summary}</p>
          
          </>
        )
      )}
    </div>
  );
};

export default Aboutartist;
