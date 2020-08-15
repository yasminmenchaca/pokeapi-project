const pokeInfo = document.getElementById('pokeInfo');
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

const fetchPokemonInfo = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map((result, index) => ({
        name: capitalize(result.name),
        apiURL: result.url,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    }));
    displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
    const pokemonHTML = pokemon
        .map(
            (singlePokemon) => `
                 <div class="card text-center" onclick="selectPokemon(${singlePokemon.id})">
                 <div class="card-header">
                 #${singlePokemon.id} - ${singlePokemon.name}
                 </div>
                 <img class="card-img-top" src="${singlePokemon.image}">
                 </div>
    `
        )
        .join('');
    pokeInfo.innerHTML = pokemonHTML;
};

const selectPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const singlePokemon = await res.json();
    displayModal(singlePokemon);
};

const displayModal = (singlePokemon) => {
    const type = singlePokemon.types.map((type) => type.type.name).join(', ');
    const image = singlePokemon.sprites['front_default'];
    const name = capitalize(singlePokemon.name);

    const htmlString = `
        
    `;
    pokeInfo.innerHTML = htmlString + pokeInfo.innerHTML;
};

fetchPokemonInfo();
