const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

const fetchPokeData = () => {
    for (let i = 1; i <= 150; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const pokeName = capitalize(data['name']);
                const pokeId = data['id'].toString().padStart(3, '0');
                const pokeImg = data['sprites']['front_default']
                const pokeWeight = data['weight'];
                const pokeHeight = data['height'];
                const pokeType = data.types.map((type) => type.type.name).join(', ');

                const pokemonList = $('.poke-cards');

                const cardItems = $(
                `<div class="card text-center">
                <div class="card-header">
                #${pokeId} - ${pokeName}
                </div>
                <img class="card-img-top" src="${pokeImg}">
                <div class="card-body">
                <p class="card-text">Type(s): ${pokeType}</p>
                <p class="card-text">Weight: ${pokeWeight}/Height: ${pokeHeight}</p>
                </div>
                </div>`

                );
                pokemonList.append(cardItems);
            })
            .catch(err => console.log(err));
    }
};

fetchPokeData();