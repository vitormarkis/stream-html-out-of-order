import express from "express"
import { Readable } from "node:stream"
import { sleep } from "./sleep"
import { sleep } from "./sleep"

const app = express()

app.get("/pokemon/:pokemon_id", (req, res) => {
  const { pokemon_id } = req.params
  const stream = new Readable({
    read() {},
  })

  stream.push(`
    <h1>Pokemon name:</h1>
    <strong id="fallback">Loading...</strong>
  `)

  fetch(`https://pokeapi.co/api/v2/ability/${pokemon_id}`)
    .then(res => res.json())
    .then(async data => {
      await sleep(3000)
      stream.push(`
        <strong id="pokemon_name">${data.name}</strong>
        <script>
          const fallback = document.getElementById("fallback")
          const pokemonName = document.getElementById("pokemon_name")
          fallback.replaceWith(pokemonName)
        </script>
      `)
      stream.push(null)
    })
  promises.add(effectPromise)

  stream.pipe(res)
  // @ts-expect-error
  for await (const chunk of responseStream) {
    stream.push(chunk)
  }
  stream.push(null)
})

app.listen(4000, () => {
  console.log("Server listen on port 4000")
})
