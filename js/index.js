document.addEventListener("DOMContentLoaded", function() {
  const monsterContainer = document.getElementById('monster-container');
  const monsterForm = document.getElementById('monster-form');
  let page = 1;

  function fetchMonsters() {
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
      .then(response => response.json())
      .then(monsters => {
        monsters.forEach(monster => {
          monsterContainer.innerHTML += createMonsterHTML(monster);
        });
      });
  }

  function createMonsterHTML(monster) {
    return `
      <div>
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>${monster.description}</p>
      </div>
    `;
  }

  monsterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const monster = {
      name: e.target[0].value,
      age: e.target[1].value,
      description: e.target[2].value
    };
    
    fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(monster)
    }).then(fetchMonsters);
  });

  document.getElementById('forward').addEventListener('click', function() {
    page++;
    monsterContainer.innerHTML = '';
    fetchMonsters();
  });

  document.getElementById('back').addEventListener('click', function() {
    if (page > 1) {
      page--;
      monsterContainer.innerHTML = '';
      fetchMonsters();
    }
  });

  fetchMonsters();
});
