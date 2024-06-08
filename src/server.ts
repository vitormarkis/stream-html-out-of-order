import express from "express"

const app = express()

app.get("/pokemon/:pokemon_id", async (req, res) => {
  const { pokemon_id } = req.params
  const response = await fetch(
    `https://pokeapi.co/api/v2/ability/${pokemon_id}`
  )
  const data = await response.json()
  return res.send(`
    <h1>Pokemon name:</h1>
    <strong id="pokemon_name">${data.name}</strong>
  `)
})

app.listen(4000, () => {
  console.log("Server listen on port 4000")
})
