import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Box, CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getPokemon } from 'api/pokemon';
import List from './List';

const SectionContainer = ({ children }) => (
  <Grid container direction="row" sx={{ mb: 2, mt: 2 }}>
    {children}
  </Grid>
);

const getIdFromUrl = (move) => {
  const url = move.move.url;
  const splittedUrl = url.split('/');
  return parseInt(splittedUrl[splittedUrl.length - 2]);
};

const PokemonDetailsView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState();
  const [moves, setMoves] = useState([]);

  const { pokemonName } = useParams();

  const handleRequestPokemon = async (name) => {
    setIsLoading(true);
    const pokemonResponse = await getPokemon(name);
    if (pokemonResponse.success) {
      const formInfo = await axios.get(pokemonResponse.data.forms?.[0]?.url);
      setPokemon({ ...pokemonResponse.data, formInfo: formInfo.data });
      const sortedMoves = pokemonResponse.data.moves.sort((a, b) => getIdFromUrl(b) - getIdFromUrl(a));
      setMoves(sortedMoves);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleRequestPokemon(pokemonName);
  }, [pokemonName]);

  const removeMove = (name) => {
    setMoves((currentMoves) => currentMoves.filter((move) => move.move.name !== name));
  };

  return (
    <Box mt={2}>
      <IconButton component={Link} to="/">
        <ArrowBackIcon />
      </IconButton>

      <Box ml={10} mt={6}>
        {isLoading
          ? (
          <Box textAlign="center">
            <CircularProgress m={10} size={100} />
          </Box>
            )
          : (
          <>
            <SectionContainer>
              <Typography variant="h6">Name:&nbsp;</Typography>
              <Typography variant="h5">{pokemon?.name}</Typography>
            </SectionContainer>
            <SectionContainer>
              <Typography variant="h6">Sprites:&nbsp;</Typography>
              <img src={pokemon?.sprites.back_default} />
            </SectionContainer>
            <SectionContainer>
              <Typography variant="h6">Abilities:&nbsp;</Typography>
              <List
                items={pokemon?.abilities
                  .filter((ability) => !ability.is_hidden)
                  .map((ability) => ability.ability.name)}
              />
            </SectionContainer>
            <SectionContainer>
              <Typography variant="h6">Moves:&nbsp;</Typography>
              <List items={moves.map((move) => move.move.name)} removeFunction={removeMove} />
            </SectionContainer>
            <SectionContainer>
              <Typography variant="h6">Form id:&nbsp;</Typography>
              <Typography variant="h5">{pokemon?.formInfo.id}</Typography>
            </SectionContainer>
            <SectionContainer>
              <Typography variant="h6">Form is_battle_only:&nbsp;</Typography>
              <Typography variant="h5">{pokemon?.formInfo.is_battle_only.toString()}</Typography>
            </SectionContainer>
          </>
            )}
      </Box>
    </Box>
  );
};

export default PokemonDetailsView;
