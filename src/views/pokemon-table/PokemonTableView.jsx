import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { Box, CircularProgress, TextField, Typography } from '@mui/material';
import { getPokemons } from 'api/pokemon';

import PokemonTable from './PokemonTable';

const PokemonTableView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [allPokemons, setAllPokemons] = useState();
  const [currentPokemons, setCurrentPokemons] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    requestPokemons();
  }, []);

  useEffect(() => {
    requestQuery(query);
  }, [query]);

  const requestPokemons = async () => {
    setIsLoading(true);
    const pokemons = await getPokemons();
    if (pokemons.success) {
      const sortedPokemonos = pokemons.data.results.sort((a, b) => a.name.localeCompare(b.name));
      setAllPokemons(sortedPokemonos);
      setCurrentPokemons(sortedPokemonos);
    } else {
      setError(pokemons.error);
    }
    setIsLoading(false);
  };

  const requestQuery = (pokemonName) => {
    setCurrentPokemons(
      query ? allPokemons.filter((pokemon) => pokemon.name.startsWith(pokemonName)) : allPokemons ?? []
    );
  };

  const debouncedFilter = useCallback(
    debounce((query) => setQuery(query), 500),
    []
  );

  const handleQueryChange = (e) => {
    debouncedFilter(e.target.value);
  };

  return (
    <Box mt={8}>
      <TextField id="filter" label="Filtro" variant="outlined" onChange={handleQueryChange} />
      {error && <Typography color="red">{error}</Typography>}

      {isLoading
        ? (
        <Box textAlign="center">
          <CircularProgress m={10} size={100} />
        </Box>
          )
        : (
        <PokemonTable rows={currentPokemons} />
          )}
    </Box>
  );
};

export default PokemonTableView;
