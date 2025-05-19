import React, { useState, useEffect } from 'react';
import './Banner.css';
import axios from '../../utils/axios'; // Make sure this has the correct baseURL
import requests from '../../utils/requests';

export default function Banner() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(requests.fetchNetflixOriginals);
        const results = response.data.results;
          console.log(results)
        setMovie(results[Math.floor(Math.random() * results.length)]);
      } catch (error) {
        console.error('Error fetching Netflix Originals:', error);
      }
    })();
  }, []);
    
    const truncate = (str, n) => {
      return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }

  return (
    <div
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button play">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner__fadeBottom" />
    </div>
  );
}
