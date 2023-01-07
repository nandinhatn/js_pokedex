const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMore')
const pokemon_detail = document.getElementById("pokemon_detail")
pokemon_detail.style.display = 'none'



const display_about = document.getElementById('about')
const about_click = document.getElementById("about_click")





const button_fechar = document.getElementById('fechar')
button_fechar.addEventListener('click', (e) => {
    e.stopPropagation()
    pokemon_detail.style.display = 'none'
    display_about.style.display = 'none'
})


let limit = 10
let offset = 0
const maxRecords = 151
function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `  <li class="type">${typeSlot.type.name}</li>`)
}


function convertPokemontoHTML(pokemon) {

    return ` <li class="pokemon ${pokemon.type}"> 
    <span class="number">#${pokemon.number}</span>
<span class= "name">${pokemon.name}</span>
    <div class="detail">
    <ol class="types">
    ${pokemon.types.map((type) => `  <li class="type ${type}">${type}</li>`).join('')}
    
    </ol>
    <img src="${pokemon.photo}"  alt="${pokemon.name}">
    </div>
    
    
    </li>`

}

let pokemons_array = []



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)

        .then((pokemons = []) => {
            const novalista = pokemons.map((value, index, array) => {

                return convertPokemontoHTML(value)


            })
            const newHtml = novalista.join('')
            pokemonList.innerHTML += newHtml


            pokemons.map((value) => {
                pokemons_array.push(value)

            })

            display_details(pokemons_array)
          





        }
        )

}
loadPokemonItens(offset, limit)
loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecord = offset + limit
    if (qtdRecord >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)


    }

})

function display_details(pokemons) {
    const lis = document.getElementsByClassName('pokemon')
   

    const lista = [...lis].map((value, i) => {
        value.addEventListener('click', function (e) {
            e.stopPropagation()
            console.log('cliquei')
            console.log(value.className)
            let classNameLi = value.className
            

          
        

            let lis_new = pokemons[i].types.map((value, index) => {
                return `<li class="detalhe pokemon type ${value}">${value}</li>`
            })
            console.log(value)
            pokemon_detail.className= classNameLi
            document.getElementById("pokemon_detail_int").innerHTML = `
          <span id="name-detail" class="name" >${pokemons[i].name}</span>
          <span id="number-detail" class="number">${"# " + pokemons[i].number}</span>
          
          <ul id="types_detail"> 
          ${lis_new.join('')}
          </ul>
          <div id="imagem"><img  id='big-image' src="${pokemons[i].big_photo}"></div>
          
          
          `
            //  name_detail.innerHTML = pokemons[i].name
            //  number_detail.innerHTML="# " + pokemons[i].number
            //big_image.src= pokemons[i].big_photo

            pokemon_detail.style.display = 'block'
            const arrays_ability = pokemons[i].abilities.map(value => {
                return (value.ability.name)
            })





            display_about.innerHTML = `   <span>Weight</span><span id="weight">${pokemons[i].weight}</span><br>
            <hr>
            <span>Height</span><span id="height">${pokemons[i].height}</span><br>
            <hr>
            <span>Abilities: </span><span id="abilities">${arrays_ability}</span>
            </div>
           `
            const stats = document.getElementById('stats')
           
            
            const base_stats = document.getElementById('base_stats')

            const pokemons_stats =pokemons[i].stats.map((value, index)=>{
                return value
            })
            
            base_stats.addEventListener('click', (e) => {
                e.stopPropagation()

                stats.style.display = 'block'
                display_about.style.display = 'none'
            })

            let stats_html=pokemons_stats.map((value)=>{
                return `<span class="head">${value.stat.name}</span><span>${value.base_stat}</span><hr>`

            })
            stats.innerHTML=stats_html.join('')


            stats.style.display = 'none'
            about_click.addEventListener('click', (e) => {
                e.stopPropagation()
                stats.style.display = 'none'

                if (display_about.style.display == 'block') {
                    display_about.style.display = 'none'
                }
                else {
                    display_about.style.display = 'block'
                }
            })




        })

    })
}