const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

const fetchPokeData = () => {
    for (let i = 1; i <= 150; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const dataTypes = data['types'];
                const dataFirstType = dataTypes[0]['type']['name'];
                const dataSecondType = dataTypes[1]['type']['name'];
                const pokeName = capitalize(data['name']);
                const pokeId = data['id'].toString().padStart(3, '0');
                const pokeImg = data['sprites']['front_default']
                const pokeWeight = data['weight'];
                const pokeHeight =  data['height'];

                const pokemonList = $('.poke-cards');
                const cardItems = $(
                    `
<div class="card" style="width: 18rem;">
<img class="card-img-top" src="${pokeImg}">
<div class="card-body">
<p class="card-text">ID: #${pokeId}</p>
<p class="card-text">Name: ${pokeName}</p>
<p class="card-text">Weight: ${pokeWeight} Height: ${pokeHeight}</p>
<p class="card-text">Type(s): ${dataFirstType}, ${dataSecondType}</p>
</div>
</div>
`
                );
                pokemonList.append(cardItems);
            })
            .catch(err => console.log(err));
    }
};

fetchPokeData();