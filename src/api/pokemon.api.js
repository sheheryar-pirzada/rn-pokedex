export const fetchPokemon = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return [];
};

export const fetchPokemonById = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return {};
};

export const fetchPokemonSpeciesById = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return {};
};
