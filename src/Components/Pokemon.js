import { useEffect, useState } from "react";
import { capitalize } from "@material-ui/core";

/**
 *
 * This component is responsible for displaying
 * the pokemon id, pokemon name, pokemon image, pokemon type and
 * pokemon description individually
 *
 */
export const Pokemon = ({ name, id, image, types, desc }) => {
  return (
    <div className="pokemon-container">
      <a
        href={`https://bulbapedia.bulbagarden.net/wiki/${name}_(Pokémon)`}
        className="anchor-bulbapedia"
      >
        {" "}
        <h1 className="pokemon-info-id">{id}</h1>
        <h1 className="pokemon-info-name">{capitalize(name)}</h1>
        <img src={image} height="95" className="pokemon-info-image" />
      </a>
      <div className="pokemon-all-returned-types">
        {types.map((type, index) => {
          return (
            /**css styling - example: pokemon-fire */

            <div className={"pokemon-type-badge pokemon-" + type} key={index}>
              {type.toUpperCase()}
            </div>
          );
        })}
      </div>
      <div className="pokemon-description">{desc}</div>
    </div>
  );
};
