const pokeInfo = document.getElementById('pokeInfo');

const fetchPokemonInfo = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map((result, index) => ({
        name: result.name,
        apiURL: result.url,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    }));
    displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {

    const pokemonHTML = pokemon
        .map(
            (singlePokemon) =>
                `
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
    const type = singlePokemon.types.map((type) => type.type.name).join(' | ');
    const ability = singlePokemon.abilities.map((ability) => ability.ability.name).join(' | ');

    const image = singlePokemon.sprites['front_default'];
    const name = singlePokemon.name;
    
    const modalBody = $('.modal-body');
    const modalName = $('.pokeName').text(name);

    const modalStats = $('<h5 class="pokemon-stats"></h5>').text(
        `Weight: ${singlePokemon.weight/10}kg | Height: ${singlePokemon.height/10}m`
    );

    const modalType = $('<h5 class="pokemon-type"></h5>').text(
        `Type: ${type}`
    );

    const modalAbility = $('<h5 class="pokemon-ability"></h5>').text(
        `Abilities: ${ability}`
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
        .append(modalType)
        .append(modalAbility);
};

$(document).ready(function(){
    $('.search').on("keyup", function() {
        const value = $(this).val().toLowerCase();
        $(".card").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $('.reset').trigger("reset");
});

fetchPokemonInfo().catch(error => console.log(error));

