document.addEventListener('DOMContentLoaded',function() {
  // llamada de listado de pokemones
  getPokemon("https://pokeapi.co/api/v2/pokemon");
});

// extraemos cada pokemón y asignamos url de los próximos 20 pokemones
function getPokemon(url) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function(data) {
      data.results.forEach(function(pokemon) {
        getImage(pokemon);
      });
      
      const button = document.querySelector('#more-pokemons');
        attr = document.createAttribute("data-next");
        attr.value = data.next;
        button.setAttributeNode(attr)
    });
}


// mostramos el nombre de cada pokemon y el btn de ver más
function addPokemon(pokemon) {
  const divRow = document.querySelector('#pokedex');
  const divCard = document.createElement('div');

    divCard.className = "card col-xs-12 col-sm-3 m-4 border border-4";
    divRow.appendChild(divCard);

  const img = document.createElement('img');

    img.className = "card-img-top";
    img.src = "" + image;
    divCard.appendChild(img);

  const divBody = document.createElement('div');

    divBody.className = "card-body";
    divCard.appendChild(divBody);

  const hr = document.createElement('hr');

    divBody.appendChild(hr);

  const hFive = document.createElement('h5');

    hFive.className = "card-title text-center";
    hFive.textContent = pokemon.name;
    divBody.appendChild(hFive);

  const buttonPok = document.createElement('button');
  
  buttonPok.className = "btn btn-warning btn-pok";
  attr = document.createAttribute('data-bs-toggle');
  attr.value = "modal";
  buttonPok.setAttributeNode(attr);
  attr2 = document.createAttribute('data-bs-target');
  attr2.value = "#pokemon-data";
  buttonPok.setAttributeNode(attr2);
  attr3 = document.createAttribute('data-pokemon');
  attr3.value = pokemon.name;
  buttonPok.setAttributeNode(attr3);
  buttonPok.textContent = "Quiero saber más de este pokemón";
  divBody.appendChild(buttonPok);
}

function getImage(pokemon) {
  let url_pokemon = "https://pokeapi.co/api/v2/pokemon/" + pokemon.name;
  fetch(url_pokemon)
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      image = data.sprites.front_default;
      addPokemon(pokemon, image);
    });
}

// traemos la info de cada pokemon al click
function getPokemonData(pokemon) {
  let url_pok = "https://pokeapi.co/api/v2/pokemon/";
  fetch(url_pok + pokemon)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const hFive = document.querySelector('#pokemon-data-name');
        hFive.textContent = data.name;
        
      const pokImage = document.querySelector('#pokemon-image');
      img = document.createElement('img');
      img.src = ""+ data.sprites.front_shiny;
      img.className = "card-img-top";
      pokImage.appendChild(img);



      data.types.forEach(function(tipo) {
        const ol = document.querySelector('#pokemon-types');
        const li = document.createElement('li');
          li.textContent = tipo.type.name;
          ol.appendChild(li);
        const buttonDamage = document.createElement('button');
          buttonDamage.className = "btn btn-danger";
          attr = document.createAttribute('data-bs-toggle');
          attr.value = "modal";
          buttonDamage.setAttributeNode(attr);
          attr2 = document.createAttribute('data-bs-target');
          attr2.value = "#damage-data";
          buttonDamage.setAttributeNode(attr2);
          attr3 = document.createAttribute('data-type');
          attr3.value = tipo.type.name;
          buttonDamage.setAttributeNode(attr3)
          buttonDamage.textContent = "Ver relaciones de daño";
          ol.appendChild(buttonDamage);
  
          getPokemonGeneration(tipo.type.url);
      });

      data.abilities.forEach(function(habilidad) {
        const olAbi = document.querySelector('#pokemon-abilities');
          liAbi = document.createElement('li');
          liAbi.textContent = habilidad.ability.name;
          olAbi.appendChild(liAbi);

          buttonAbi = document.createElement('button');
          buttonAbi.className = "btn btn-primary";
          att = document.createAttribute('data-bs-toggle');
          att.value = "modal";
          buttonAbi.setAttributeNode(att);
          att2 = document.createAttribute('data-bs-target');
          att2.value = "#others-pokemon-ability";
          buttonAbi.setAttributeNode(att2);
          att3 = document.createAttribute('data-ability');
          att3.value = habilidad.ability.name;
          buttonAbi.setAttributeNode(att3);
          buttonAbi.textContent = "Otros pokemones con esta habilidad";
          olAbi.appendChild(buttonAbi)
      });

      let count = 0;
      data.moves.forEach(function(movimiento) {
        count++;
        if (count < 6) {
          const olMoves = document.querySelector('#pokemon-moves');
            li = document.createElement('li');
            li.textContent = movimiento.move.name;
            olMoves.appendChild(li);
        }
      });
    });


const pokImage = document.querySelector('#pokemon-image');
  pokImage.innerHTML = '';
  
const olMoves = document.querySelector('#pokemon-moves');
  olMoves.innerHTML = '';

