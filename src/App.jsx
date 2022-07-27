import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import PokemonTableView from 'views/pokemon-table/PokemonTableView';
import PokemonDetailsView from 'views/pokemon-details/PokemonDetailsView';

const App = () => {
  return (
    <div className="App">
      <Box p={4}>
        <Typography variant="h3">Pokedex</Typography>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PokemonTableView />} />
            <Route path="/pokemon/:pokemonName" element={<PokemonDetailsView />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </div>
  );
};

export default App;
