import { useState, useEffect, useCallback } from "react";
import { API_URL, API_KEY } from "../../config";

export const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(
    async () => {
      // voordat je de data ophaalt
      setError(false);
      setLoading(true);

      // ophalen van de gegevens in een try {} catch(error) {} block
      try {
        //ophalen van de movie gegevens obv movieId
        const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
        const result = await (await fetch(endpoint)).json();

        //ophalen van de credits gegevens obv movieId
        const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        const creditsResult = await (await fetch(creditsEndpoint)).json();
        // filter de uit de creditsgegeven / crew de job van director
        const directors = creditsResult.crew.filter(
          (member) => member.job === "Director"
        );

        // wijzig de state dmv Setstate
        setState({
          ...result,
          actors: creditsResult.cast,
          directors,
        });
      } catch (error) {
        setError(true);
      }
      // nadat je de gegevens hebt opgehaald
      setLoading(false);
    },
    // gegevens alleen ophalen als de movieId verandert
    [movieId]
  );

  // uitvoeren van de functie fetchData
  useEffect(() => {
    if (localStorage[movieId]) {
      setState(JSON.parse(localStorage[movieId]));
      setLoading(false);
    } else {
      fetchData();
    }
  }, [fetchData, movieId]);

  // data opslaan local storage
  useEffect(() => {
    localStorage.setItem(movieId, JSON.stringify(state));
  }, [movieId, state]);

  //teruggeven van de data
  return [state, loading, error];
};
