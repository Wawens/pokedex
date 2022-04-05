const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('pokemon');
const listeFiche = document.getElementById("liste-poke");
console.log(pokemonName)


const types = {
    grass: '#78c850',
    ground: '#E2BF65',
    dragon: '#6F35FC',
    fire: '#F58271', //
    electric: '#F7D02C', //
    fairy: '#D685AD', //
    poison: '#966DA3',
    bug: '#B3F594',
    water: '#6390F0',
    normal: '#D9D5D8',
    psychic: '#F95587',
    flying: '#A98FF3',
    fighting: '#C25956',
    rock: '#B6A136',
    ghost: '#735797',
    ice: '#96D9D6',
    steel: '#9FA9AF',
    dark: '#79726B',
};


document.addEventListener("DOMContentLoaded", async() => {
    let globalCondition = true;
    let full = {};

    const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response => {
            full.id = response.id;
            console.log(response)
            console.log(full.id)
            return (response)

        })

    const pokemonSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/` + pokemonName, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            return (response)

        })
    const pokemonEncounters = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/encounters`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            return (response)

        })


    if (globalCondition) {
        //Name 
        if (pokemon.hasOwnProperty("sprites")) {

            //alert("name")
            console.log(pokemon.sprites);
            console.log(pokemon.sprites.other)
            console.log(pokemon.sprites.other.dream_world.front_default)
        }
        //Name 
        if (pokemonSpecies.hasOwnProperty("names")) {
            //alert("name")
            console.log(pokemonSpecies.names[4].name);

        }
        //Id
        if (pokemon.hasOwnProperty("id")) {
            // alert("id")
            console.log(pokemon.id);
        }
        //Types
        if (pokemon.hasOwnProperty("types")) {
            //    alert("types")
            pokemon.types.forEach(type => {
                type.type.name
            })
            console.log(pokemon.types.map((type) => type.type.name))
        }
        //Géneration
        if (pokemonSpecies.hasOwnProperty("generation")) {
            //     alert("Géneration")
            console.log(pokemonSpecies.generation.name);
        }
        //Evolution
        if (pokemonSpecies.hasOwnProperty("evolution_chain")) {
            // alert("Evolution")
            console.log(pokemonSpecies.evolution_chain);
        }
        //    pokemonEncounters
        if (pokemonEncounters.hasOwnProperty("0")) {
            // alert("Encounters")
            console.log(pokemonEncounters[0].location_area.name);
            //alert(pokemonEncounters[0].location_area.name)
            // alert(pokemonEncounters[0].map((encounter) => encounter.location_area.name))
        }


    }
    let color = types[pokemon.types[0].type.name];
    const fiche = document.createElement("li");
    // fiche.style.backgroundColor = types[pokemon.types[0].type.name];

    fiche.style.background = `radial-gradient(circle at 50% 0%, ${color} 40%, #ffffff 36%)`;
    //Image
    const imgFace = document.createElement("img")
    const imgDos = document.createElement("img")
    imgFace.src = pokemon.sprites.other.dream_world.front_default;
    imgDos.src = pokemon.sprites.back_default;
    // nom
    const titlePoke = document.createElement("h1")
    titlePoke.innerHTML = pokemonSpecies.names[4].name.toUpperCase();

    // Id
    const idDuPoke = document.createElement("p");
    idDuPoke.innerHTML = 'ID :#' + pokemon.id;
    //Generation
    const GeneraPoke = document.createElement("p");
    GeneraPoke.innerHTML = pokemonSpecies.generation.name.toUpperCase();
    //Type du pokemon
    const typePoke = document.createElement("p");
    typePoke.innerHTML = "type(s) :" + pokemon.types.map((type) => type.type.name);
    /**
     * J'ai utilisé l'objet map car je voulais que les pokemons qui ont deux types puissent apparaitre 
     *  En sachant que l'objet map fonctionne avec les clé et les valeurs
     */

    typePoke.style.background = color;
    //Evolution du pokemon
    const evolutionPoke = document.createElement("a");
    evolutionPoke.href = pokemonSpecies.evolution_chain.url;
    evolutionPoke.innerHTML = pokemonSpecies.evolution_chain.url;
    // Lieu de rencontre
    const encounterPoke = document.createElement("p");
    encounterPoke.innerHTML = pokemonEncounters.map((encounter) => encounter.location_area.name).slice(0, 1);
 /**
     * Ici j'ai utilisé .slice pour couper et retourner une nouvelle valeur. 
     * Ce qui ma permi de choisir d'afficher que 1
     */
    fiche.appendChild(imgFace);
    fiche.appendChild(imgDos);
    fiche.appendChild(titlePoke);
    fiche.appendChild(typePoke)
    fiche.appendChild(idDuPoke);
    fiche.appendChild(GeneraPoke);
    fiche.appendChild(encounterPoke);
    fiche.appendChild(evolutionPoke);
    listeFiche.appendChild(fiche)
});



let btnRecule = document.getElementById("btnRecule");
let btn = document.getElementById("btn");

let index = 151;
let compteur = pokemonName;

function test() {
    if (compteur < index) {
        compteur++;
        btn.href = "?pokemon=" + compteur;
        console.log(compteur)
    }
}



/*** Je ne pense pas que ce code soit bon mais ça fonctionne */
function testRecule() {
    if (compteur < index) {
        compteur--;
        btnRecule.href = "?pokemon=" + compteur;
        console.log(compteur)
    }
}

btn.addEventListener("click", test);
btnRecule.addEventListener("click", testRecule)