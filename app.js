const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

const fetchPokeData = () => {
    for (let i = 1; i <= 150; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(res => res.json())
            .then(data => {

                const pokeName = capitalize(data['name']);
                const pokeId = data['id'].toString().padStart(3, '0');
                const pokeImg = data['sprites']['front_default'];
                const pokeWeight = data['weight'];
                const pokeHeight = data['height'];
                const pokeType = data.types.map((type) => type.type.name).join(', ');

                //////////////////////////////// CARDS ////////////////////////////////
                const pokemonList = $('.poke-cards');
                const cardItems = $(`
                <a href="#" data-toggle="modal" data-target="#exampleModalCenter">
                <div class="card text-center">
                <div class="card-header">
                #${pokeId} - ${pokeName}
                </div>
                <img class="card-img-top" src="${pokeImg}">
                <div class="card-body">
                <p class="card-text">Type(s): ${pokeType}</p>
                <p class="card-text">Height: ${pokeHeight}<br>Weight: ${pokeWeight}</p>
                </div>
                </div>
                </a>`);
                pokemonList.append(cardItems);

//////////////////////////////// MODALS ////////////////////////////////
                const pokeModal = $('.modal-popup');
                const modalItems = $(`
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
                </div>
                </div>`)
                pokeModal.append(modalItems);
            })
            .catch(err => console.log(err));
    }
};

fetchPokeData();