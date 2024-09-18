/**
 * Task One
 * 
 * 1. Implement pagination of the pokemon, preferably storing state in the URL
 * 2. Visually show a Pokémon's two types on the card's background
 */

import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { client } from "~/services/pokemon/client.server"
import { graphql } from "~/services/pokemon/graphql"

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: TypeString[];
}

const typeColors = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

type TypeString = keyof typeof typeColors

export const loader = async (args: LoaderFunctionArgs) => {

  const resp = await client.query(graphql(`query GetPokemonList {
    pokemon_v2_pokemon_aggregate(limit: 24, offset: 0) {
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
  }`), {});

  const pokemons = resp.data?.pokemon_v2_pokemon_aggregate.nodes.map((pokemon) : Pokemon => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      image: (pokemon.pokemon_v2_pokemonsprites[0].sprites as Sprites).other["official-artwork"].front_default,
      types: pokemon.pokemon_v2_pokemontypes.map((type): TypeString => type.pokemon_v2_type?.name)
    }
  });

 

  return json({
    pokemons
  })

}

export default function Index() {

  const { pokemons } = useLoaderData<typeof loader>();

  return <div className="m-6">
    <h1 className="text-3xl font-bold mb-4 text-center">The Greatest List of Pokémon</h1>
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      {pokemons?.map(pokemon => {

        const typeColor = typeColors[pokemon.types[0]];

        return <div className="border rounded border-gray-800">
          <div className="h-40 relative" style={{ "background": typeColor }}>
            <p className="font-mono text-4xl top-6 left-0 right-0  text-center absolute tracking-[0.15em] text-opacity-60 text-white">#<strong>{pokemon?.id}</strong></p>
            <div className="top-10 left-0 right-0 absolute h-28 flex items-center justify-center">
              <img src={pokemon?.image} alt="" className="object-contain h-28 w-full" height="112" width="112" />
            </div>

          </div>
          <div className="p-2">
            <p className="text-center capitalize">{pokemon?.name}</p>
            <ul className="flex gap-2 justify-center capitalize text-sm">
              {pokemon.types.map(type => {
                return <li style={{ color: typeColors[type] }}>
                  {type}
                </li>
              })}
            </ul>
            
          </div>
        </div>
      })}
    </div>
    <div className="flex gap-4 mt-6">
      <Link className="bg-red-600 w-full rounded p-4 text-center font-bold">Prev</Link>
      <Link className="bg-red-600 w-full rounded p-4 text-center font-bold">Next</Link>
    </div>
  </div>

}