import { Pokemon, TypeString } from "~/utils/Types";
import { typeColors } from "~/utils/TypeColors";

const getTypeColor = (types: TypeString[]) => {
  if (types.length > 1) {
    return `linear-gradient(to right, ${typeColors[types[0]]} 50%, ${
      typeColors[types[1]]
    } 50%)`;
  }

  return typeColors[types[0]];
};

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({
  pokemon,
}: PokemonCardProps): React.ReactElement {
  const typeColor = getTypeColor(pokemon.types);

  return (
    <div key={pokemon.id} className="border rounded border-gray-800">
      <div className="h-40 relative" style={{ background: typeColor }}>
        <p className="font-mono text-4xl top-6 left-0 right-0  text-center absolute tracking-[0.15em] text-opacity-60 text-white">
          #<strong>{pokemon.id}</strong>
        </p>
        <div className="top-10 left-0 right-0 absolute h-28 flex items-center justify-center">
          <img
            src={pokemon.image}
            alt=""
            className="object-contain h-28 w-full"
            height="112"
            width="112"
          />
        </div>
      </div>
      <div className="p-2">
        <p className="text-center capitalize">{pokemon.name}</p>
        <ul className="flex gap-2 justify-center capitalize text-sm">
          {pokemon.types.map((type) => {
            return (
              <li key={type} style={{ color: typeColors[type] }}>
                {type}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
