const __fetch = (url: string) => {
  const pokemon_id = url.split("/").at(-1)
  return fetch(`https://pokeapi.co/api/v2/ability/${pokemon_id}`)
}

export { __fetch as fetch }
