import express from "express"
import { fetch } from "./fetch"
import { sleep } from "./sleep"

const app = express()

app.get("/pokemon/:pokemon_id", async (req, res) => {
  const { pokemon_id } = req.params

  const response = await fetch(`https://pokeapi.co/${pokemon_id}`)
  await sleep(3000)
  const data = await response.json()

  return res.send(`
    <h1>Pokemon name:</h1>
    <strong>${data.name}</strong>
  `)
})

app.listen(4000, () => {
  console.log("Server listen on port 4000")
})