const hFive = document.querySelector('#pokemon-data-name');
  hFive.innerHTML = '';

const olTypes = document.querySelector('#pokemon-types');
  olTypes.innerHTML = '';
  
const olGen = document.querySelector('#pokemon-generations');
  olGen.innerHTML = '';

const olAbi = document.querySelector('#pokemon-abilities');
  olAbi.innerHTML = '';

}


function getPokemonGeneration(url) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const olGen = document.querySelector('#pokemon-generations');
      const liGen = document.createElement('li');
        liGen.textContent = data.generation.name;
        olGen.appendChild(liGen);
    });
}

function damageData(type) {
  let url_damage = "https://pokeapi.co/api/v2/type/" + type;
  fetch(url_damage)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const headerModal = document.querySelector('#type-name');
        headerModal.textContent = data.name;
  
      data.damage_relations.double_damage_from.forEach(function(damage) {
        const olDF = document.querySelector('#double-damage-from');
          liDF = document.createElement('li');
          liDF.textContent = damage.name;
          olDF.appendChild(liDF)
      });

      data.damage_relations.double_damage_to.forEach(function(damage) {
        const olDTo = document.querySelector('#double-damage-to');
          liDTo = document.createElement('li');
          liDTo.textContent = damage.name;
          olDTo.appendChild(liDTo)
      });

      data.damage_relations.half_damage_from.forEach(function(damage) {
        const olHalfF = document.querySelector('#half-damage-from');
          liHalfF = document.createElement('li');
          liHalfF.textContent = damage.name;
          olHalfF.appendChild(liHalfF)
      });

      data.damage_relations.half_damage_to.forEach(function(damage) {
        const olHalfT = document.querySelector('#half-damage-to');
          liHalfT = document.createElement('li');
          liHalfT.textContent = damage.name;
          olHalfT.appendChild(liHalfT)
      });

      data.damage_relations.no_damage_from.forEach(function(damage) {
        const olNoDamF = document.querySelector('#no-damage-from');
          liNoDamF = document.createElement('li');
          liNoDamF.textContent = damage.name;
          olNoDamF.appendChild(liNoDamF)
      });

      data.damage_relations.no_damage_to.forEach(function(damage) {
        const olNoDamT = document.querySelector('#no-damage-to');
          liNoDamT = document.createElement('li');
          liNoDamT.textContent = damage.name;
          olNoDamT.appendChild(liNoDamT)
      });
    });


  const headerModal = document.querySelector('#type-name');
    headerModal.innerHTML = '';
    
  const olDF = document.querySelector('#double-damage-from');
    olDF.innerHTML = '';
  
  const olDTo = document.querySelector('#double-damage-to');
    olDTo.innerHTML = '';
  
  const olHalfF = document.querySelector('#half-damage-from'); 
    olHalfF.innerHTML = '';
    
  const olHalfT = document.querySelector('#half-damage-to'); 
    olHalfT.innerHTML = '';
  
  const olNoDamF = document.querySelector('#no-damage-from');
    olNoDamF.innerHTML = '';
  
  const olNoDamT = document.querySelector('#no-damage-to');
    olNoDamT.innerHTML = '';  
}

function pokemonsWithAbilities(ability) {
  let url_ability = "https://pokeapi.co/api/v2/ability/" + ability;
  fetch(url_ability)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const hFiveAbi = document.querySelector('#ability-name');
        hFiveAbi.textContent = data.name;
      
      data.pokemon.forEach(function(pok) {
        const olAbiList = document.querySelector('#ability-pokemons-list');
              liAbiList = document.createElement('li');
              liAbiList.textContent = pok.pokemon.name;
              olAbiList.appendChild(liAbiList)
      });
    });


  const hFiveAbi = document.querySelector('#ability-name');
    hFiveAbi.innerHTML = '';
  
  const olAbiList = document.querySelector('#ability-pokemons-list');
    olAbiList.innerHTML = '';   
}

// EVENT LISTENER

// recibimos el click para traer los proximos 20 pokemones

const button = document.querySelector('#more-pokemons');
button.addEventListener('click', function(){
  getPokemon(this.dataset.next);
});

// recibimos el click del div general para identificar el pokemon target

const divRow = document.querySelector('#pokedex')
divRow.addEventListener('click', function(event){
  if (event.target.dataset.pokemon) {
    getPokemonData(event.target.dataset.pokemon);
  }
});

//recibimos el click del ol de tips para identificar el typo target
const olTypes = document.querySelector('#pokemon-types')
olTypes.addEventListener('click', function(event){
  if (event.target.dataset.type) {
    damageData(event.target.dataset.type);
  }
});

//recibimos el click del ol de habilidades para identificar el ability target
const olAbi = document.querySelector('#pokemon-abilities')
olAbi.addEventListener('click', function(event){
  if (event.target.dataset.ability) {
    pokemonsWithAbilities(event.target.dataset.ability);
  }
});





