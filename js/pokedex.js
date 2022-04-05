let allPokemon = []; // On initialise un tableau vide, ce tableau va venir contenir toutes les informations de nos pokemons puis qu'on va utiliser dans une boucle pour l'affichage de nos poke 
const listePoke = document.getElementById("liste-poke");

let loader = document.getElementById("loader");
let rand = document.getElementById("rand");
rand.addEventListener("click", randomCardsPokemon)

// La couleur sera choisi en fonction du type du pokemon
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

//on fait notre premier appel 
function baseOfPokemon() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151") // on limite l'appinformationittion des pokemon
        .then(reponse => reponse.json())
        .then((fullPokemon) => {
            //console.log(allPoke);
            fullPokemon.results.forEach((pokemon) => {
                globalPokemon(pokemon);
            });
            return fullPokemon
        })

}

baseOfPokemon();



function globalPokemon(pokemon) {
    let objPokemonFull = {};

    let urlPokemon = pokemon.url; // on recupère l'url de base avec tout nos pokemon.
    let namePokemon = pokemon.name; // on va récupérer le nom du pokemon et mettre leur nom en français

    //console.log(objPokemonFull)


    fetch(urlPokemon)
        .then(reponse => reponse.json())
        .then(pokeData => {
            // console.log(pokeData)
            /*Note importante:
             -  les .imageDupokemon ce ne sont que des propriété que je vais appelez par la suite
             -  cela permet aussi lorsque vous ouvrez votre console vous allez trouver => imageDupokemon: L'url du pokemon adéquat apparaitra */

            //Image dedu pokemon
            objPokemonFull.imageDupokemon = pokeData.sprites.other.dream_world.front_default;
            // Type du pokemon 
            objPokemonFull.type = pokeData.types[0].type.name;
            // ID du Pokemon
            objPokemonFull.id = pokeData.id;

            fetch(`https://pokeapi.co/api/v2/pokemon-species/${namePokemon}`)
                .then(reponse => reponse.json())
                .then(pokeData => {
                    //   console.log(pokeData);
                    // Nom du pokemon en français
                    objPokemonFull.nameOfPokemon = pokeData.names[4].name;
                    // Charatéristique du pokemon 'ex : Pokemon souris'-->
                    objPokemonFull.typeofpokemon = pokeData.genera[3].genus;
                    allPokemon.push(objPokemonFull);
                    if (allPokemon.length === 151) {
                        cardOfPokemon(allPokemon);
                        console.log(allPokemon)
                        loader.style.display = "none";
                        
                    }
                })
        })

}


// Dans cette function on va venir afficher sur notre page nos cartes et leurs informations
function cardOfPokemon(information) {
    for (let i = 0; i < information.length; i++) {
        // Ici on va créer une liste
        const carte = document.createElement('li');
        // Ici on va indiquer que en fonction du type de pokemon tu affcheras une certaine couleure
        let couleur = types[information[i].type];
        carte.style.background = couleur;
        // Ici on va afficher le nom du pokemon
        const txtCarte = document.createElement('h5');
        txtCarte.innerText = information[i].nameOfPokemon.toUpperCase(); // Le ToUppercase me permet de mettre le nom en majuscule 
        //Ici on va afficher le numéro(ID) du pokemon
        const idCarte = document.createElement('p');
        idCarte.innerText = `Numero ${information[i].id}`;
        //Ici on va afficher la photo de face du pokemon
        const imgCarte = document.createElement('img');
        imgCarte.src = information[i].imageDupokemon;
        let link = document.createElement('a');
        link.href = 'pokemon.html?pokemon=' + information[i].id;
        //Ici venir afficher un bouton 
        link.classList.add("button")
        link.title = "voir la fiche du pokemon " + information[i].nameOfPokemon;
        link.innerText = "voir la fiche individuelle";
        const caracteristique = document.createElement("p");
        caracteristique.innerHTML = information[i].typeofpokemon;
        carte.appendChild(imgCarte);
        carte.appendChild(txtCarte);
        carte.appendChild(idCarte);
        carte.appendChild(caracteristique);
        carte.appendChild(link);
        listePoke.appendChild(carte);

    }

}

/* Ici nous allons géreez nos affichchages aléatoire */
function randomCardsPokemon() {
    let idRandom = Math.floor(Math.random() * 150) + 1;
    rand.href = "pokemon.html?pokemon=" + idRandom;
}

const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('urlParams');