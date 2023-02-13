
import React from "react";
import { Link } from "react-router-dom";
import ArtistSearch from "./Artistsearch";
import { FiHome } from 'react-icons/fi';
import styles from "./Navigation.module.css";
const Navigation = () => {

  return (
    
    <nav className={styles.navigation}>
       <Link to="/home" className={styles.h}><FiHome className={styles.home}/> Home</Link>
      <h1 className={styles.navigationtitle}>My Music App </h1>
     
      <ArtistSearch/>
      <Link to="/musicdetails" className={styles.navigationcomparelink}>Compare Artists</Link>
    </nav>
  );
};

export default Navigation;