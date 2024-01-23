console.log("hello")

const mainSectionEl=document.querySelector("#mainSection")
const STARWARS_API= "https://swapi.dev/api/people"
const secondSectionEl = document.querySelector("#secSection")
const peopleInfoEl= document.querySelector("#people")



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
  
  peopleInfoEl.addEventListener("click", function (){
     fetchStarWars(STARWARS_API)
  })



  
  function renderStarWarsTable(containerEl, peopleData) {
    let tableHTML = "";
  
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
     `<table class = "mainTable">
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
    fetchStarWars(peopleData.previous)
})
peopleNextBtn.addEventListener("click", function (){
  fetchStarWars(peopleData.next)
 })

}