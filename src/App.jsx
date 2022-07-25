import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PokemonTable from 'views/pokemon-table';

const App = () => {
  return (
    <div className="App">
      <h1>HKKKKKKKK HHH</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PokemonTable />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
