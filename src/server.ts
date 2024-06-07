import express from "express"
import { Readable } from "node:stream"

const app = express()

app.get("/:pokemon_id", async (req, res) => {
  const { pokemon_id } = req.params
  const stream = new Readable({
    read() {},
  })

  stream.push("<h1>The Pokemon name is:</h1>")

  fetch(`https://pokeapi.co/api/v2/ability/${pokemon_id}`)
    .then(res => res.json())
    .then(data => {
      stream.push(`<strong>${data.name}</strong>`)
      stream.push(null)
    })

  stream.pipe(res)
})

app.listen(4000, () => {
  console.log("Server listen on port 4000")
})
