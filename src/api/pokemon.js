import client from './core';

const getPokemons = async () => {
  try {
    const pokemons = await client.get(`pokemon?limit=${100000}&offset=${0}`);
    return { success: true, ...pokemons };
  } catch (_) {
    return { success: false, error: 'Something went wrong.' };
  }
};

export { getPokemons };
