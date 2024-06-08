import express from "express"
import { Readable } from "node:stream"
import { sleep } from "./sleep"
import { fetch } from "./fetch"

const app = express()

app.get("/pokemon/:pokemon_id", async (req, res) => {
  const { pokemon_id } = req.params
  const stream = new Readable({ read() {} })
  stream.pipe(res)

  const response = await fetch(`https://pokeapi.co/${pokemon_id}`)
  await sleep(3000)
  const data = await response.json()

  stream.push(`
    <h1>Pokemon name:</h1>
    <strong>${data.name}</strong>
  `)
  stream.push(null)
})

app.listen(4000, () => {
  console.log("Server listen on port 4000")
})
