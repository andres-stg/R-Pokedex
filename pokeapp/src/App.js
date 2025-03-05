import React, { useState, useEffect } from 'react';
import ListedPokemon from './ListedPokemon';
import searchBar from './searchBar';
import Pagination from './Pagination';

function App() {
  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=50')
      .then(response => response.json())
      .then(data => {
        const pokemonDetails = data.results.map(poke => ({
          name: poke.name,
          url: poke.url, // URL con más detalles del Pokémon
        }));

        // Hacer múltiples peticiones para obtener todos los datos de cada Pokémon
        Promise.all(
          pokemonDetails.map(poke =>
            fetch(poke.url)
              .then(response => response.json())
              .then(details => ({
                id: details.id,
                name: details.name,
                sprite: details.sprites.front_default, // Imagen del Pokémon
                height: details.height, // Altura en decímetros
                weight: details.weight, // Peso en hectogramos
                types: details.types.map(type => type.type.name), // Lista de tipos
              }))
          )
        ).then(fullPokemon => setPokemon(fullPokemon));
      })
      .catch(error => console.error('Error fetching Pokémon:', error));
  }, []);

  return (
    <div>
      <h1>Pokédex</h1>
      <searchBar/>
      <ListedPokemon pokemon={pokemon} />
      <Pagination />
    </div>
  );
}

export default App;
