import { createContext, useContext, useState } from 'react';

const PokemonTableContext = createContext({});

export function usePokemonTableContext () {
  return useContext(PokemonTableContext);
}

function createData (name, url) {
  return {
    name,
    url
  };
}

const rows = [
  createData('Cupcake', 'http://'),
  createData('Donut', 'http://'),
  createData('Eclair', 'http://'),
  createData('Frozen yoghurt', 'http://'),
  createData('Gingerbread', 'http://'),
  createData('Honeycomb', 'http://'),
  createData('Ice cream sandwich', 'http://'),
  createData('Jelly Bean', 'http://'),
  createData('KitKat', 'http://'),
  createData('Lollipop', 'http://'),
  createData('Marshmallow', 'http://'),
  createData('Nougat', 'http://'),
  createData('Oreo', 'http://')
];

export const PokemonTableContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allPokemons, setAllPokemons] = useState();
  const [currentPokemons, setCurrentPokemons] = useState(rows);
  const [query, setQuery] = useState('');

  return (
    <PokemonTableContext.Provider
      value={{
        allPokemons,
        setAllPokemons,
        isLoading,
        setIsLoading,
        currentPokemons,
        setCurrentPokemons,
        query,
        setQuery
      }}
    >
      {children}
    </PokemonTableContext.Provider>
  );
};
