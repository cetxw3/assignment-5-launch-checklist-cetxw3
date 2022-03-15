// Write your JavaScript code here!

window.addEventListener("load", function() {
   let listedPlanets;

   let listedPlanetsResponse = myFetch();

   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
  
    let chosenPlanet = pickPlanet(listedPlanets);
    console.log(chosenPlanet);

    let destinationInfo = addDestinationInfo(document, chosenPlanet.name, chosenPlanet.diameter, chosenPlanet.star, chosenPlanet.distance, chosenPlanet.moons, chosenPlanet.image);
    console.log(destinationInfo);
   })

    let form = document.getElementById("launchForm");
    let pilotName = document.querySelector("input[name=pilotName]");
    let copilotName = document.querySelector("input[name=copilotName]");
    let fuelLevelAmnt = document.querySelector("input[name=fuelLevel]");
    let cargoMass = document.querySelector("input[name=cargoMass]");

    console.log(form);
    console.log(pilotName.value);
    console.log(copilotName.value);
    console.log(fuelLevelAmnt.value);
    console.log(cargoMass.value);

    form.addEventListener("submit", function(event) {
        let formSubmissionVar = formSubmission(document, pilotName.value, copilotName.value, fuelLevelAmnt.value, cargoMass.value);
        console.log(formSubmissionVar);
        event.preventDefault();
    })
});


