const express = require("express")
const router = express.Router()
const {
  getAllPokemons,
  getPokemonByName,
  getTypes,
  getEvolutionChain,
} = require("../controllers/pokemonController")

router.get("/", getAllPokemons)
router.get("/types", getTypes)
router.get("/:name", getPokemonByName)
router.get("/:name/evolution", getEvolutionChain)

module.exports = router
