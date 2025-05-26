"use client"

const PokemonCard = ({ pokemon, onAddToTeam }) => {
  const getTypeColor = (type) => {
    const typeColors = {
      normal: "bg-gray-100 text-gray-600",
      fire: "bg-orange-100 text-orange-700",
      water: "bg-blue-100 text-blue-700",
      grass: "bg-green-100 text-green-700",
      electric: "bg-yellow-100 text-yellow-700",
      ice: "bg-cyan-100 text-cyan-700",
      fighting: "bg-red-100 text-red-700",
      poison: "bg-purple-100 text-purple-700",
      ground: "bg-amber-100 text-amber-700",
      flying: "bg-indigo-100 text-indigo-700",
      psychic: "bg-pink-100 text-pink-700",
      bug: "bg-lime-100 text-lime-700",
      rock: "bg-stone-100 text-stone-700",
      ghost: "bg-violet-100 text-violet-700",
      dark: "bg-slate-100 text-slate-700",
      dragon: "bg-indigo-100 text-indigo-700",
      steel: "bg-gray-100 text-gray-700",
      fairy: "bg-pink-100 text-pink-700",
    }

    return typeColors[type] || "bg-gray-100 text-gray-600"
  }

  return (
    <div className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-rose-200 transition-all duration-200">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 mb-3 flex items-center justify-center">
          <img
            src={pokemon.sprites.front_default || "/placeholder.svg?height=80&width=80"}
            alt={pokemon.name}
            className="w-full h-full object-contain"
          />
        </div>

        <h3 className="text-sm font-medium text-gray-800 capitalize mb-2">{pokemon.name}</h3>

        <div className="flex gap-1 mb-4">
          {pokemon.types.map((typeInfo) => (
            <span
              key={typeInfo.type.name}
              className={`${getTypeColor(typeInfo.type.name)} text-xs px-2 py-1 rounded-full capitalize`}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>

        <button
          onClick={() => onAddToTeam(pokemon)}
          className="w-full text-sm bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 hover:border-rose-300 py-2 px-3 rounded-md transition-colors duration-200"
        >
          Adicionar
        </button>
      </div>
    </div>
  )
}

export default PokemonCard
