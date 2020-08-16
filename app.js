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
                 <div class="card text-center" onclick="selectPokemon(${singlePokemon.id})" data-toggle="modal" data-target="#exampleModal">
                 <div class="card-header">
                 #${(singlePokemon.id).toString().padStart(3, '0')} - ${singlePokemon.name}
                 </div>
                 <img class="card-img" src="${singlePokemon.image}">
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

    const modalBody = $('.modal-body');
    const modalName = $('.modal-title').text(name);
    const modalStats = $('<p class="pokemon-stats"></p>').text(
        `Weight: ${singlePokemon.weight} | Height: ${singlePokemon.height}`
    );

    const modalType = $('<p class="pokemon-type"></p>').text(
        `Type: ${type}`
    );

    const modalFront = $('<img class="pokemon-img">');
    modalFront.attr('src', image);

    // content removed once closed
    if (modalBody.children().length) {
        modalBody.children().remove();
    }

    modalBody
        .append(modalName)
        .append(modalFront)
        .append(modalStats)
        .append(modalType);
};

$(".search").on('keyup', function() {
    const input = $(this).val();
    console.log(input);

});



fetchPokemonInfo().catch(error => console.log(error));