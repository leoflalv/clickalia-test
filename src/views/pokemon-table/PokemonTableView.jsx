import { useEffect } from 'react';
import { Box, CircularProgress, TextField } from '@mui/material';
import { getPokemons } from 'api/pokemon';

import PokemonTable from './PokemonTable';
import { usePokemonTableContext } from './pokemonsTableContext';

const PokemonTableView = () => {
  const { isLoading, setIsLoading, setCurrentPokemons, query, setQuery, allPokemons, setAllPokemons } =
    usePokemonTableContext();

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
      setAllPokemons(pokemons.data.results);
      setCurrentPokemons(pokemons.data.results);
    }
    setIsLoading(false);
  };

  const requestQuery = (pokemonName) => {
    setCurrentPokemons(
      query ? allPokemons.filter((pokemon) => pokemon.name.startsWith(pokemonName)) : allPokemons ?? []
    );
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Box mt={8}>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={handleQueryChange} />
      {isLoading
        ? (
        <Box textAlign="center">
          <CircularProgress m={10} size={100} />
        </Box>
          )
        : (
        <PokemonTable />
          )}
    </Box>
  );
};

export default PokemonTableView;
