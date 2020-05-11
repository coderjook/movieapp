import React from "react";
import Actor from "./elements/Actor";
import MovieInfo from "./elements/MovieInfo";
import MovieInfoBar from "./elements/MovieInfoBar";
import Navigation from "./elements/Navigation";
import Grid from "./elements/Grid";
import Spinner from "./elements/Spinner";
import { useMovieFetch } from "./hooks/useMovieFetch";

const Movie = ({ movieId }) => {
  const [movie, loading, error] = useMovieFetch(movieId);
  //movie is de state die je vanuit useMovieFetch returned krijgt, op positie
  console.log(movie);
  return (
    <>
      <Navigation />
      <MovieInfo />
      <MovieInfoBar />
      <Grid>
        <Actor />
      </Grid>
      <Spinner />
    </>
  );
};

export default Movie;
