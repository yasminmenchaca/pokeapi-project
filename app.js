const fetchPokeData = () => {
    for (let i = 1; i <= 100; i++) {

        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(res => res.json())

            .then(data => {
                const dataTypes = data['types'];

                const pokemon = {
                    id: data['id'],
                    name: data['name'],
                    weight: data['weight'],
                    height: data['height'],
                    frontImage: data['sprites']['front_default'],
                    dataFirstType: dataTypes[0],
                    dataSecondType: dataTypes[1]
                };
                console.log(pokemon);
            });
    }
};
fetchPokeData();