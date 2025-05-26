const axios = require("axios")

const getAllPokemons = async (req, res) => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")
    const promises = response.data.results.map((p) => axios.get(p.url))
    const pokemonDetails = await Promise.all(promises)
    const data = pokemonDetails.map((p) => p.data)
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar pokémons" })
  }
}

const getPokemonByName = async (req, res) => {
  try {
    const { name } = req.params
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    res.json(response.data)
  } catch (err) {
    res.status(404).json({ error: "Pokémon não encontrado" })
  }
}

const getTypes = async (req, res) => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type")
    const types = response.data.results.filter(
      (t) => t.name !== "shadow" && t.name !== "unknown"
    )
    res.json(types)
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar tipos" })
  }
}

const getEvolutionChain = async (req, res) => {
  try {
    const { name } = req.params
    const pokeData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const speciesData = await axios.get(pokeData.data.species.url)
    const evolutionData = await axios.get(speciesData.data.evolution_chain.url)

    const chain = evolutionData.data.chain
    const evolutions = []

    let current = chain
    while (current) {
      evolutions.push(current.species.name)
      current = current.evolves_to[0]
    }

    res.json({ evolutions })
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar cadeia de evolução" })
  }
}

module.exports = {
  getAllPokemons,
  getPokemonByName,
  getTypes,
  getEvolutionChain,
}
