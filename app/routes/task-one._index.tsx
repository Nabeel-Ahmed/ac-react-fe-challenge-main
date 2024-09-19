/**
 * Task One
 *
 * 1. Implement pagination of the pokemon, preferably storing state in the URL
 * 2. Visually show a Pokémon's two types on the card's background
 */

import React from "react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { client } from "~/services/pokemon/client.server";
import { graphql } from "~/services/pokemon/graphql";
import PokemonCard from "~/components/PokemonCard";
import PageNavButton from "~/components/PageNavButton";
import { Pokemon, TypeString } from "~/utils/Types";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Parse the page number from the URL
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
  const limit = 24;
  // Calculate the offset based on the page number
  const offset = (page - 1) * limit;

  const resp = await client.query(
    graphql(`
      query GetPokemonList($offset: Int) {
        pokemon_v2_pokemon_aggregate(limit: 24, offset: $offset) {
          aggregate {
            count
          }
          nodes {
            id
            name
            pokemon_v2_pokemontypes {
              type_id
              pokemon_v2_type {
                name
              }
            }
            pokemon_v2_pokemonsprites {
              sprites
            }
          }
        }
      }
    `),
    { offset }
  );

  const pokemons = resp.data?.pokemon_v2_pokemon_aggregate.nodes.map(
    (pokemon): Pokemon => {
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: (pokemon.pokemon_v2_pokemonsprites[0].sprites as Sprites).other[
          "official-artwork"
        ].front_default,
        types: pokemon.pokemon_v2_pokemontypes.map(
          (type): TypeString => type.pokemon_v2_type?.name as TypeString
        ),
      };
    }
  );

  return json({
    pokemons,
    currentPage: page,
    loaded: true,
  });
};

export default function Index(): React.ReactElement {
  const { pokemons, currentPage, loaded } = useLoaderData<typeof loader>();

  let disablePrevButton = false;

  if (currentPage === 1) {
    disablePrevButton = true;
  }

  const OutOfPokemon = () => {
    if (pokemons !== undefined) {
      if (pokemons.length === 0 && loaded === true) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="m-6">
      <h1 className="text-3xl font-bold mb-4 text-center">
        The Greatest List of Pokémon
      </h1>
      {pokemons === undefined && !loaded && <div>Loading...</div>}
      {OutOfPokemon() && (
        <div className="text-center">
          You&apos;ve seen them all!{" "}
          <PageNavButton
            to="/task-one"
            text="Go to the beginning?"
            disabled={false}
          />
        </div>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {pokemons &&
          pokemons.map((pokemon) => {
            return <PokemonCard pokemon={pokemon} key={pokemon.id} />;
          })}
      </div>
      <div className="flex gap-4 mt-6">
        <PageNavButton
          to={`?page=${currentPage - 1 > 0 ? currentPage - 1 : 1}`}
          text="Prev"
          disabled={disablePrevButton}
        />

        <PageNavButton
          to={`?page=${currentPage + 1}`}
          text="Next"
          disabled={OutOfPokemon()}
        />
      </div>
    </div>
  );
}
