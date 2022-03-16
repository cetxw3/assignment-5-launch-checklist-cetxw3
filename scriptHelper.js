// Write your helper functions here!
require('isomorphic-fetch');

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let chosenPlanet = Math.floor(Math.random()*planets.length);
    for(let i = 0; i < planets.length; i++) {
    if(i === chosenPlanet) {
        return planets[i];
    }
  }  
}

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
            <ol>
                <li>Name: ${name}</li>
                <li>Diameter: ${diameter}</li>
                <li>Star: ${star}</li>
                <li>Distance from Earth: ${distance}</li>
                <li>Number of Moons: ${moons}</li>
            </ol>
            <img src="${imageUrl}"></img>
    `;
 }

function validateInput(testInput) {
   if(testInput === "") {
       return "Empty";
   }
   if(isNaN(testInput)) {
       return "Not a Number";
   }
   if(!isNaN(testInput)) {
       return "Is a Number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    if(validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required.");
        return;
    } else if(validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alert("The fields Pilot Name and/or Copilot Name must be entered as text.");
        return;
    } else if(validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("The fields Fuel Level and/or Cargo Mass Name must be entered as a number.");
        return;
    }

    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelLevelStatus = document.getElementById("fuelStatus");
    let cargoLevelStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");

    pilotStatus.textContent = `Pilot ${pilot} is ready for launch`;
    copilotStatus.textContent = `Pilot ${copilot} is ready for launch`;
    
    if(fuelLevel < 10000 && cargoLevel > 10000) {
        launchStatus.textContent = "Shuttle not ready for launch";
        launchStatus.style.color = "rgb(199, 37, 78)"
        list.style.visibility = "visible";
        fuelLevelStatus.textContent = "Fuel level too low for launch";
        cargoLevelStatus.textContent = "Cargo mass too heavy for launch";
    } else if(fuelLevel < 10000) {
        launchStatus.textContent = "Shuttle not ready for launch";
        launchStatus.style.color = "rgb(199, 37, 78)"
        list.style.visibility = "visible";
        fuelLevelStatus.textContent = "Fuel level too low for launch";
        cargoLevelStatus.textContent = "Cargo mass low enough for launch";
    } else if(cargoLevel > 10000) {
        launchStatus.textContent = "Shuttle not ready for launch";
        launchStatus.style.color = "rgb(199, 37, 78)"
        list.style.visibility = "visible";
        fuelLevelStatus.textContent = "Fuel level high enough for launch";
        cargoLevelStatus.textContent = "Cargo mass too heavy for launch";
    } else {
        launchStatus.textContent = "Shuttle is Ready for Launch";
        launchStatus.style.color = "rgb(65, 159, 106)";
        list.style.visibility = "visible";
        fuelLevelStatus.textContent = "Fuel level high enough for launch";
        cargoLevelStatus.textContent = "Cargo mass low enough for launch";
    }
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;