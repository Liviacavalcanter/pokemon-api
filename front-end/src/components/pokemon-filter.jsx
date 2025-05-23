"use client"

import { useState } from "react"

const PokemonFilter = ({ onFilter, types }) => {
  const [name, setName] = useState("")
  const [type, setType] = useState("all")

  const handleSubmit = (e) => {
    e.preventDefault()
    onFilter(name, type)
  }

  const handleReset = () => {
    setName("")
    setType("all")
    onFilter("", "all")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name-filter" className="block text-sm font-medium text-gray-600 mb-2">
            Nome
          </label>
          <input
            id="name-filter"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Buscar pokémon..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-300"
          />
        </div>

        <div>
          <label htmlFor="type-filter" className="block text-sm font-medium text-gray-600 mb-2">
            Tipo
          </label>
          <select
            id="type-filter"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-rose-300"
          >
            <option value="all">Todos</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          type="submit"
          className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 hover:border-rose-300 py-2 px-4 rounded-md text-sm transition-colors duration-200"
        >
          Filtrar
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300 py-2 px-4 rounded-md text-sm transition-colors duration-200"
        >
          Limpar
        </button>
      </div>
    </form>
  )
}

export default PokemonFilter
