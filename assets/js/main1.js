const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMore')
const pokemon_detail = document.getElementById("pokemon_detail")
pokemon_detail.style.display= 'none'
const ulTypeDetails = document.getElementById("types_detail")
const height =document.getElementById("height")
const weight = document.getElementById("weight")
const name_detail= document.getElementById('name-detail')
const number_detail = document.getElementById('number-detail')
const  big_image= document.getElementById('big-image')
const display_about= document.getElementById('about')
const about_click= document.getElementById("about_click")
const abilities = document.getElementById("abilities")
const stats = document.getElementById('stats')
console.log(stats)
const base_stats= document.getElementById('base_stats')
base_stats.addEventListener('click', (e)=>{
    e.stopPropagation()
    stats.style.display='block'
    display_about.style.display='none'
})
stats.style.display='none'
about_click.addEventListener('click',(e)=>{
    e.stopPropagation()
    stats.style.display='none'

    if (display_about.style.display=='block'){
        display_about.style.display='none'
    }
    else{
        display_about.style.display='block'
    }
})

console.log(big_image.src)
const button_fechar= document.getElementById('fechar')
button_fechar.addEventListener('click', (e)=>{
    e.stopPropagation()
    pokemon_detail.style.display= 'none'
    display_about.style.display='none'
})


let limit =10
let offset = 0
const maxRecords =151
function convertPokemonTypesToLi(pokemonTypes){
    return pokemonTypes.map((typeSlot)=>`  <li class="type">${typeSlot.type.name}</li>`)
}


function convertPokemontoHTML(pokemon){

    return ` <li class="pokemon ${pokemon.type}"> 
    <span class="number">#${pokemon.number}</span>
<span class= "name">${pokemon.name}</span>
    <div class="detail">
        <ol class="types">
           ${pokemon.types.map((type)=>`  <li class="type ${type}">${type}</li>`).join('')}
           
        </ol>
        <img src="${pokemon.photo}"  alt="${pokemon.name}">
    </div>
  
    
</li>`

}

let pokemons_array = []



function loadPokemonItens(offset,limit){
    pokeApi.getPokemons(offset,limit)
 
.then((pokemons=[])=> {
    const novalista =pokemons.map((value, index, array)=>{
   
       return convertPokemontoHTML(value)
      

    })
    const newHtml = novalista.join('')
    pokemonList.innerHTML += newHtml
    
    
    pokemons.map((value)=>{
        pokemons_array.push(value)

    })
   
    display_details(pokemons_array)
    console.log(pokemons_array)
    
   
   



}
)

}
loadPokemonItens(offset,limit)
loadMoreButton.addEventListener('click',()=>{
    offset += limit
   
    const qtdRecord = offset + limit
    if(qtdRecord >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset,newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset,limit)
        
        
    }
    
})

function display_details(pokemons){
    const lis = document.getElementsByClassName('pokemon')
    console.log(lis.length)
   
    const lista = [...lis].map((value, i)=>{
        value.addEventListener('click', function(e){
            e.stopPropagation()
            console.log(value)
            console.log(e.target)
        
           
         pokemon_detail.classList.toggle( pokemons[i].type)
          
            name_detail.innerHTML = pokemons[i].name
            number_detail.innerHTML="# " + pokemons[i].number
            big_image.src= pokemons[i].big_photo
           
            pokemon_detail.style.display = 'block'
            const arrays_ability= pokemons[i].abilities.map(value =>{
               return (value.ability.name)
            })

            abilities.innerHTML= arrays_ability
            height.innerHTML = pokemons[i].height
            weight.innerHTML=pokemons[i].weight
           // console.log(pokemons[i].abilities)
            //console.log(pokemons[i].types)
            console.log(pokemons[i].stats)
            
            let lis_new= pokemons[i].types.map((value,index)=>{
                return `<li class="pokemon ${pokemons[i].type}">${value}</li>`
            })
          
            ulTypeDetails.innerHTML= lis_new.join(' ')

           
        })

    })
}