"use client"

import { useState, useEffect } from "react"
import PokemonList from "./components/pokemon-list"
import PokemonTeam from "./components/pokemon-team"
import PokemonFilter from "./components/pokemon-filter"

function App() {
  const [pokemons, setPokemons] = useState([])
  const [filteredPokemons, setFilteredPokemons] = useState([])
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)
  const [types, setTypes] = useState([])
  const [evolutionChain, setEvolutionChain] = useState([])
  const [showEvolutionModal, setShowEvolutionModal] = useState(false)

  useEffect(() => {
    fetchPokemons()
    fetchTypes()
  }, [])

  const fetchPokemons = async () => {
    try {
      setLoading(true)
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      const data = await res.json()
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url)
          return res.json()
        })
      )
      setPokemons(pokemonDetails)
      setFilteredPokemons(pokemonDetails)
    } catch (error) {
      console.error("Erro ao buscar pokémons:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTypes = async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/type")
      const data = await res.json()
      const validTypes = data.results.filter(
        (type) => type.name !== "shadow" && type.name !== "unknown"
      )
      setTypes(validTypes)
    } catch (error) {
      console.error("Erro ao buscar tipos:", error)
    }
  }

  const handleAddToTeam = (pokemon) => {
    if (team.length < 5 && !team.some((p) => p.id === pokemon.id)) {
      setTeam([...team, pokemon])
    } else if (team.some((p) => p.id === pokemon.id)) {
      alert("Este Pokémon já está no seu time!")
    } else {
      alert("Seu time já está completo com 5 Pokémon!")
    }
  }

  const handleRemoveFromTeam = (pokemonId) => {
    setTeam(team.filter((pokemon) => pokemon.id !== pokemonId))
  }

  const handleFilter = (name, type) => {
    let filtered = pokemons
    if (name) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())
      )
    }
    if (type && type !== "all") {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((t) => t.type.name === type)
      )
    }
    setFilteredPokemons(filtered)
  }

  const handleViewEvolution = async (pokemon) => {
    try {
      const speciesRes = await fetch(pokemon.species.url)
      const speciesData = await speciesRes.json()
      const evoRes = await fetch(speciesData.evolution_chain.url)
      const evoData = await evoRes.json()
  
      const chain = evoData.chain
      const evolutions = []
  
      let current = chain
      while (current) {
        evolutions.push(current.species.name)
        current = current.evolves_to[0]
      }
  
      setEvolutionChain(evolutions)
      setShowEvolutionModal(true)
    } catch (error) {
      console.error("Erro ao buscar evolução:", error)
    }
  }  

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-500 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Pokémon Team Builder</h1>
        </div>
      </header>

      {showEvolutionModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
          <button
            onClick={() => setShowEvolutionModal(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
          >
            &times;
          </button>
          <h3 className="text-lg font-semibold mb-4 text-center">Cadeia de Evolução</h3>
          <ul className="flex flex-col gap-4 items-center">
            {evolutionChain.map((name) => (
              <li key={name} className="text-center">
                <img
                  src={`https://img.pokemondb.net/sprites/home/normal/${name}.png`}
                  alt={name}
                  className="w-20 h-20 mx-auto"
                />
                <span className="block text-sm mt-1 capitalize">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )}

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Filtrar Pokémon</h2>
              <PokemonFilter onFilter={handleFilter} types={types} />
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Lista de Pokémon</h2>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
                </div>
              ) : (
                <PokemonList pokemons={filteredPokemons} onAddToTeam={handleAddToTeam} onViewEvolution={handleViewEvolution}/>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Seu Time ({team.length}/5)</h2>
              <PokemonTeam team={team} onRemoveFromTeam={handleRemoveFromTeam} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
