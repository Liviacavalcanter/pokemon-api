"use client"

const PokemonTeam = ({ team, onRemoveFromTeam }) => {
  const teamSlots = [...team]
  while (teamSlots.length < 5) {
    teamSlots.push(null)
  }

  return (
    <div className="space-y-3">
      {team.length === 0 ? (
        <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
          <div className="text-sm">Nenhum Pokémon selecionado</div>
        </div>
      ) : (
        <div className="space-y-3">
          {teamSlots.map((pokemon, index) => (
            <div
              key={pokemon ? pokemon.id : `empty-${index}`}
              className={`p-3 rounded-lg ${
                pokemon ? "bg-gray-50 border border-gray-200" : "border-2 border-dashed border-gray-200"
              }`}
            >
              {pokemon ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={pokemon.sprites.front_default || "/placeholder.svg?height=40&width=40"}
                      alt={pokemon.name}
                      className="w-10 h-10 object-contain"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 capitalize">{pokemon.name}</h4>
                      <div className="flex gap-1 mt-1">
                        {pokemon.types.map((typeInfo) => (
                          <span
                            key={typeInfo.type.name}
                            className="text-xs px-1.5 py-0.5 rounded-full capitalize bg-gray-200 text-gray-600"
                          >
                            {typeInfo.type.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveFromTeam(pokemon.id)}
                    className="text-gray-400 hover:text-rose-500 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center h-10 text-gray-400 text-sm">Slot vazio</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PokemonTeam
