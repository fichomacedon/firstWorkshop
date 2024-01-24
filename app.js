console.log("hello")

const mainSectionEl=document.querySelector("#mainSection")
const STARWARS_API= "https://swapi.dev/api/people"
const STARWARS_SHIPS = "https://swapi.dev/api/starships"
const secondSectionEl = document.querySelector("#secSection")
const peopleInfoEl= document.querySelector("#people")
const shipsInfoEl= document.querySelector("#ships")
const loader = document.querySelector('.preload');
const emoji = loader.querySelector('.emoji');


const emojis = ["🕐", "🕜", "🕑", "🕝", "🕒", "🕞", "🕓", "🕟", "🕔", "🕠", "🕕", "🕡", "🕖", "🕢", "🕗", "🕣", "🕘", "🕤", "🕙", "🕥", "🕚", "🕦", "🕛", "🕧"];
const interval = 125;

function loadEmojis(arr) {
  setInterval(() => {
    emoji.innerText = arr[Math.floor(Math.random() * arr.length)];
  }, interval);
}

function init() {
  loadEmojis(emojis);
}


init();






function showLoader() {
 
  loader.style.display = 'flex'; 
}

function hideLoader() {
  loader.style.display = 'none';
}



function fetchStarShips(STARWARS_SHIPS) {
  // showLoader();
  fetch(STARWARS_SHIPS)
    .then(function (res) {
      return res.json();
    })
    .then (data => {
       console.log(data)
      
      renderStarShipsTable(secondSectionEl,data)
      
    })
    // .finally(hideLoader());
}
shipsInfoEl.addEventListener("click", function(){
  showLoader()
  fetchStarWars(STARWARS_SHIPS)
 
})
peopleInfoEl.addEventListener("click", function (){
  showLoader()
   fetchStarWars(STARWARS_API)
   
})

function fetchStarWars(STARWARS_API) {
    fetch(STARWARS_API)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
       
        
        renderStarWarsTable(secondSectionEl,data)
       
      });
  }
  shipsInfoEl.addEventListener("click", function(){
    showLoader()
    fetchStarShips(STARWARS_SHIPS)
    
  })
  peopleInfoEl.addEventListener("click", function (){
    showLoader()
     fetchStarWars(STARWARS_API)
     
     
  })

 

  function renderStarWarsTable(containerEl, peopleData) {
    
    let tableHTML = "" 

    for (let people of peopleData.results) {
   
      tableHTML += `
      
      
      <tr>
          <td>${people.name}</td>
          <td>${people.height}</td>
          <td>${people.mass}</td>
          <td>${people.gender}</td>
          <td>${people.birth_year}</td>
          <td>${people.films.length}</td>
      </tr>
  
      
      `;
    }
  
    containerEl.innerHTML =
    `
  
    <h1 class="peopleHeading">StarWars People</h1>
     <table class = "mainTable">
    <thead>
     <tr>
     
         <th>Name</th>
         <th>Height</th>
         <th>Mass</th>
         <th>Gender</th>
         <th>Birth Year</th>
         <th>Appearances</th>
     </tr>
    </thead>
    <tbody>${tableHTML}</tbody>
 </table>
 <button id="peoplePrevPage">PreviousPage</button>
 <button id="peopleNextPage">NextPage</button>`

const peoplePrevBtn = containerEl.querySelector("#peoplePrevPage")
const peopleNextBtn = containerEl.querySelector("#peopleNextPage")

if (!peopleData.previous) {
    peoplePrevBtn.disabled = true
   }

   if (!peopleData.next) {
    peopleNextBtn.disabled = true
}

peoplePrevBtn.addEventListener("click", function (){
  showLoader()
    fetchStarWars(peopleData.previous)
})
peopleNextBtn.addEventListener("click", function (){
  showLoader()
  fetchStarWars(peopleData.next)
 })

}

function renderStarShipsTable(containerEl, starshipsData) {
  let tableHTML = "";

  for (let starships of starshipsData.results) {

    tableHTML += `
    
    
    <tr>
        <td>${starships.name}</td>
        <td>${starships.model}</td>
        <td>${starships.manufacturer}</td>
        <td>${starships.cost_in_credits}</td>
        <td>${starships.passengers}</td>
        <td>${starships.starship_class}</td>
    </tr>

    
    `;
  }

  containerEl.innerHTML =
   `
 
<h1 class="peopleHeading">StarWars StarShips</h1>
   <table class = "mainTable">
  <thead>
   <tr>
       <th>Name</th>
       <th>Model</th>
       <th>Manufacturer</th>
       <th>Cost</th>
       <th>People Capacity</th>
       <th>Class</th>
   </tr>
  </thead>
  <tbody>${tableHTML}</tbody>
</table>
<button id="starshipsPrevPage">PreviousPage</button>
<button id="starshipsNextPage">NextPage</button>`

const starshipsPrevBtn = containerEl.querySelector("#starshipsPrevPage")
const starshipsNextBtn = containerEl.querySelector("#starshipsNextPage")

if (!starshipsData.previous) {
  starshipsPrevBtn.disabled = true
 }

 if (!starshipsData.next) {
  starshipsNextBtn.disabled = true
}

starshipsPrevBtn.addEventListener("click", function (){
  showLoader()
  fetchStarShips(starshipsData.previous)
  
})
starshipsNextBtn.addEventListener("click", function (){
  showLoader()
fetchStarShips(starshipsData.next)

})

}