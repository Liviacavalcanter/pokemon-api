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

  useEffect(() => {
    // Fetch all pokemons when component mounts
    fetchPokemons()
    fetchTypes()
  }, [])

  const fetchPokemons = async () => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:5000/api/pokemons")
      const data = await response.json()
      setPokemons(data)
      setFilteredPokemons(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching pokemons:", error)
      setLoading(false)
    }
  }

  const fetchTypes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/types")
      const data = await response.json()
      setTypes(data)
    } catch (error) {
      console.error("Error fetching types:", error)
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
      filtered = filtered.filter((pokemon) => pokemon.name.toLowerCase().includes(name.toLowerCase()))
    }

    if (type && type !== "all") {
      filtered = filtered.filter((pokemon) => pokemon.types.some((t) => t.type.name === type))
    }

    setFilteredPokemons(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-500 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Pokémon Team Builder</h1>
        </div>
      </header>

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
                <PokemonList pokemons={filteredPokemons} onAddToTeam={handleAddToTeam} />
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
