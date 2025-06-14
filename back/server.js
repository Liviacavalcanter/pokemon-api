const express = require("express")
const cors = require("cors")
const pokemonRoutes = require("./routes/pokemon")

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/pokemon", pokemonRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
