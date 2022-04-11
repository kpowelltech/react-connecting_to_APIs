import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/films");

      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          throw new Error(
            `${response.status} - Unathourized Access...check your URL`
          );
        }
      }

      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(()=> {fetchMovieHandler()}, [fetchMovieHandler]);


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}> Fetch Movies </button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && movies.length === 0 && !error && (
          <p>No Movie data yet</p>
        )}
        {isLoading && <p>Data is Loading...</p>}
      </section>
    </React.Fragment>
  );}
  

export default App;

