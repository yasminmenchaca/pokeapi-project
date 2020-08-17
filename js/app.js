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
    pokeInfo.innerHTML = pokemon.map((singlePokemon) =>
        `
            <div class="card text-center">
            <div class="card-header">
            ${singlePokemon.name} - #${(singlePokemon.id).toString().padStart(3, '0')}
            </div>
            <img onclick="selectPokemon(${singlePokemon.id})" data-toggle="modal" data-target="#exampleModal" class="card-img" src="${singlePokemon.image}" alt="...">
            <div class ="card-footer"><button class="btn btn-primary" data-id=${singlePokemon.id}>Add to Favorites</button></div>
            </div>
    `
    ).join('');
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
    const imageFront = singlePokemon.sprites['front_default'];
    const imageBack = singlePokemon.sprites['back_default'];
    const name = singlePokemon.name;
    const speed = singlePokemon.stats[0].base_stat;
    const specialDefense = singlePokemon.stats[1].base_stat;
    const specialAttack = singlePokemon.stats[2].base_stat;
    const defense = singlePokemon.stats[3].base_stat;
    const attack = singlePokemon.stats[4].base_stat;
    const hp = singlePokemon.stats[5].base_stat;

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

    const modalTable = $('<table class="table table-striped table-sm text-left table-bordered"></table>').html(`
<thead>
<tr>
<th scope="col">Base</th>
<th scope="col">Stats</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">HP</th>
<td>${hp}</td>
</tr>
<tr>
<th scope="row">Attack</th>
<td>${attack}</td>
</tr>
<tr>
<th scope="row">Defense</th>
<td>${defense}</td>
</tr>
<tr>
<th scope="row">Special Attack</th>
<td>${specialAttack}</td>
</tr>
<tr>
<th scope="row">Special Defense</th>
<td>${specialDefense}</td>
</tr>
<tr>
<th scope="row">Speed</th>
<td>${speed}</td>
</tr>
  </tbody>`)

    const modalFront = $('<img class="pokemon-img" alt="poke_front">');
    modalFront.attr('src', imageFront);

    const modalBack = $('<img class="pokemon-img" alt="poke_back">');
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
        .append(modalAbility)
        .append(modalTable);
};

$(document).ready(function () {
    // search on keyup function
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

    // pressing enter doesn't execute search
    $(".search").keydown(function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });

});

fetchPokemonInfo().catch(error => console.log(error));
