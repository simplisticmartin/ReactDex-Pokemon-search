/** @format */

import React, { useEffect, useState } from "react";
import "./styles.css";
import { PokemonList } from "./Components/PokemonList";
import { PokemonAmount } from "./Components/PokemonAmount";

/**
 *
 * Appjs passes initial Api Data to
 * PokemonList
 * PokemonList - filters data
 * Pokemon - individual pokemon cards
 */
export default function App() {
  useEffect(() => {
    fetchItems();
  }, []);
  const [pokemonData, setPokemonData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [pokemonAmount, setPokemonAmount] = useState(151);

  const fetchItems = async () => {
    console.log(pokemonAmount);
    const data = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=" + pokemonAmount
    );
    //console.log(data);
    const apiData = await data.json();
    setPokemonData(apiData.results);
    console.log(apiData.results);
    console.log(pokemonData);
  };
  // Search input and displaying of pokemon Data
  return (
    <div className="App">
      <PokemonAmount
        pokemonAmount={pokemonAmount}
        setPokemonAmount={setPokemonAmount}
        fetchPokemon={fetchItems}
      />
      <input
        type="text"
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
        placeholder="Search Pokemon"
        className="pokemon-search-bar"
      />
      <div className="pokemon-data-all">
        {pokemonData && (
          <PokemonList pokemonData={pokemonData} filter={searchValue} />
        )}
      </div>
    </div>
  );
}
