import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import PokemonTableView from 'views/pokemon-table/PokemonTableView';
import { PokemonTableContextProvider } from 'views/pokemon-table/pokemonsTableContext';

const App = () => {
  return (
    <div className="App">
      <Box p={4}>
        <Typography variant="h3">Pokedex</Typography>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PokemonTableContextProvider>
                  <PokemonTableView />
                </PokemonTableContextProvider>
              }
            />
          </Routes>
        </BrowserRouter>
      </Box>
    </div>
  );
};

export default App;
