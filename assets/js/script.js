const pokemonContainer = document.querySelector(".pokemon-container");
const formElement = document.querySelector('form');
const inputElement = document.querySelector('input[type=text]');

console.log(inputElement);

formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  pokemonContainer.innerHTML= "";
  getPokemon(inputElement.value);
});

$("#cargar").click(function() {

  var image = new Image();

  var src = 'assets/img/pika.gif';
  image.src = src;

  $('#image').append(image);
});

async function getPokemon(name = "bulbasaur") {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await res.json();

  console.log(pokemon);
  const pokemonElement = document.createElement("div");
  pokemonElement.classList.add("pokemon");

  pokemonElement.innerHTML = ` 
    <div class="info">
    <img  
    src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" width=200px>
<h2>${pokemon.name}</h2>
    </div>

    <div class="stats">
    ${pokemon.stats.map((stat) => {
    return `<p>${stat.stat.name}: ${stat.base_stat}</p>`;
  })
    .join('')}
    </div>
 
  `;

  pokemonContainer.appendChild(pokemonElement);

  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,

    title: {
      text: "Datos del Pokemon"
    },
    axisX: {
      interval: 1
    },
    axisY2: {
      interlacedColor: "rgba(1,77,101,.2)",
      gridColor: "rgba(1,77,101,.1)",
      title: "Atributos"
    },
    data: [{
      type: "column",
      name: "atributos",
      axisYType: "secondary",
      color: "#5dc1b9",
      dataPoints: [
        { y: pokemon.stats[0].base_stat, label: pokemon.stats[0].stat.name },
        { y: pokemon.stats[1].base_stat, label: pokemon.stats[1].stat.name },
        { y: pokemon.stats[2].base_stat, label: pokemon.stats[2].stat.name },
        { y: pokemon.stats[3].base_stat, label: pokemon.stats[3].stat.name },
        { y: pokemon.stats[4].base_stat, label: pokemon.stats[4].stat.name },
        { y: pokemon.stats[5].base_stat, label: pokemon.stats[5].stat.name },
      ]
    }]
  });
  chart.render();
  return false;
};

getPokemon();


