// Write your JavaScript code here!

window.addEventListener("load", function() {
    let listedPlanets;
    
    let listedPlanetsResponse = myFetch();

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {

        let randomPlanet = pickPlanet(listedPlanets);
        console.log(randomPlanet);

        addDestinationInfo(document, randomPlanet.name, randomPlanet.diameter, randomPlanet.star, randomPlanet.distance, randomPlanet.moons, randomPlanet.image);
    })
    
    let formSubmitted = document.querySelector("form");
    let pilotNameSubmitted = document.querySelector("input[name=pilotName]");
    let copilotNameSubmitted = document.querySelector("input[name=copilotName]");
    let fuelLevelSubmitted = document.querySelector("input[name=fuelLevel]");
    let cargoMassSubmitted = document.querySelector("input[name=cargoMass]");
    let listUpdates = document.getElementById("faultyItems");

    formSubmitted.addEventListener("submit", function(event) {
        event.preventDefault();
        formSubmission(document, listUpdates, pilotNameSubmitted.value, copilotNameSubmitted.value, fuelLevelSubmitted.value, cargoMassSubmitted.value);
    })
 });