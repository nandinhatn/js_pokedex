const pokeApi ={}

function convertPokeApiDetailPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number= pokeDetail.id
    const types  = pokeDetail.types.map((typeSlot)=>typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.big_photo=pokeDetail.sprites.other.home.front_default
 
    pokemon.abilities= pokeDetail.abilities
    pokemon.height= pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.stats= pokeDetail.stats
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon)=>{
    return fetch(pokemon.url).then((response)=> response.json())
    .then(convertPokeApiDetailPokemon)
}
pokeApi.getPokemons = (offset=0, limit =5)=>{
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
   return  fetch(url)
    .then((response)=>response.json() )
    .then((jsonbody)=> jsonbody.results)
   . then((pokemons)=>pokemons.map(pokeApi.getPokemonDetail))
   . then ((detailsRequest)=> Promise.all(detailsRequest))
   .then((pokemonDetails)=> pokemonDetails
   
  )
  
}
