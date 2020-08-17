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
            <div class="card text-center">
            <div class="card-header">
            #${(singlePokemon.id).toString().padStart(3, '0')} - ${singlePokemon.name}
            </div>
            <img onclick="selectPokemon(${singlePokemon.id})" data-toggle="modal" data-target="#exampleModal" class="card-img" src="${singlePokemon.image}" alt="...">
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
    const ability = singlePokemon.abilities.map((ability) => ability.ability.name).join(', ');
    // const typeOne = singlePokemon.types.map((type) => type.type.name)[0];
    const image = singlePokemon.sprites['front_default'];
    const imageBack = singlePokemon.sprites['back_default'];
    const name = singlePokemon.name;

    const modalBody = $('.modal-body');
    const modalName = $('.pokeName').text(name);

    const modalStats = $('<h5 class="pokemon-stats"></h5>').text(
        `Weight: ${singlePokemon.weight / 10}kg | Height: ${singlePokemon.height / 10}m`
    );

    const modalType = $('<h5 class="pokemon-type"></h5>').text(
        `Type: ${type}`
    );

    const modalAbility = $('<h5 class="pokemon-ability"></h5>').text(
        `Abilities: ${ability}`
    );

    const modalFront = $('<img class="pokemon-img">');
    modalFront.attr('src', image);

    const modalBack = $('<img class="pokemon-img">');
    modalBack.attr('src', imageBack);

    // content removed once closed
    if (modalBody.children().length) {
        modalBody.children().remove();
    }

    modalBody
        .append(modalName)
        .append(modalFront)
        .append(modalBack)
        .append(modalType)
        .append(modalStats)
        .append(modalAbility);
};

$(document).ready(function () {
    $('.search').on("keyup", function () {
        const value = $(this).val().toLowerCase();
        $(".card").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $('.reset').trigger("reset");

    // Close Navbar when clicked outside
    $(window).on('click', function (event) {
        // element over which click was made
        const clickOver = $(event.target);
        if ($('.navbar .navbar-toggler').attr('aria-expanded') === 'true' && clickOver.closest('.navbar').length === 0) {
            // Click on navbar toggler button
            $('button[aria-expanded="true"]').click();
        }
    });

});

fetchPokemonInfo().catch(error => console.log(error));

