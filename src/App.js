import React from "react";
import Music from "./components/Music";
import { Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import "./App.css";
import Navigation from "./components/Navigation";
import SideBySideComparison from "./components/Sidebyside";
import Aboutartist from "./components/Aboutartist";


const App = () => {



  return (
    <div >
      <Navigation />
      <Routes>
        <Route path="/" element={<Music></Music>} />
        <Route path="/home" element={<Music></Music>} />
        <Route path="/home/:mbid" element={<Details></Details>} />
        <Route path="/musicdetails" element={<SideBySideComparison></SideBySideComparison>} />
        <Route path="/artist/:name" element={<Aboutartist />} />

      </Routes>


    </div>
  );
};

export default App;
