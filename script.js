// Write your JavaScript code here!

window.addEventListener("load", function() {

    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      console.log(response.json());
})



   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse;
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
   })
   preventDefault();
});

let form = document.getElementById("testForm");
form.addEventListener("submit", function() {
    helperModule.formSubmission(/* ??? */);
})