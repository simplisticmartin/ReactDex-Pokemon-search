import React, { useEffect, useState } from "react";
import { Pokemon } from "./Pokemon";

export const PokemonList = ({ pokemonData, filter }) => {
  useEffect(() => {
    fetchItems();
  }, [pokemonData]);

  const [pokemonFinalData, setPokemonFinalData] = useState([]);

  const fetchItems = async () => {
    let finalPokemonData = pokemonData.map((pokemon) => {
      return { name: pokemon.name, id: "", image: "", types: [""], desc: "" };
    });

    const pokemonDetailsData = await Promise.all(
      pokemonData.map(async (pokemon, index) => {
        const data = await fetch(pokemon.url);
        const json = await data.json();
        const types = json.types.map((type) => {
          return type.type.name;
        });
        finalPokemonData[index] = {
          ...finalPokemonData[index],
          id: json.id,
          image: json.sprites.other["official-artwork"].front_default,
          types: types
        };
        return json;
      })
    );
    // Gets the Species data for the description + filtering
    const pokemonSpeciesData = await Promise.all(
      pokemonData.map(async (pokemon, index) => {
        const data = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${index + 1}`
        );
        const json = await data.json();
        finalPokemonData[index] = {
          ...finalPokemonData[index],
          desc: json.flavor_text_entries[9].flavor_text
        };
        return json;
      })
    );
    console.log(finalPokemonData);
    setPokemonFinalData(finalPokemonData);
  };

  const filteredPokemon = pokemonFinalData.filter((pokemon) => {
    let show = false;
    for (var i = 0; i < pokemon.types.length; i++) {
      if (pokemon.types[i].toLowerCase().includes(filter.toLowerCase())) {
        show = true;
      }
    }
    if (pokemon.name.toLowerCase().includes(filter.toLowerCase())) {
      show = true;
    }
    if (pokemon.desc.toLowerCase().includes(filter.toLowerCase())) {
      show = true;
    }
    if (pokemon.id === parseInt(filter, 10)) {
      show = true;
    }
    return show;
  });
  //passes filtered data to Pokemon.js
  //Also displays all of the pokemon components
  return (
    pokemonFinalData.length > 0 && (
      <div>
        {filteredPokemon.map((pokemon, index) => {
          return (
            <Pokemon
              name={pokemon.name}
              image={filteredPokemon[index].image}
              id={filteredPokemon[index].id}
              types={filteredPokemon[index].types}
              desc={filteredPokemon[index].desc}
              key={index}
            />
          );
        })}
      </div>
    )
  );
};
