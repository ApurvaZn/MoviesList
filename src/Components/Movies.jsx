import React, { useState } from 'react';
import moviesList from './Movies.json';
import { Container, TextField, Grid } from '@mui/material';
import './Movies.css';
import inf from './inf.jpg';
const Movie = ({ title, languages, countries, genres, image }) => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <div className="movie">
      <img src={image || inf} className="movie-image" alt={title} />
      <div className="movie-details">
        <h2>{title}</h2>
        <div className="details">
          <p><strong>Languages:</strong> {languages.join(', ')}</p> 
          {countries.length > 0 && <p><strong>Countries:</strong> {countries.join(', ')}</p>}
          <p><strong>Genres:</strong> {genres.join(', ')}</p>
        </div>
      </div>
    </div>
  </Grid>
);

const Movies = () => {
  const [filter, setFilter] = useState('');
  const [isError, setIsError] = useState(false); // State to track error

  const filteredMovies = moviesList.filter(movie =>
    movie.movietitle.toLowerCase().includes(filter.toLowerCase()) ||
    movie.moviecountries.some(country =>
       country.toLowerCase().includes(filter.toLowerCase())) ||
    movie.movielanguages.some(language =>
       language.toLowerCase().includes(filter.toLowerCase())) ||
    movie.moviegenres.some(genre =>
       genre.toLowerCase().includes(filter.toLowerCase()))
  );

  // Function to handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    // Check if filter doesn't match any movies
    if (
      !filteredMovies.length &&
      value.trim() !== '' // Check if input is not empty
    ) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <div className="movies-wrapper">
        <TextField
          type="text"
          label="Search movies by title or country or language or genre."
          variant="outlined"
          value={filter}
          onChange={handleInputChange}
          className={`search-input ${isError ? 'error' : ''}`}
          fullWidth
          style={{ margin: '20px 0'}}
        />
        {isError && <p className="error-message">Oops, Please Check you Spelling...</p>}
        <Grid container spacing={2} className="movies">
          {filteredMovies.map((movie) => (
            <Movie
              key={movie.imdbmovieid}
              title={movie.movietitle}
              languages={movie.movielanguages}
              countries={movie.moviecountries}
              genres={movie.moviegenres}
              image={movie.moviemainphotos[0]}
            />
          ))}
        </Grid>
      </div>
    </Container>
  );
}

export default Movies;
