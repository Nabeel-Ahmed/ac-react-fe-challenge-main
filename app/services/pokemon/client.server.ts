import { Client, fetchExchange, cacheExchange } from "@urql/core";


function createPokemonClient() {
  const client = new Client({
    url: "https://beta.pokeapi.co/graphql/v1beta",
    fetchOptions: {
      headers: {

      },
    },
    
    exchanges: [cacheExchange, fetchExchange],
  });

  return client;
}

export const client = createPokemonClient();
