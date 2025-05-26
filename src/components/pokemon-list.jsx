import PokemonCard from "./pokemon-card"

const PokemonList = ({ pokemons, onAddToTeam }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {pokemons.length === 0 ? (
        <div className="col-span-full text-center py-8 text-gray-500">Nenhum Pokémon encontrado.</div>
      ) : (
        pokemons.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} onAddToTeam={onAddToTeam} />)
      )}
    </div>
  )
}

export default PokemonList
