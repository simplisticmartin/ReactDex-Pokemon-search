/** @format */
import { createRef, useRef, useEffect, useState } from "react";
import pokeball_upper from "../img/pokeball_upper.png";
import pokeball_lower from "../img/pokeball_lower.png";

export const PokemonAmount = ({
  pokemonAmount,
  setPokemonAmount,
  fetchPokemon
}) => {
  //   const [input, setInput] = useState(pokemonAmount);
  const [active, setActive] = useState(false);
  const inputref = useRef();
  const ref = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (ref.current.contains(e.target)) {
      return;
    }

    setActive(false);
    inputref.current.blur();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPokemon(pokemonAmount);
  };
  const handleChange = (e) => {
    setPokemonAmount(e.target.value);
  };
  return (
    <div ref={ref} className="pokemon-amount-input-outer">
      <div
        className={
          "pokemon-amount-input-inner " +
          (active && "pokemon-amount-input-inner-active")
        }
        onClick={() => {
          if (active === true) {
            setActive(false);
            inputref.current.blur();
          } else if (active === false) {
            setActive(true);
            inputref.current.focus();
          }
        }}
      >
        <img className="pokemon-amount-upper" src={pokeball_upper} />
        <form onSubmit={handleSubmit}>
          <input
            ref={inputref}
            className="pokemon-amount-input"
            value={pokemonAmount}
            onChange={handleChange}
          />
        </form>
        <img className="pokemon-amount-lower" src={pokeball_lower} />
      </div>
    </div>
  );
};
