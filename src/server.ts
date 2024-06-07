import express from "express"
import { Readable } from "node:stream"
import { sleep } from "./sleep"

const app = express()

app.get("/:pokemon_id", async (req, res) => {
  const { pokemon_id } = req.params
  const stream = new Readable({
    read() {},
  })

  const promises = new Set()

  let streamController: ReadableStreamDefaultController<string>

  const responseStream = new ReadableStream({
    start(controller) {
      streamController = controller
    },
  })

  stream.push(`
    <h1>Pokemon:</h1>
    <strong id="fallback_name">Loading name...</strong> <br>
    <strong id="fallback_effect">Loading effect...</strong>
  `)

  const namePromise = fetch(`https://pokeapi.co/api/v2/ability/${pokemon_id}`)
    .then(res => res.json())
    .then(async data => {
      await sleep(1400)

      streamController.enqueue(`
        <strong id="pokemon_name">${data.name}</strong>
        <script>
          const fallbackName = document.getElementById("fallback_name")
          const pokemonName = document.getElementById("pokemon_name")
          fallbackName.replaceWith(pokemonName)
        </script>
      `)
      promises.delete(namePromise)
      if (promises.size === 0) streamController.close()
    })
  promises.add(namePromise)

  const effectPromise = fetch(`https://pokeapi.co/api/v2/ability/${pokemon_id}`)
    .then(res => res.json())
    .then(async data => {
      await sleep(3400)
      const effect = data.effect_entries.find(
        (entry: any) => entry.language.name === "en"
      ).effect

      streamController.enqueue(`
        <strong id="pokemon_effect">${effect}</strong>
        <script>
          const fallbackEffect = document.getElementById("fallback_effect")
          const pokemonEffect = document.getElementById("pokemon_effect")
          fallbackEffect.replaceWith(pokemonEffect)
        </script>
      `)
      promises.delete(effectPromise)
      if (promises.size === 0) streamController.close()
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
