import client from './core';

const getPokemons = async () => {
  try {
    const pokemons = await client.get(`pokemon?limit=${100000}&offset=${0}`);
    return { success: true, ...pokemons };
  } catch (_) {
    return { success: false, error: 'Something went wrong.' };
  }
};

const getPokemon = async (name) => {
  try {
    const pokemon = await client.get(`pokemon/${name}`);
    return { success: true, ...pokemon };
  } catch (_) {
    return { success: false, error: 'Something went wrong.' };
  }
};

export { getPokemon, getPokemons };
