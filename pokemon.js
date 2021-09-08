$(document).ready(function() {
  // llamada de listado de pokemones
  getPokemon("https://pokeapi.co/api/v2/pokemon");
});

// extraemos cada pokemón y asignamos url de los próximos 20 pokemones
function getPokemon(url) {
  $.ajax(url)
    .done(function(data) {
      data.results.forEach(function(pokemon) {
        getImage(pokemon);
      });
      $("#more-pokemons").attr("data-next", data.next);
    });
}

// mostramos el nombre de cada pokemon y el btn de ver más
function addPokemon(pokemon) {
  $("#pokedex").append(
    '<div class="card col-xs-12 col-sm-3 m-4 border border-4">' +
      '<img src="' +
      image +
      '" class="card-img-top" alt="...">' +
      '<div class="card-body">' +
      "<hr>" +
      '<h5 class="card-title text-center">' +
      pokemon.name +
      "</h5>" +
      '<button class="btn btn-warning btn-pok" data-bs-toggle="modal" data-bs-target="#pokemon-data" data-pokemon=' +
      pokemon.name +
      "> Quiero saber más de este pokemon" +
      "</button>" +
      "</div>" +
      "</div>"
  );
}

function getImage(pokemon) {
  let url_pokemon = "https://pokeapi.co/api/v2/pokemon/" + pokemon.name;
  $.ajax(url_pokemon)
    .done(function(data) {
      image = data.sprites.front_default;
      addPokemon(pokemon, image);
    });
}

// traemos la info de cada pokemon al click
function getPokemonData(pokemon) {
  let url_pok = "https://pokeapi.co/api/v2/pokemon/";
  $.ajax(url_pok + pokemon)
    .done(function(data) {
      $("#pokemon-data-name").text(data.name);
      $("#pokemon-image").append('<img src="' + data.sprites.front_shiny +'" class="card-img-top" alt="...">');

      data.types.forEach(function(tipo) {
        $("#pokemon-types").append("<li>" + tipo.type.name + "</li>");
        
        getPokemonGeneration(tipo.type.url);
      });

      data.abilities.forEach(function (habilidad) {
        $("#pokemon-abilities").append(
          "<li>" + habilidad.ability.name + "</li>"
        );
      });

      let count = 0;
      data.moves.forEach(function(move) {
        count++;
        if (count < 6) {
          $("#pokemon-moves").append("<li>" + move.move.name + "</li>");
        }
      });
    });

  $("#pokemon-image").empty();
  $("#pokemon-moves").empty();
  $("#pokemon-data-name").empty();
  $("#pokemon-types").empty();
  $("#pokemon-generations").empty();
  $("#pokemon-abilities").empty();
}

function getPokemonGeneration(url) {
  $.ajax(url)
    .done(function(data) {
      $("#pokemon-generations").append("<li>" + data.generation.name + "</li>");
    });
}

// EVENT LISTENER

// recibimos el click para traer los proximos 20 pokemones
$("#more-pokemons").click(function () {
  getPokemon(this.dataset.next);
});

// recibimos el click del div general para identificar el pokemon target
$("#pokedex").click(function (event) {
  if (event.target.dataset.pokemon) {
    getPokemonData(event.target.dataset.pokemon);
  }
});



